
import dns from "node:dns";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const databaseName =
  process.env.MONGODB_DB_NAME || "solveoi_dev";

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing from the customer environment."
  );
}

// Local workaround for the DNS SRV issue observed on Windows.
// Do not override the hosting provider's DNS in production.
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const globalForMongo = globalThis as typeof globalThis & {
  __solveoiMongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.__solveoiMongoClient ??
  new MongoClient(uri, {
    serverSelectionTimeoutMS: 15000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__solveoiMongoClient = mongoClient;
}

export const db = mongoClient.db(databaseName);
