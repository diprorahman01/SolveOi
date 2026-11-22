import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";
import {requireIdentity} from "@/lib/access";
import CreateWorkspace from "@/components/CreateWorkspace";
export default async function Page(){const identity=await requireIdentity();if(identity.user.role==="admin")redirect("/platform");
 const orgs=await auth.api.listOrganizations({headers:await headers()});
 if(orgs.length)redirect("/choose-workspace");
 return <main className="px-4 py-16"><CreateWorkspace/></main>;
}
