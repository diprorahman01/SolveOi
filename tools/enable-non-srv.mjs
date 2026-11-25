import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const project = resolve(process.argv[2] ?? 'C:\\Projects\\SolveOi');
const envPath = join(project, 'apps', 'customer', '.env.local');
if (!existsSync(envPath)) {
  console.error('Could not locate apps/customer/.env.local. No changes made.');
  process.exit(1);
}
const content = readFileSync(envPath, 'utf8');
const found = content.match(/^\s*MONGODB_URI\s*=\s*(.*?)\s*$/m);
if (!found) {
  console.error('MONGODB_URI is missing in .env.local. No changes made.');
  process.exit(1);
}
const raw = found[1].trim().replace(/^(["'])(.*)\1$/, '$2');
let url;
try { url = new URL(raw); } catch {
  console.error('MONGODB_URI could not be parsed. No changes made.');
  process.exit(1);
}
if (url.protocol !== 'mongodb+srv:' || url.hostname.toLowerCase() !== 'cluster0.azjki6r.mongodb.net') {
  console.error('Expected the connected SolveOi Cluster0 SRV URI. No changes made.');
  process.exit(1);
}
if (!url.username || !url.password) {
  console.error('Expected credentials in MONGODB_URI; no changes made.');
  process.exit(1);
}
const hosts = [
  'ac-wwyuufl-shard-00-00.azjki6r.mongodb.net:27017',
  'ac-wwyuufl-shard-00-01.azjki6r.mongodb.net:27017',
  'ac-wwyuufl-shard-00-02.azjki6r.mongodb.net:27017',
];
const params = new URLSearchParams(url.searchParams);
params.set('tls', 'true');
params.set('authSource', 'admin');
params.set('replicaSet', 'atlas-se7jy6-shard-0');
const pathname = url.pathname || '/';
const uri = `mongodb://${url.username}:${url.password}@${hosts.join(',')}${pathname}?${params.toString()}`;
const line = `MONGODB_STANDARD_URI=${uri}`;
const backup = envPath + '.before-dns-fix.bak';
if (!existsSync(backup)) copyFileSync(envPath, backup);
let updated;
if (/^\s*MONGODB_STANDARD_URI\s*=.*$/m.test(content)) {
  updated = content.replace(/^\s*MONGODB_STANDARD_URI\s*=.*$/m, line);
} else {
  updated = content.replace(/\s*$/, '') + '\n' + line + '\n';
}
writeFileSync(envPath, updated, { encoding: 'utf8', mode: 0o600 });
console.log('SUCCESS: Local non-SRV Atlas connection activated.');
console.log('Backed up .env.local and preserved the original MONGODB_URI.');
console.log('Credentials have not been displayed. Do not commit .env.local or its backup.');
console.log('Next step: restart the customer Next.js server and open localhost:3001/app.');
