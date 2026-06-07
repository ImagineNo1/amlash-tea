import { redirect } from "next/navigation";
import { getCurrentAdmin, ensureDefaultAdmin } from "@/lib/auth";
import { getSiteContent } from "@/lib/content";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  await ensureDefaultAdmin();
  const content = await getSiteContent();
  return <AdminDashboard initialContent={content} admin={admin} />;
}
