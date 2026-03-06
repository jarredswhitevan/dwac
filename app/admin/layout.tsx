import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-base py-6 space-y-4">
      <nav className="flex gap-3 text-sm">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/inventory">Inventory</Link>
        <Link href="/admin/inventory/import">Import</Link>
        <Link href="/admin/applications">Applications</Link>
      </nav>
      {children}
    </div>
  );
}
