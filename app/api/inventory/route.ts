import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);
  const take = 12;
  const sort = searchParams.get("sort") ?? "year_desc";
  const [field, direction] = sort.split("_");
  const where = {
    status: "AVAILABLE" as const,
    make: searchParams.get("make") ? { equals: searchParams.get("make")!, mode: "insensitive" as const } : undefined
  };
  const vehicles = await prisma.vehicle.findMany({
    where,
    include: { photos: { orderBy: { sortOrder: "asc" }, take: 1 } },
    orderBy: { [field === "price" ? "price" : field === "mileage" ? "mileage" : "year"]: direction === "asc" ? "asc" : "desc" },
    skip: (page - 1) * take,
    take
  });
  return NextResponse.json(vehicles);
}
