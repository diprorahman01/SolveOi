const base = process.env.TEST_BASE_URL || "http://localhost:3001";
const cases = [
  ["/sign-in", 200],
  ["/sign-up", 200],
  ["/forgot-password", 200],
  ["/api/secure/owner", 401],
  ["/api/secure/platform", 401],
];
let failures = 0;
for (const [path, expected] of cases) {
  try {
    const response = await fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(15000) });
    const passed = response.status === expected;
    console.log(`${passed ? "PASS" : "FAIL"} ${path}: ${response.status} (expected ${expected})`);
    if (!passed) failures++;
  } catch (error) {
    failures++;
    console.error(`FAIL ${path}: ${error.message}`);
  }
}
console.log(`M3 smoke test failures: ${failures}`);
if (failures) process.exitCode = 1;
