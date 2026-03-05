"use client";

import { useMemo, useState } from "react";

const steps = ["Contact", "Residence", "Employment", "Vehicle", "Review"];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<any>({
    housingStatus: "RENT", consentGiven: false, tradeIn: false, vehicleStockInterested: ""
  });

  const update = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  const canNext = useMemo(() => {
    if (step === 0) return form.firstName && form.lastName && form.phone && form.email;
    if (step === 1) return form.addressStreet && form.addressCity && form.addressState && form.addressZip && form.timeAtAddressMonths;
    if (step === 2) return form.monthlyIncomeCents;
    if (step === 4) return form.consentGiven;
    return true;
  }, [form, step]);

  async function submit() {
    const res = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) setDone(true);
  }

  if (done) return <div className="container-base py-10"><div className="card p-6 space-y-3"><h1 className="text-2xl font-bold">Thanks — we’ll contact you shortly.</h1><div className="flex gap-3"><a className="btn-primary" href="tel:+14195551212">Call Us</a><a className="btn-secondary" href="sms:+14195551212">Text Us</a>{process.env.NEXT_PUBLIC_FULL_CREDIT_APP_URL && <a className="btn-primary" href={process.env.NEXT_PUBLIC_FULL_CREDIT_APP_URL}>Complete Full Credit App</a>}</div></div></div>;

  return (
    <div className="container-base py-8">
      <h1 className="text-3xl font-bold">Secure Finance Application</h1>
      <p className="mt-2 text-sm text-slate-600">Pre-qualification only. No SSN collected. reCAPTCHA placeholder enabled via env toggle.</p>
      <div className="my-4 flex gap-2 text-xs">{steps.map((s, i) => <span key={s} className={`rounded-full px-3 py-1 ${i<=step?"bg-brand-700 text-white":"bg-slate-200"}`}>{i+1}. {s}</span>)}</div>
      <div className="card p-4 grid gap-3">
        {step===0 && <>
          <input className="input" placeholder="First Name" onChange={e=>update("firstName",e.target.value)} />
          <input className="input" placeholder="Last Name" onChange={e=>update("lastName",e.target.value)} />
          <input className="input" placeholder="Phone" onChange={e=>update("phone",e.target.value)} />
          <input className="input" placeholder="Email" onChange={e=>update("email",e.target.value)} />
        </>}
        {step===1 && <>
          <input className="input" placeholder="Street" onChange={e=>update("addressStreet",e.target.value)} />
          <input className="input" placeholder="City" onChange={e=>update("addressCity",e.target.value)} />
          <input className="input" placeholder="State" onChange={e=>update("addressState",e.target.value)} />
          <input className="input" placeholder="ZIP" onChange={e=>update("addressZip",e.target.value)} />
          <input className="input" placeholder="Time at address (months)" type="number" onChange={e=>update("timeAtAddressMonths",Number(e.target.value))} />
          <select className="input" onChange={e=>update("housingStatus",e.target.value)}><option>RENT</option><option>OWN</option><option>OTHER</option></select>
        </>}
        {step===2 && <>
          <input className="input" placeholder="Monthly income (cents)" type="number" onChange={e=>update("monthlyIncomeCents",Number(e.target.value))} />
          <input className="input" placeholder="Employer Name" onChange={e=>update("employerName",e.target.value)} />
          <input className="input" placeholder="Job Title" onChange={e=>update("jobTitle",e.target.value)} />
        </>}
        {step===3 && <>
          <input className="input" placeholder="Vehicle Stock Number (optional)" defaultValue={new URLSearchParams(window.location.search).get("stock")||""} onChange={e=>update("vehicleStockInterested",e.target.value)} />
          <label className="text-sm"><input type="checkbox" onChange={e=>update("tradeIn",e.target.checked)} /> Trade-in</label>
        </>}
        {step===4 && <>
          <label className="text-sm"><input type="checkbox" onChange={e=>update("consentGiven",e.target.checked)} /> I authorize you to contact me and I certify info is accurate.</label>
          <pre className="rounded bg-slate-100 p-3 text-xs">{JSON.stringify(form, null, 2)}</pre>
        </>}
        <div className="flex justify-between pt-2">
          <button className="btn-secondary" disabled={step===0} onClick={()=>setStep((s)=>s-1)}>Back</button>
          {step < 4 ? <button className="btn-primary" disabled={!canNext} onClick={()=>setStep((s)=>s+1)}>Next</button> : <button className="btn-primary" disabled={!canNext} onClick={submit}>Submit Securely</button>}
        </div>
      </div>
    </div>
  );
}
