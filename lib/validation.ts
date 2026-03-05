import { z } from "zod";

export const vehicleSchema = z.object({
  stockNumber: z.string().min(1),
  vin: z.string().optional().or(z.literal("")),
  year: z.coerce.number().int().min(1900).max(2100),
  make: z.string().min(1),
  model: z.string().min(1),
  trim: z.string().optional(),
  mileage: z.coerce.number().int().optional(),
  price: z.coerce.number().int().optional(),
  exteriorColor: z.string().optional(),
  interiorColor: z.string().optional(),
  transmission: z.string().optional(),
  drivetrain: z.string().optional(),
  fuelType: z.string().optional(),
  bodyStyle: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["AVAILABLE", "SOLD", "PENDING"]).default("AVAILABLE"),
  featured: z.coerce.boolean().default(false)
});

export const applicationSchema = z.object({
  firstName: z.string().min(1), lastName: z.string().min(1), phone: z.string().min(7), email: z.string().email(),
  addressStreet: z.string().min(1), addressCity: z.string().min(1), addressState: z.string().min(2), addressZip: z.string().min(5),
  timeAtAddressMonths: z.coerce.number().int().min(0), housingStatus: z.enum(["RENT", "OWN", "OTHER"]),
  monthlyIncomeCents: z.coerce.number().int().positive(), monthlyHousingPaymentCents: z.coerce.number().int().optional(),
  otherIncomeCents: z.coerce.number().int().optional(), employerName: z.string().optional(), jobTitle: z.string().optional(),
  timeAtJobMonths: z.coerce.number().int().optional(), dobMonth: z.coerce.number().int().min(1).max(12).optional(),
  dobYear: z.coerce.number().int().min(1900).max(2100).optional(), preferredContactMethod: z.string().optional(),
  downPaymentRange: z.string().optional(), tradeIn: z.coerce.boolean().default(false), vehicleStockInterested: z.string().optional(),
  consentGiven: z.coerce.boolean().refine((v) => v)
});
