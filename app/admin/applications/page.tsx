import { requireAdminPage } from "@/lib/require-admin-page";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ApplicationsPage() {
  await requireAdminPage();
  const apps = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
  return <div className="card p-4"><h1 className="text-xl font-semibold mb-3">Applications</h1><table className="w-full text-sm"><thead><tr><th>Name</th><th>Status</th><th>Created</th><th /></tr></thead><tbody>{apps.map(a=><tr key={a.id} className="border-t"><td>{a.firstName} {a.lastName}</td><td>{a.status}</td><td>{new Date(a.createdAt).toLocaleDateString()}</td><td><Link className="underline" href={`/admin/applications/${a.id}`}>View</Link></td></tr>)}</tbody></table></div>;
}
