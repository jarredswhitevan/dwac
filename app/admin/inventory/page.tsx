import { requireAdminPage } from "@/lib/require-admin-page";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminInventoryPage() {
  await requireAdminPage();
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  return <div className="card p-4"><div className="mb-3 flex justify-between"><h1 className="text-xl font-semibold">Inventory</h1><Link className="btn-primary" href="/admin/inventory/new">Add Vehicle</Link></div><table className="w-full text-sm"><thead><tr><th>Stock</th><th>Vehicle</th><th>Status</th><th /></tr></thead><tbody>{vehicles.map(v=><tr key={v.id} className="border-t"><td>{v.stockNumber}</td><td>{v.year} {v.make} {v.model}</td><td>{v.status}</td><td><Link className="underline" href={`/admin/inventory/${v.id}/edit`}>Edit</Link></td></tr>)}</tbody></table></div>;
}
