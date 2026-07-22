import Link from 'next/link'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
    },
  })

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Products</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Manage storefront products, pricing and availability.
          </p>
        </div>

        <Link
          href="/products/new"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200"
        >
          Add product
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900 text-xs uppercase text-neutral-400">
            <tr>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Inventory</th>
              <th className="px-5 py-4">Featured</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-800">
            {products.map((product) => (
              <tr key={product.id} className="bg-neutral-950">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-neutral-800" />
                    )}

                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-neutral-500">
                        {product.slug}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-neutral-300">
                  {product.category?.name ?? 'Uncategorized'}
                </td>

                <td className="px-5 py-4">
                  ${product.price.toFixed(2)}
                </td>

                <td className="px-5 py-4">
                  {product.inventory}
                </td>

                <td className="px-5 py-4">
                  {product.featured ? 'Yes' : 'No'}
                </td>

                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-medium text-neutral-300 hover:text-white"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
