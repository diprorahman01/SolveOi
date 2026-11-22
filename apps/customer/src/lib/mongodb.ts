import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME || "solveoi_dev";
if (!uri) {
  throw new Error("MONGODB_URI is missing. Create apps/customer/.env.local from .env.example.");
}

const globalForMongo = globalThis as typeof globalThis & { __solveoiMongoClient?: MongoClient };
export const mongoClient = globalForMongo.__solveoiMongoClient ?? new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
});
if (process.env.NODE_ENV !== "production") globalForMongo.__solveoiMongoClient = mongoClient;
export const db = mongoClient.db(databaseName);
