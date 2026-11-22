import dns from "node:dns";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri || !/^mongodb(?:\+srv)?:\/\//.test(uri)) {
  console.error("A valid MONGODB_URI is required. Keep it in apps/customer/.env.local.");
  process.exit(1);
}
if (process.platform === "win32" && uri.startsWith("mongodb+srv://")) dns.setServers(["8.8.8.8", "1.1.1.1"]);
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB_NAME || "solveoi_dev");
  await Promise.all([
    db.collection("m5_tasks").createIndex({ organizationId: 1, createdAt: -1 }),
    db.collection("m5_tasks").createIndex({ organizationId: 1, createdBy: 1, createdAt: -1 }),
    db.collection("m5_tasks").createIndex({ kind: 1, status: 1, createdAt: 1 }),
    db.collection("m5_entitlements").createIndex({ organizationId: 1, productId: 1 }, { unique: true }),
    db.collection("m5_product_grants").createIndex({ organizationId: 1, userId: 1, productId: 1 }, { unique: true }),
    db.collection("m5_subscriptions").createIndex({ organizationId: 1 }, { unique: true }),
    db.collection("m5_files").createIndex({ organizationId: 1, createdAt: -1 }),
    db.collection("m5_audit_logs").createIndex({ organizationId: 1, createdAt: -1 }),
    db.collection("m5_usage_events").createIndex({ organizationId: 1, createdAt: -1 }),
  ]);
  console.log("SolveOi M5 MongoDB indexes created or verified.");
  console.log("Database:", db.databaseName);
} catch (error) {
  console.error("M5 SETUP ERROR:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally { await client.close(); }
