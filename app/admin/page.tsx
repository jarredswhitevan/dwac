import { requireAdminPage } from "@/lib/require-admin-page";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  await requireAdminPage();
  const [vehicleCount, appCount] = await Promise.all([prisma.vehicle.count(), prisma.application.count()]);
  return <div className="grid gap-4 sm:grid-cols-2"><div className="card p-4"><p className="text-sm">Vehicles</p><p className="text-2xl font-bold">{vehicleCount}</p></div><div className="card p-4"><p className="text-sm">Applications</p><p className="text-2xl font-bold">{appCount}</p></div></div>;
}
