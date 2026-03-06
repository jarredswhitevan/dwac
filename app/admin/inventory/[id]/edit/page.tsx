import { requireAdminPage } from "@/lib/require-admin-page";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditVehicleForm from "./EditVehicleForm";

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
  await requireAdminPage();
  const v = await prisma.vehicle.findUnique({ where: { id: params.id }, include: { photos: { orderBy: { sortOrder: "asc" } } } });
  if (!v) notFound();
  return <div className="card p-4"><h1 className="text-xl font-semibold mb-3">Edit {v.stockNumber}</h1><EditVehicleForm vehicle={v} /><h2 className="font-semibold mt-4">Photos</h2><div className="grid grid-cols-4 gap-2">{v.photos.map(p=><img key={p.id} src={p.url} className="h-20 w-full object-cover rounded" alt="photo" />)}</div></div>;
}
