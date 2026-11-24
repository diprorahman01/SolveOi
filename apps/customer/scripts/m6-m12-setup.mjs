import dns from "node:dns";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri || !/^mongodb(?:\+srv)?:\/\//.test(uri)) { console.error("Configure MONGODB_URI in your existing .env.local"); process.exit(1); }
if (process.platform === "win32" && uri.startsWith("mongodb+srv://")) dns.setServers(["8.8.8.8", "1.1.1.1"]);
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB_NAME || "solveoi_dev");
  const records = db.collection("m6_m11_workflows");
  await records.createIndex({ organizationId: 1, productId: 1, createdAt: -1 });
  await records.createIndex({ organizationId: 1, productId: 1, status: 1, kind: 1 });
  await records.createIndex({ organizationId: 1, createdBy: 1, createdAt: -1 });
  await db.collection("m12_plan_requests").createIndex({ organizationId: 1, createdAt: -1 });
  console.log("SolveOi M6–M12 indexes verified in database:", db.databaseName);
} catch (error) { console.error("Setup failed:", error instanceof Error ? error.message : error); process.exitCode = 1; }
finally { await client.close(); }
