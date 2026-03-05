"use client";

export default function UpdateApplicationForm({ id, status }: { id: string; status: string }) {
  async function action(formData: FormData) {
    await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    window.location.reload();
  }

  return (
    <form action={action} className="space-y-2">
      <select name="status" className="input" defaultValue={status}><option>NEW</option><option>IN_REVIEW</option><option>CONTACTED</option><option>APPROVED</option><option>DECLINED</option><option>CLOSED</option></select>
      <textarea className="input" name="internalNotes" placeholder="Internal notes" />
      <button className="btn-primary">Save</button>
    </form>
  );
}
