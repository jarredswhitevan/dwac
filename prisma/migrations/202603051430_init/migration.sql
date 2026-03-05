CREATE TYPE "VehicleStatus" AS ENUM ('AVAILABLE', 'SOLD', 'PENDING');
CREATE TYPE "ApplicationStatus" AS ENUM ('NEW', 'IN_REVIEW', 'CONTACTED', 'APPROVED', 'DECLINED', 'CLOSED');
CREATE TYPE "HousingStatus" AS ENUM ('RENT', 'OWN', 'OTHER');
CREATE TABLE "User" ("id" TEXT PRIMARY KEY, "email" TEXT UNIQUE NOT NULL, "passwordHash" TEXT NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE "Vehicle" (
  "id" TEXT PRIMARY KEY, "stockNumber" TEXT UNIQUE NOT NULL, "vin" TEXT, "year" INTEGER NOT NULL, "make" TEXT NOT NULL, "model" TEXT NOT NULL, "trim" TEXT,
  "mileage" INTEGER, "price" INTEGER, "exteriorColor" TEXT, "interiorColor" TEXT, "transmission" TEXT, "drivetrain" TEXT, "fuelType" TEXT, "bodyStyle" TEXT,
  "description" TEXT, "status" "VehicleStatus" NOT NULL DEFAULT 'AVAILABLE', "featured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "VehiclePhoto" (
 "id" TEXT PRIMARY KEY, "vehicleId" TEXT NOT NULL REFERENCES "Vehicle"("id") ON DELETE CASCADE,
 "url" TEXT NOT NULL, "alt" TEXT, "sortOrder" INTEGER NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Application" (
  "id" TEXT PRIMARY KEY, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW', "firstName" TEXT NOT NULL, "lastName" TEXT NOT NULL,
  "phone" TEXT NOT NULL, "email" TEXT NOT NULL, "addressStreet" TEXT NOT NULL, "addressCity" TEXT NOT NULL, "addressState" TEXT NOT NULL, "addressZip" TEXT NOT NULL,
  "timeAtAddressMonths" INTEGER NOT NULL, "housingStatus" "HousingStatus" NOT NULL, "monthlyIncomeCents" INTEGER NOT NULL,
  "monthlyHousingPaymentCents" INTEGER, "otherIncomeCents" INTEGER, "employerName" TEXT, "jobTitle" TEXT, "timeAtJobMonths" INTEGER,
  "dobMonth" INTEGER, "dobYear" INTEGER, "preferredContactMethod" TEXT, "downPaymentRange" TEXT, "tradeIn" BOOLEAN NOT NULL DEFAULT false,
  "vehicleStockInterested" TEXT, "consentGiven" BOOLEAN NOT NULL, "internalNotes" TEXT
);
