
import dns from "node:dns";
import { MongoClient } from "mongodb";

// Use explicit DNS resolvers for SRV lookups.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;
const databaseName =
  process.env.MONGODB_DB_NAME || "solveoi_dev";

if (!uri) {
  console.error("MONGODB_URI is missing.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 15000,
});

try {
  await client.connect();

  const db = client.db(databaseName);

  await db.command({ ping: 1 });

  console.log("MONGODB ATLAS CONNECTED");
  console.log("Database:", databaseName);
} catch (error) {
  console.error(
    "MONGODB ERROR:",
    error instanceof Error ? error.message : error
  );

  process.exitCode = 1;
} finally {
  await client.close();
}
