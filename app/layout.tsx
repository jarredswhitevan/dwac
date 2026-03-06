import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="container-base flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-bold text-brand-900">Dave White Auto Credit</Link>
            <nav className="flex gap-3 text-sm font-medium">
              <Link href="/inventory">Pre-Owned Vehicles</Link>
              <Link href="/apply">Secure Finance Application</Link>
              <Link href="/about">About Us</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
