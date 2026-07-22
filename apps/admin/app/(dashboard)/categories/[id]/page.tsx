import Link from 'next/link'
import { notFound } from 'next/navigation'
import { updateCategory } from '@/app/actions/categories'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

type EditCategoryPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params

  const category = await db.categories.findUnique({
    where: {
      id,
    },
  })

  if (!category) {
    notFound()
  }

  const updateCategoryWithId = updateCategory.bind(
    null,
    category.id
  )

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link
          href="/categories"
          className="text-sm font-medium text-neutral-400 hover:text-white"
        >
          ← Back to categories
        </Link>

        <h1 className="mt-4 text-3xl font-semibold">
          Edit category
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Update the category name and storefront URL.
        </p>
      </div>

      <form
        action={updateCategoryWithId}
        className="space-y-6"
      >
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <div className="grid gap-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-neutral-200"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={category.name}
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-medium text-neutral-200"
              >
                Slug
              </label>

              <input
                id="slug"
                name="slug"
                type="text"
                required
                defaultValue={category.slug}
                className={inputClassName}
              />

              <p className="mt-2 text-xs text-neutral-500">
                Used in the storefront category URL.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/categories"
            className="rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-300 hover:bg-neutral-900"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200"
          >
            Save changes
          </button>
        </div>
      </form>
    </section>
  )
}

const inputClassName =
  'w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-700'
