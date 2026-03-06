import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatMoney } from "@/lib/utils";

export default async function VdpPage({ params }: { params: { stock: string } }) {
  const vehicle = await prisma.vehicle.findUnique({ where: { stockNumber: params.stock }, include: { photos: { orderBy: { sortOrder: "asc" } } } });
  if (!vehicle) notFound();
  return (
    <div className="container-base py-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="space-y-3">
          <img src={vehicle.photos[0]?.url || "/vehicles/placeholder-1.svg"} className="w-full rounded-xl h-80 object-cover" alt="vehicle" />
          <div className="grid grid-cols-4 gap-2">{vehicle.photos.map((p) => <img key={p.id} src={p.url} className="h-20 w-full rounded object-cover" alt="thumb" />)}</div>
        </div>
        <div className="card p-4 space-y-3">
          <h1 className="text-2xl font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
          <p className="text-xl font-semibold text-brand-900">{formatMoney(vehicle.price)}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>Mileage: {vehicle.mileage?.toLocaleString() ?? "N/A"}</p><p>Stock: {vehicle.stockNumber}</p>
            <p>Transmission: {vehicle.transmission ?? "N/A"}</p><p>Fuel: {vehicle.fuelType ?? "N/A"}</p>
          </div>
          <Link href={`/apply?stock=${vehicle.stockNumber}`} className="btn-primary w-full">Apply for Financing</Link>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-3 md:hidden"><Link href={`/apply?stock=${vehicle.stockNumber}`} className="btn-primary w-full">Apply for Financing</Link></div>
    </div>
  );
}
