/**
 * SolveOi M3 read-only credential-path diagnostic.
 * Run from apps/customer with node --env-file=.env.local scripts/solveoi-auth-diagnostic.mjs
 * No real password is requested; does not modify any account or session.
 */
import dns from 'node:dns';
import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { MongoClient } from 'mongodb';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { admin, organization } from 'better-auth/plugins';

const rl = createInterface({ input, output });
let client;
const scrub = (v) => String(v ?? 'none')
  .replace(/mongodb(?:\+srv)?:\/\/[^\s'"`]+/gi, '[DB URI REDACTED]')
  .replace(/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/gi, '[EMAIL REDACTED]')
  .replace(/(?:Bearer\s+)[^\s'"`]+/gi, 'Bearer [REDACTED]')
  .slice(0, 220);
const message = (error) => scrub(error?.message ?? error);
const say = (key, v) => console.log(`${key}: ${v}`);

try {
  const uri = process.env.MONGODB_URI;
  const databaseName = process.env.MONGODB_DB_NAME || 'solveoi_dev';
  const baseURL = process.env.BETTER_AUTH_URL || '';
  if (!uri || !/^mongodb(?:\+srv)?:\/\//.test(uri)) throw new Error('Invalid MONGODB_URI');
  if (!process.env.BETTER_AUTH_SECRET) throw new Error('Missing BETTER_AUTH_SECRET');
  if (baseURL !== 'http://localhost:3001') throw new Error('Set BETTER_AUTH_URL=http://localhost:3001 for this test');
  if (process.platform === 'win32' && uri.startsWith('mongodb+srv://')) dns.setServers(['8.8.8.8', '1.1.1.1']);
  const email = (await rl.question('Existing SolveOi account email (typed locally only): ')).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');

  client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000, connectTimeoutMS: 15000 });
  await client.connect();
  const db = client.db(databaseName);
  await db.command({ ping: 1 });
  console.log('\n=== SolveOi authentication diagnostic ===');
  say('Database ping', 'PASS');
  for (const collectionName of ['user', 'account', 'session']) {
    try {
      await db.collection(collectionName).findOne({}, { projection: { _id: 1 } });
      say(`${collectionName} read permission`, 'PASS');
    } catch (error) {
      say(`${collectionName} read permission`, `FAIL (${scrub(error.name)})`);
    }
  }

  const users = await db.collection('user')
    .find({ email }, { projection: { _id: 1, id: 1, emailVerified: 1 } })
    .limit(3).toArray();
  say('Matching user records', users.length === 3 ? '3+' : users.length);
  if (users.length !== 1) {
    say('DIAGNOSIS', users.length ? 'DUPLICATE_USERS' : 'USER_NOT_FOUND_IN_DATABASE');
  } else {
    const user = users[0];
    say('Email verified', user.emailVerified === true ? 'YES' : 'NO');
    const candidates = [user._id, String(user._id), user.id].filter(x => x != null);
    const accountDocs = await db.collection('account').find(
      { userId: { $in: candidates } },
      { projection: { providerId: 1, accountId: 1, userId: 1, password: 1 } },
    ).limit(20).toArray();
    const credentials = accountDocs.filter(a => a.providerId === 'credential');
    say('Linked account records', accountDocs.length);
    say('Credential account records', credentials.length);
    if (credentials.length === 1) {
      const credential = credentials[0];
      say('Stored password hash', typeof credential.password === 'string' && credential.password.length > 15 ? 'PRESENT' : 'MISSING_OR_SHORT');
      say('Account user ID matches user ID', candidates.some(id => String(id) === String(credential.userId)) ? 'YES' : 'NO');
      say('Account accountId matches user ID', candidates.some(id => String(id) === String(credential.accountId)) ? 'YES' : 'NO');
      say('Password hash type', typeof credential.password);
    }
    if (credentials.length !== 1) {
      say('DIAGNOSIS', 'MISSING_OR_DUPLICATE_CREDENTIAL_ACCOUNT');
    } else {
      // This deliberately uses an unpredictable WRONG password and does not
      // create a user session or change user/account/session documents.
      const auth = betterAuth({
        appName: 'SolveOi', baseURL,
        secret: process.env.BETTER_AUTH_SECRET,
        database: mongodbAdapter(db, { client }),
        emailAndPassword: { enabled: true, requireEmailVerification: true },
        rateLimit: { enabled: false },
        plugins: [organization({ creatorRole: 'owner' }), admin({ defaultRole: 'user', adminRoles: ['admin'] })],
      });
      try {
        await auth.api.signInEmail({
          body: { email, password: randomBytes(40).toString('hex') },
          headers: new Headers({ origin: baseURL }),
        });
        say('Credential lookup probe', 'UNEXPECTED_SUCCESS; STOP AND INVESTIGATE');
      } catch (error) {
        const status = error?.statusCode ?? error?.status ?? 'unknown';
        say('Credential lookup probe status', scrub(status));
        say('Credential lookup probe error name', scrub(error?.name));
        say('Credential lookup probe error message', message(error));
        if (error?.cause) say('Credential lookup probe cause', message(error.cause));
        say('Probe interpretation', Number(status) === 401 || String(status).toUpperCase() === 'UNAUTHORIZED'
          ? 'LOOKUP_OK (401 from deliberately incorrect password is expected)'
          : 'INVESTIGATE_REPORTED_ERROR');
      }
    }
  }
  console.log('No actual password, password hash, user ID, or secret has been printed.');
  console.log('No database documents were modified by this script.');
  console.log('=== End diagnostic ===');
} catch (error) {
  console.error('DIAGNOSTIC ERROR:', scrub(error?.name), message(error));
  process.exitCode = 1;
} finally {
  await client?.close();
  rl.close();
}
