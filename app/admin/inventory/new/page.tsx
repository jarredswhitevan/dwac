import { requireAdminPage } from "@/lib/require-admin-page";
import Link from "next/link";

export default async function NewVehiclePage() {
  await requireAdminPage();
  return <div className="card p-4"><h1 className="text-xl font-semibold mb-3">Create Vehicle</h1><form action="/api/admin/inventory" method="post" encType="multipart/form-data" className="grid gap-2 md:grid-cols-2">{["stockNumber","vin","year","make","model","trim","mileage","price","exteriorColor","interiorColor","transmission","drivetrain","fuelType","bodyStyle"].map(f=><input key={f} className="input" name={f} placeholder={f} required={["stockNumber","year","make","model"].includes(f)} />)}<textarea className="input md:col-span-2" name="description" placeholder="description" /><select className="input" name="status"><option>AVAILABLE</option><option>PENDING</option><option>SOLD</option></select><label><input type="checkbox" name="featured" /> Featured</label><input type="file" name="photos" multiple className="md:col-span-2" /><button className="btn-primary md:col-span-2" type="submit">Save</button></form><Link className="text-sm underline" href="/admin/inventory">Back</Link></div>;
}
