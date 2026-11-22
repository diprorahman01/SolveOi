import {MongoClient} from "mongodb";
const uri=process.env.MONGODB_URI;const name=process.env.MONGODB_DB_NAME||"solveoi_dev";
if(!uri){console.error("MONGODB_URI missing in .env.local");process.exit(1)}
const client=new MongoClient(uri,{serverSelectionTimeoutMS:10000});
try{await client.connect();await client.db(name).command({ping:1});console.log("MONGODB ATLAS CONNECTED",name)}
catch(e){console.error("MONGODB ERROR:",e.message);process.exitCode=1}finally{await client.close()}
