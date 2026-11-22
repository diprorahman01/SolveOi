// LOCAL-ONLY one-time Super Admin bootstrap. Requires an existing verified account.
import {MongoClient} from "mongodb";
const email=process.argv[2]?.trim().toLowerCase();
if(!email||!email.includes("@")){console.error("Usage: npm run admin:promote -- admin@example.com");process.exit(1)}
if(!process.env.MONGODB_URI){console.error("MONGODB_URI missing");process.exit(1)}
const client=new MongoClient(process.env.MONGODB_URI,{serverSelectionTimeoutMS:10000});
try{await client.connect();const users=client.db(process.env.MONGODB_DB_NAME||"solveoi_dev").collection("user");
const user=await users.findOne({email});if(!user){console.error("User not found. Register first.");process.exitCode=1}
else if(!user.emailVerified){console.error("Verify the account email before promotion.");process.exitCode=1}
else {await users.updateOne({_id:user._id,emailVerified:true},{$set:{role:"admin"}});console.log("Promoted verified account:",email,"— sign out and sign in again.")}}
catch(e){console.error("Admin bootstrap error:",e.message);process.exitCode=1}finally{await client.close()}
