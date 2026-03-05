import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { vehicleSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/admin";
import { storageProvider } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const form = await req.formData();
  const parsed = vehicleSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const vehicle = await prisma.vehicle.create({ data: parsed.data });
  const photos = form.getAll("photos") as File[];
  for (let i = 0; i < photos.length; i++) {
    const p = photos[i]; if (!p.size) continue;
    const url = await storageProvider.upload(p.name, Buffer.from(await p.arrayBuffer()));
    await prisma.vehiclePhoto.create({ data: { vehicleId: vehicle.id, url, sortOrder: i + 1 } });
  }
  return NextResponse.json(vehicle);
}

export async function PUT(req: NextRequest) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const data = await req.json();
  const id = data.id as string;
  const parsed = vehicleSchema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const vehicle = await prisma.vehicle.update({ where: { id }, data: parsed.data });
  return NextResponse.json(vehicle);
}
