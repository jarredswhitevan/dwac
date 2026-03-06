"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return <div className="container-base py-10 max-w-md"><div className="card p-4 space-y-3"><h1 className="text-xl font-semibold">Admin Login</h1><input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} /><input type="password" className="input" placeholder="Password" onChange={e=>setPassword(e.target.value)} /><button className="btn-primary w-full" onClick={()=>signIn("credentials", { email, password, callbackUrl: "/admin" })}>Sign in</button></div></div>;
}
