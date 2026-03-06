import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

export default async function InventoryPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const page = Number(searchParams.page ?? 1);
  const sort = String(searchParams.sort ?? "year_desc");
  const [field, dir] = sort.split("_");
  const vehicles = await prisma.vehicle.findMany({
    where: { status: "AVAILABLE", make: searchParams.make ? String(searchParams.make) : undefined },
    include: { photos: { take: 1, orderBy: { sortOrder: "asc" } } },
    orderBy: { [field === "price" ? "price" : field === "mileage" ? "mileage" : "year"]: dir === "asc" ? "asc" : "desc" },
    take: 12,
    skip: (page - 1) * 12
  });
  return (
    <div className="container-base py-8 grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="card p-4 h-fit">
        <h2 className="font-semibold mb-2">Filters</h2>
        <form className="space-y-3">
          <input name="make" placeholder="Make" className="input" defaultValue={String(searchParams.make ?? "")} />
          <select name="sort" className="input" defaultValue={sort}>
            <option value="price_asc">Price (Low to High)</option><option value="price_desc">Price (High to Low)</option>
            <option value="year_desc">Year (Newest)</option><option value="mileage_asc">Mileage (Low)</option>
          </select>
          <button className="btn-primary w-full">Apply</button>
        </form>
      </aside>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => (
          <article key={v.id} className="card overflow-hidden">
            <img src={v.photos[0]?.url || "/vehicles/placeholder-1.svg"} alt="vehicle" className="h-44 w-full object-cover" />
            <div className="p-4 space-y-1">
              <h3 className="font-semibold">{v.year} {v.make} {v.model}</h3>
              <p className="text-sm">{formatMoney(v.price)} • {v.mileage?.toLocaleString() ?? "N/A"} mi</p>
              <Link className="btn-primary mt-3 w-full" href={`/inventory/${v.stockNumber}`}>View Details</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
