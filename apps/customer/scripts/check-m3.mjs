const base=process.env.TEST_BASE_URL||"http://localhost:3000";
const cases=[...(["/sign-in","/sign-up","/forgot-password"].map(p=>[p,200])),["/api/secure/owner",401],["/api/secure/platform",401]];
let fail=0;for(const[path,expected] of cases){try{const r=await fetch(new URL(path,base),{redirect:"manual",signal:AbortSignal.timeout(15000)});const ok=r.status===expected;console.log(`${ok?"PASS":"FAIL"} ${path}: ${r.status} (expected ${expected})`);if(!ok)fail++}catch(e){console.error(`FAIL ${path}: ${e.message}`);fail++}}
console.log(`M3 smoke test failures: ${fail}`);if(fail)process.exitCode=1;
