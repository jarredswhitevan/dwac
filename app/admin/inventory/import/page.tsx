import { requireAdminPage } from "@/lib/require-admin-page";
import ImportClient from "./ImportClient";

export default async function ImportPage() {
  await requireAdminPage();
  return <ImportClient />;
}
