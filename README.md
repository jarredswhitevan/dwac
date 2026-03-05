# Dave White Auto Credit MVP

Next.js 14 + TypeScript + Tailwind + Prisma/Postgres MVP dealership site.

## Features
- Public: Home, inventory SRP, VDP, secure pre-qualification application, about page.
- Admin (NextAuth credentials): dashboard, inventory CRUD, CSV+ZIP import, application review/update.
- Security: bcrypt password hashing, Zod validation, rate limiting, AES-256-GCM field encryption at rest for PII, same-site auth cookie.
- Storage abstraction with local filesystem provider (`/public/uploads`) ready for S3 provider extension.

## Setup
1. Copy env values:
   ```bash
   cp .env.example .env
   ```
2. Install deps and generate prisma client:
   ```bash
   npm install
   npm run prisma:generate
   ```
3. Run migration + seed:
   ```bash
   npm run prisma:migrate
   npm run seed
   ```
4. Start:
   ```bash
   npm run dev
   ```

## Admin credentials
Set via `ADMIN_EMAIL` and `ADMIN_PASSWORD` before running seed.

## Bulk import
Route: `/admin/inventory/import`.
- Upload CSV with columns (case-insensitive):
  `stockNumber, vin, year, make, model, trim, mileage, price, exteriorColor, interiorColor, transmission, drivetrain, fuelType, bodyStyle, description, status, featured`
- Upload ZIP images named as `STOCKNUMBER_#.jpg` (e.g. `DWAC123_1.jpg`, `DWAC123_2.jpg`).

## ENV vars
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `APP_ENCRYPTION_KEY` (32-byte base64)
- `FULL_CREDIT_APP_URL` (optional server value)

## Notes
- No SSN collection in application flow.
- Full credit application handoff is via external URL button.
- Designed for Vercel/serverless-compatible route handlers.
