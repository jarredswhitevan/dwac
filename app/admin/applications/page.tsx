import Link from "next/link";
import type { Application } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/auth";

export default async function AdminApplicationsPage() {
  await requireAdminPage();

  const apps: Application[] = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="card p-4">
      <h1 className="text-xl font-semibold mb-3">Applications</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Status</th>
            <th className="text-left">Created</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {apps.map((a) => (
            <tr key={a.id} className="border-t">
              <td>{a.firstName} {a.lastName}</td>
              <td>{a.status}</td>
              <td>{new Date(a.createdAt).toLocaleDateString()}</td>
              <td>
                <Link className="underline" href={`/admin/applications/${a.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
