
const base = process.env.TEST_BASE_URL || "http://localhost:3000";

const paths = [
  "/",
  "/solutions",
  "/solutions/quote",
  "/solutions/extract",
  "/solutions/collect",
  "/solutions/follow",
  "/solutions/respond",
  "/solutions/hr-desk",
  "/pricing",
  "/industries",
  "/about",
  "/contact",
  "/demo",
  "/demo?product=quote",
  "/resources",
  "/docs",
  "/login",
  "/legal/privacy",
  "/legal/terms",
  "/legal/acceptable-use",
  "/legal/ai-limitations",
  "/robots.txt",
  "/sitemap.xml",
];

let failed = 0;

for (const path of paths) {
  try {
    const response = await fetch(new URL(path, base), {
      signal: AbortSignal.timeout(15000),
    });

    const result = response.ok ? "PASS" : "FAIL";

    if (!response.ok) failed++;

    console.log(`${result} ${response.status} ${path}`);
  } catch (error) {
    failed++;
    console.error(`FAIL ${path}: ${error.message}`);
  }
}

try {
  const response = await fetch(`${base}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "invalid" }),
    signal: AbortSignal.timeout(15000),
  });

  const passed = response.status === 400;

  if (!passed) failed++;

  console.log(
    `${passed ? "PASS" : "FAIL"} form validation (expected 400, received ${response.status})`
  );
} catch (error) {
  failed++;
  console.error(`FAIL form validation: ${error.message}`);
}

console.log("\nSolveOi M2 test complete.");
console.log(`Failures: ${failed}`);

if (failed > 0) process.exitCode = 1;
