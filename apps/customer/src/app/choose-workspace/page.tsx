import {requireIdentity} from "@/lib/access";
import {redirect} from "next/navigation";
import WorkspaceSelector from "@/components/WorkspaceSelector";
export default async function Page(){const session=await requireIdentity();if(session.user.role==="admin")redirect("/platform");return <main className="px-4 py-16"><WorkspaceSelector/></main>}
