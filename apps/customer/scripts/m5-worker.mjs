/** Optional long-running worker poller. The Next.js server must already be running. */
const base = process.env.M5_APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:3001";
const secret = process.env.M5_WORKER_SECRET;
const once = process.argv.includes("--once");
if (!secret || secret.length < 32) {
  console.error("Configure M5_WORKER_SECRET with at least 32 random characters.");
  process.exit(1);
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function poll() {
  try {
    const response = await fetch(new URL("/api/m5/worker", base), {
      method: "POST", headers: { Authorization: `Bearer ${secret}` }, signal: AbortSignal.timeout(35000),
    });
    const body = await response.json();
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (body.processed) console.log("Worker processed:", body.status);
    else if (once) console.log(body.enabled === false ? "AI disabled (safe default)." : "No queued tasks.");
  } catch (error) {
    console.error("Worker poll failed:", error instanceof Error ? error.message : error);
    if (once) process.exitCode = 1;
  }
}
if (once) await poll();
else {
  console.log("SolveOi M5 worker started for", base, "(Ctrl+C to stop)");
  while (true) { await poll(); await delay(6000); }
}
