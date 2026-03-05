import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { encryptField } from "@/lib/crypto";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try { await requireAdmin(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { status, internalNotes } = await req.json();
  const app = await prisma.application.update({
    where: { id: params.id },
    data: { status, internalNotes: internalNotes ? encryptField(internalNotes) : undefined }
  });
  return NextResponse.json({ id: app.id });
}
