import Link from 'next/link'

export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-gray-500">
          Mavencrest Admin
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/inventory"
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">Inventory</h2>

            <p className="mt-2 text-sm text-gray-600">
              Review stock levels and adjust product quantities.
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}
