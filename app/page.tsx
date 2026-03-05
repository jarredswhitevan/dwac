import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container-base py-12">
      <section className="card overflow-hidden bg-gradient-to-r from-brand-900 to-brand-700 p-10 text-white">
        <h1 className="text-3xl font-bold md:text-5xl">Find Your Next Vehicle at Dave White Auto Credit</h1>
        <p className="mt-4 max-w-2xl text-base text-blue-100">Browse quality pre-owned inventory and get pre-qualified securely in minutes.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/inventory" className="btn bg-white text-brand-900">Shop Inventory</Link>
          <Link href="/apply" className="btn border border-white text-white">Start Finance App</Link>
        </div>
      </section>
    </div>
  );
}
