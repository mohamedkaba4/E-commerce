import Link from 'next/link'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export default async function CategoriesPage() {
  const categories = await db.categories.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  })

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Categories</h1>

          <p className="mt-2 text-sm text-neutral-400">
            Organize products into store categories.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-lg bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-500"
        >
          Add category
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900 text-xs uppercase text-neutral-400">
            <tr>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Slug</th>
              <th className="px-5 py-4">Products</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4">Last modified</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-800">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-5 py-4">
                  <Link
                    href={`/categories/${category.id}`}
                    className="font-medium text-white hover:underline"
                  >
                    {category.name}
                  </Link>
                </td>

                <td className="px-5 py-4 text-neutral-400">
                  {category.slug}
                </td>

                <td className="px-5 py-4">
                  {category._count.products}
                </td>

                <td className="px-5 py-4 text-neutral-400">
                  {formatDateTime(category.createdAt)}
                </td>

                <td className="px-5 py-4 text-neutral-400">
                  {formatDateTime(category.updatedAt)}
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-neutral-500"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
