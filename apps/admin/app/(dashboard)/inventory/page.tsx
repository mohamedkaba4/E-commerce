import Link from 'next/link'
import { db } from '@/lib/db'
import { adjustInventory } from '@/app/actions/inventory'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  const products = await db.product.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
      slug: true,
      inventory: true,
      featured: true,
    },
  })

  const totalUnits = products.reduce(
    (total, product) => total + product.inventory,
    0
  )

  const lowStockCount = products.filter(
    (product) => product.inventory > 0 && product.inventory <= 5
  ).length

  const outOfStockCount = products.filter(
    (product) => product.inventory <= 0
  ).length

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Mavencrest Admin
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Inventory
            </h1>

            <p className="mt-2 text-gray-600">
              Manage product availability in the storefront.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Dashboard
          </Link>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Total units" value={totalUnits} />
          <SummaryCard label="Low stock" value={lowStockCount} />
          <SummaryCard label="Out of stock" value={outOfStockCount} />
        </section>

        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Inventory</th>
                  <th className="px-6 py-4">Adjustment</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products.map((product) => {
                  const status =
                    product.inventory <= 0
                      ? 'Out of stock'
                      : product.inventory <= 5
                        ? 'Low stock'
                        : 'In stock'

                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {product.slug}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            product.inventory <= 0
                              ? 'bg-red-100 text-red-700'
                              : product.inventory <= 5
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-lg font-semibold">
                        {product.inventory}
                      </td>

                      <td className="px-6 py-4">
                        <form
                          action={adjustInventory}
                          className="flex flex-wrap items-center gap-2"
                        >
                          <input
                            type="hidden"
                            name="productId"
                            value={product.id}
                          />

                          <input
                            type="number"
                            name="adjustment"
                            min={-product.inventory}
                            step="1"
                            required
                            placeholder="+10 or -2"
                            className="w-28 rounded-lg border border-gray-300 px-3 py-2"
                          />

                          <button
                            type="submit"
                            className="rounded-lg bg-gray-950 px-4 py-2 font-medium text-white hover:bg-gray-800"
                          >
                            Update
                          </button>
                        </form>
                      </td>
                    </tr>
                  )
                })}

                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No products were found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

function SummaryCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </article>
  )
}
