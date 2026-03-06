"use client";

export default function EditVehicleForm({ vehicle }: { vehicle: any }) {
  async function onSubmit(formData: FormData) {
    const body = Object.fromEntries(formData.entries());
    await fetch("/api/admin/inventory", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...body, id: vehicle.id })
    });
    window.location.reload();
  }

  return (
    <form action={onSubmit} className="grid gap-2 md:grid-cols-2">
      {["stockNumber","vin","year","make","model","trim","mileage","price"].map((f)=><input key={f} defaultValue={vehicle[f] ?? ""} className="input" name={f} />)}
      <select name="status" defaultValue={vehicle.status} className="input"><option>AVAILABLE</option><option>PENDING</option><option>SOLD</option></select>
      <label><input type="checkbox" name="featured" defaultChecked={vehicle.featured} /> Featured</label>
      <button className="btn-primary md:col-span-2" type="submit">Update</button>
    </form>
  );
}
