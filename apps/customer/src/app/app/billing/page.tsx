import DashboardShell from "@/components/DashboardShell";
import { requireOwner } from "@/lib/access";
import CommercialPanel from "@/components/CommercialPanel";
export const dynamic = "force-dynamic";
export default async function Page() {
  const { identity, role } = await requireOwner();
  return <DashboardShell title="Plans & billing" subtitle="Review the commercial release status. Checkout remains unavailable until a payment provider, verification webhooks and reconciliation are configured." role={role} name={identity.user.name}><CommercialPanel/></DashboardShell>;
}
