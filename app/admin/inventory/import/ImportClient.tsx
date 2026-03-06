"use client";
import { useState } from "react";

export default function ImportClient() {
  const [report, setReport] = useState<string[]>([]);
  async function submit(formData: FormData) {
    const res = await fetch("/api/admin/inventory/import", { method: "POST", body: formData });
    const data = await res.json();
    setReport(data.report || [data.error || "Import failed"]);
  }
  return <div className="card p-4 space-y-3"><h1 className="text-xl font-semibold">Bulk Inventory Import</h1><p className="text-sm">Upload CSV + images ZIP. Filenames should use STOCK_#.jpg (e.g., DWAC123_1.jpg).</p><form action={submit} className="space-y-2"><input type="file" name="csv" accept=".csv" required /><input type="file" name="images" accept=".zip" required /><button className="btn-primary">Run Import</button></form><ul className="list-disc pl-5 text-sm">{report.map((r)=><li key={r}>{r}</li>)}</ul></div>;
}
