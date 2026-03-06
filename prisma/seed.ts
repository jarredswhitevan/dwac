import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("ADMIN_EMAIL/ADMIN_PASSWORD are required for seed");

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash: await bcrypt.hash(password, 12) },
    create: { email, passwordHash: await bcrypt.hash(password, 12) }
  });

  for (let i = 1; i <= 10; i++) {
    const stockNumber = `DWAC${100 + i}`;
    const vehicle = await prisma.vehicle.upsert({
      where: { stockNumber },
      update: {},
      create: {
        stockNumber,
        year: 2015 + i,
        make: ["Chevrolet", "Ford", "Honda", "Toyota"][i % 4],
        model: ["Equinox", "F-150", "Civic", "Camry"][i % 4],
        mileage: 25000 + i * 3500,
        price: 1299000 + i * 85000,
        status: "AVAILABLE",
        description: "Clean, inspected pre-owned vehicle ready for delivery."
      }
    });
    await prisma.vehiclePhoto.deleteMany({ where: { vehicleId: vehicle.id } });
    await prisma.vehiclePhoto.createMany({
      data: [
        { vehicleId: vehicle.id, url: `/vehicles/placeholder-${i * 2 - 1}.svg`, sortOrder: 1 },
        { vehicleId: vehicle.id, url: `/vehicles/placeholder-${i * 2}.svg`, sortOrder: 2 }
      ]
    });
  }
}

main().finally(() => prisma.$disconnect());
