import "server-only";

import { MongoClient, type Db } from "mongodb";

const configuredUri = process.env.MONGODB_STANDARD_URI || process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME || "solveoi_dev";

if (!configuredUri) {
  throw new Error("MONGODB_URI is missing. Check apps/customer/.env.local");
}

/**
 * On the known SolveOi Atlas cluster, avoid DNS SRV queries altogether.
 * The hostnames and replica set were verified from the user's Atlas cluster.
 * Keep credentials only in .env.local; never print the connection string.
 *
 * Other MongoDB clusters are left unchanged. If the Atlas topology changes,
 * replace the fixed host list from the Atlas console instead of guessing it.
 */
function effectiveMongoUri(original: string): string {
  if (!original.startsWith("mongodb+srv://")) return original;

  const parsed = new URL(original);
  if (parsed.hostname.toLowerCase() !== "cluster0.azjki6r.mongodb.net") {
    return original;
  }

  const credentials = parsed.username
    ? `${parsed.username}${parsed.password ? `:${parsed.password}` : ""}@`
    : "";

  const hosts = [
    "ac-wwyuufl-shard-00-00.azjki6r.mongodb.net:27017",
    "ac-wwyuufl-shard-00-01.azjki6r.mongodb.net:27017",
    "ac-wwyuufl-shard-00-02.azjki6r.mongodb.net:27017",
  ];
  const options = new URLSearchParams(parsed.searchParams);
  options.set("tls", "true");
  options.set("authSource", "admin");
  options.set("replicaSet", "atlas-se7jy6-shard-0");

  return `mongodb://${credentials}${hosts.join(",")}${parsed.pathname || "/"}?${options}`;
}

const uri = effectiveMongoUri(configuredUri);

// A MongoDB URI with explicit hostnames cannot trigger querySrv lookups.
// Do not log the URI because it contains private database credentials.
if (
  process.env.NODE_ENV === "development" &&
  configuredUri.startsWith("mongodb+srv://") &&
  uri.startsWith("mongodb://")
) {
  console.info("[SolveOi MongoDB] Direct Atlas hosts enabled (SRV lookup bypassed).");
}

type MongoGlobal = typeof globalThis & {
  __solveoiMongoClient?: MongoClient;
  __solveoiMongoClientUri?: string;
};

const mongoGlobal = globalThis as MongoGlobal;

if (
  mongoGlobal.__solveoiMongoClient &&
  mongoGlobal.__solveoiMongoClientUri !== uri
) {
  void mongoGlobal.__solveoiMongoClient.close().catch(() => {});
  mongoGlobal.__solveoiMongoClient = undefined;
}

export const mongoClient: MongoClient =
  mongoGlobal.__solveoiMongoClient ??
  new MongoClient(uri, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    maxPoolSize: 10,
    retryWrites: true,
  });

mongoGlobal.__solveoiMongoClient = mongoClient;
mongoGlobal.__solveoiMongoClientUri = uri;

export const db: Db = mongoClient.db(databaseName);
