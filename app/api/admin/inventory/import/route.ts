import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { parse } from "csv-parse/sync";
import JSZip from "jszip";
import { prisma } from "@/lib/prisma";
import { storageProvider } from "@/lib/storage";

const normalize = (r: Record<string, string>) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k.toLowerCase(), v]));

export async function POST(req: NextRequest) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const form = await req.formData();
  const csv = form.get("csv") as File;
  const zipFile = form.get("images") as File;
  if (!csv || !zipFile) return NextResponse.json({ error: "csv and images required" }, { status: 400 });

  const rows = parse(Buffer.from(await csv.arrayBuffer()), { columns: true, skip_empty_lines: true }) as Record<string, string>[];
  const zip = await JSZip.loadAsync(Buffer.from(await zipFile.arrayBuffer()));
  const report: string[] = [];

  for (const raw of rows) {
    const row = normalize(raw);
    const stockNumber = row.stocknumber;
    if (!stockNumber) continue;
    const vehicle = await prisma.vehicle.upsert({
      where: { stockNumber },
      update: {
        vin: row.vin || undefined, year: Number(row.year), make: row.make, model: row.model, trim: row.trim || undefined,
        mileage: row.mileage ? Number(row.mileage) : undefined, price: row.price ? Number(row.price) : undefined,
        exteriorColor: row.exteriorcolor || undefined, interiorColor: row.interiorcolor || undefined, transmission: row.transmission || undefined,
        drivetrain: row.drivetrain || undefined, fuelType: row.fueltype || undefined, bodyStyle: row.bodystyle || undefined,
        description: row.description || undefined, status: (row.status as any) || "AVAILABLE", featured: row.featured === "true"
      },
      create: {
        stockNumber, vin: row.vin || undefined, year: Number(row.year), make: row.make, model: row.model, trim: row.trim || undefined,
        mileage: row.mileage ? Number(row.mileage) : undefined, price: row.price ? Number(row.price) : undefined,
        exteriorColor: row.exteriorcolor || undefined, interiorColor: row.interiorcolor || undefined, transmission: row.transmission || undefined,
        drivetrain: row.drivetrain || undefined, fuelType: row.fueltype || undefined, bodyStyle: row.bodystyle || undefined,
        description: row.description || undefined, status: (row.status as any) || "AVAILABLE", featured: row.featured === "true"
      }
    });
    const files = Object.values(zip.files).filter((f) => f.name.toUpperCase().startsWith(stockNumber.toUpperCase() + "_") && !f.dir);
    await prisma.vehiclePhoto.deleteMany({ where: { vehicleId: vehicle.id } });
    for (const file of files.sort((a, b) => a.name.localeCompare(b.name))) {
      const uploaded = await storageProvider.upload(file.name, await file.async("nodebuffer"));
      const suffix = Number(file.name.match(/_(\d+)/)?.[1] ?? 999);
      await prisma.vehiclePhoto.create({ data: { vehicleId: vehicle.id, url: uploaded, sortOrder: suffix } });
    }
    report.push(`${stockNumber}: imported ${files.length} photos`);
  }

  return NextResponse.json({ report });
}
