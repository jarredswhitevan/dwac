import { requireAdminPage } from "@/lib/require-admin-page";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { decryptField } from "@/lib/crypto";
import UpdateApplicationForm from "./UpdateApplicationForm";

export default async function AppDetailPage({ params }: { params: { id: string } }) {
  await requireAdminPage();
  const app = await prisma.application.findUnique({ where: { id: params.id } });
  if (!app) notFound();
  const decoded = { ...app, phone: decryptField(app.phone), email: decryptField(app.email), addressStreet: decryptField(app.addressStreet), addressCity: decryptField(app.addressCity), addressState: decryptField(app.addressState), addressZip: decryptField(app.addressZip) };
  return <div className="card p-4 space-y-4"><h1 className="text-xl font-semibold">Application Detail</h1><pre className="overflow-auto rounded bg-slate-100 p-3 text-xs">{JSON.stringify(decoded,null,2)}</pre><UpdateApplicationForm id={app.id} status={app.status} /></div>;
}
