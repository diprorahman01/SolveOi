/**
 * SolveOi auth sign-in/session diagnostic for local development only.
 * Run: node --env-file=.env.local scripts/solveoi-auth-session-test.mjs
 * Inputs are passed in volatile environment variables via masked PowerShell prompt.
 * No password, email, token, or connection string is printed by this script.
 * One disposable, expired session document is created/deleted. If full sign-in
 * succeeds, the newly created test session is deleted by token too.
 */
import dns from 'node:dns';
import { randomUUID } from 'node:crypto';
import { MongoClient } from 'mongodb';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { admin, organization } from 'better-auth/plugins';

const url = process.env.BETTER_AUTH_URL || '';
const dbName = process.env.MONGODB_DB_NAME || '';
const uri = process.env.MONGODB_URI || '';
const secret = process.env.BETTER_AUTH_SECRET || '';
const email = (process.env.SOLVEOI_DIAG_EMAIL || '').trim().toLowerCase();
const password = process.env.SOLVEOI_DIAG_PASSWORD || '';
let client;
let manualToken;
let realToken;

function safe(text) {
  return String(text ?? 'Unknown')
    .replaceAll(uri, '[DB_URI_REDACTED]')
    .replaceAll(password, '[PASSWORD_REDACTED]')
    .replaceAll(email, '[EMAIL_REDACTED]')
    .replace(/mongodb(?:\+srv)?:\/\/[^\s"'`]+/gi, '[DB_URI_REDACTED]')
    .slice(0, 350);
}

try {
  const appURL = new URL(url);
  if (appURL.protocol !== 'http:' || !['localhost', '127.0.0.1'].includes(appURL.hostname) || appURL.port !== '3001' || dbName !== 'solveoi_dev' || process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to run outside SolveOi local development and solveoi_dev.');
  }
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error('Invalid MONGODB_URI.');
  }
  if (!secret || !email.includes('@') || !password) {
    throw new Error('Missing local diagnostic email/password or Better Auth secret.');
  }
  if (process.platform === 'win32' && uri.startsWith('mongodb+srv://')) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }

  console.log('=== SolveOi session and full sign-in test ===');
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  await client.connect();
  const db = client.db(dbName);
  await db.command({ ping: 1 });
  console.log('Database: CONNECTED');

  const sessionCollection = db.collection('session');
  manualToken = `solveoi-diagnostic-expired-${randomUUID()}`;
  const user = await db.collection('user').findOne({ email }, { projection: { _id: 1, emailVerified: 1 } });
  if (!user) throw new Error('User not found in solveoi_dev.');
  console.log(`Account verified: ${user.emailVerified === true ? 'YES' : 'NO'}`);

  // Probe the write path that the previous read-only test did not exercise.
  try {
    await sessionCollection.insertOne({
      token: manualToken,
      userId: String(user._id),
      expiresAt: new Date(0),
      createdAt: new Date(0),
      updatedAt: new Date(0),
    });
    const found = await sessionCollection.findOne({ token: manualToken }, { projection: { _id: 1 } });
    console.log(`Session collection INSERT + READ: ${found ? 'PASS' : 'FAILED'}`);
  } catch (e) {
    console.log('Session collection INSERT: FAILED');
    console.log('MongoDB write error:', safe(e?.message));
    console.log('MongoDB write code:', e?.code ?? 'none');
    process.exitCode = 1;
  } finally {
    try {
      await sessionCollection.deleteOne({ token: manualToken });
      console.log('Disposable session cleanup: DONE');
    } catch (e) {
      console.log('Disposable session cleanup failed:', safe(e?.message));
      process.exitCode = 1;
    }
  }

  if (process.exitCode) {
    console.log('Skip full sign-in because session collection write failed.');
  } else {
    // This creates the same kind of Better Auth account session as a real
    // sign-in, without the Next.js route or nextCookies() plugin.
    const auth = betterAuth({
      appName: 'SolveOi',
      baseURL: url,
      secret,
      database: mongodbAdapter(db, { client }),
      emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        minPasswordLength: 12,
        maxPasswordLength: 128,
      },
      plugins: [
        organization({ creatorRole: 'owner', organizationLimit: 1, membershipLimit: 100, invitationLimit: 30, requireEmailVerificationOnInvitation: true }),
        admin({ defaultRole: 'user', adminRoles: ['admin'] }),
      ],
    });

    try {
      const result = await auth.api.signInEmail({
        body: { email, password },
        headers: new Headers({ origin: url }),
      });
      realToken = result?.token;
      console.log('Standalone Better Auth FULL sign-in: SUCCESS');
      console.log(`Session token returned: ${realToken ? 'YES' : 'NO'}`);
      if (realToken) {
        const stored = await sessionCollection.findOne({ token: realToken }, { projection: { _id: 1 } });
        console.log(`Session persisted in MongoDB: ${stored ? 'YES' : 'NO'}`);
      }
    } catch (e) {
      console.log('Standalone Better Auth FULL sign-in: FAILED');
      console.log('Error name:', safe(e?.name));
      console.log('Error status:', safe(e?.status ?? e?.statusCode ?? 'unknown'));
      console.log('Error code:', safe(e?.body?.code ?? e?.code ?? 'unknown'));
      console.log('Error message:', safe(e?.message));
      if (e?.cause) console.log('Error cause:', safe(e.cause?.message ?? e.cause));
      process.exitCode = 1;
    }
  }
} catch (e) {
  console.log('Diagnostic failure:', safe(e?.message));
  process.exitCode = 1;
} finally {
  if (client && realToken) {
    try {
      await client.db(dbName).collection('session').deleteOne({ token: realToken });
      console.log('Sign-in test session cleanup: DONE');
    } catch (e) {
      console.log('Sign-in test session cleanup: FAILED:', safe(e?.message));
      process.exitCode = 1;
    }
  }
  await client?.close();
  console.log('=== End diagnostic ===');
}
