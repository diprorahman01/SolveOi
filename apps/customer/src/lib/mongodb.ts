
import "server-only";

import dns from "node:dns";
import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

const databaseName =
  process.env.MONGODB_DB_NAME || "solveoi_dev";

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing. Check apps/customer/.env.local"
  );
}

/**
 * MongoDB Atlas DNS fix for Windows.
 *
 * Next.js runs with NODE_ENV=production during
 * `npm run build`, even on a local computer.
 *
 * We therefore check the operating system instead
 * of NODE_ENV, which fixes the previous problem
 * where development connected but builds failed.
 *
 * Linux production environments keep their own
 * configured DNS resolver.
 */
if (
  process.platform === "win32" &&
  uri.startsWith("mongodb+srv://")
) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

type MongoGlobal = typeof globalThis & {
  __solveoiMongoClient?: MongoClient;
};

const mongoGlobal = globalThis as MongoGlobal;

function createClient(): MongoClient {
  return new MongoClient(uri!, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    maxPoolSize: 10,
    retryWrites: true,
  });
}

/**
 * Reuse the client in the same Node.js process
 * to avoid creating unnecessary connections
 * during development and hot reloads.
 */
export const mongoClient: MongoClient =
  mongoGlobal.__solveoiMongoClient ??
  createClient();

mongoGlobal.__solveoiMongoClient = mongoClient;

export const db: Db = mongoClient.db(databaseName);
