import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { encryptField } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const ip = req.ip ?? "unknown";
  if (!checkRateLimit(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const payload = await req.json();
  const parsed = applicationSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const created = await prisma.application.create({
    data: {
      ...d,
      phone: encryptField(d.phone),
      email: encryptField(d.email),
      addressStreet: encryptField(d.addressStreet),
      addressCity: encryptField(d.addressCity),
      addressState: encryptField(d.addressState),
      addressZip: encryptField(d.addressZip),
      employerName: d.employerName ? encryptField(d.employerName) : undefined,
      jobTitle: d.jobTitle ? encryptField(d.jobTitle) : undefined
    }
  });
  return NextResponse.json({ id: created.id });
}
