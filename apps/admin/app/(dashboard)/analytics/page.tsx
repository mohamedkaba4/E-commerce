import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const [
    productCount,
    categoryCount,
    featuredCount,
    outOfStockCount,
    products,
  ] = await Promise.all([
    db.product.count(),

    db.categories.count(),

    db.product.count({
      where: {
        featured: true,
      },
    }),

    db.product.count({
      where: {
        inventory: 0,
      },
    }),

    db.product.findMany({
      select: {
        price: true,
        inventory: true,
      },
    }),
  ])

  const totalInventory = products.reduce(
    (total, product) => total + product.inventory,
    0
  )

  const inventoryValue = products.reduce(
    (total, product) =>
      total + product.price * product.inventory,
    0
  )

  const metrics = [
    {
      label: 'Total products',
      value: productCount.toLocaleString(),
    },
    {
      label: 'Categories',
      value: categoryCount.toLocaleString(),
    },
    {
      label: 'Featured products',
      value: featuredCount.toLocaleString(),
    },
    {
      label: 'Out of stock',
      value: outOfStockCount.toLocaleString(),
    },
    {
      label: 'Inventory units',
      value: totalInventory.toLocaleString(),
    },
    {
      label: 'Inventory value',
      value: `$${inventoryValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
  ]

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Analytics</h1>

        <p className="mt-2 text-sm text-neutral-400">
          Current product and inventory overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-xl border border-neutral-800 bg-neutral-950 p-6"
          >
            <p className="text-sm text-neutral-400">
              {metric.label}
            </p>

            <p className="mt-3 text-3xl font-semibold">
              {metric.value}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-6">
        <h2 className="text-lg font-semibold">
          Sales analytics
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Revenue, order totals and customer metrics will become
          available after Order and OrderItem records are added.
        </p>
      </div>
    </section>
  )
}
