import Link from 'next/link'
import { notFound } from 'next/navigation'
import { updateProduct } from '@/app/actions/products'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

type EditProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params

  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: {
        id,
      },
    }),

    db.categories.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
      },
    }),
  ])

  if (!product) {
    notFound()
  }

  const updateProductWithId = updateProduct.bind(
    null,
    product.id
  )

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8">
        <Link
          href="/products"
          className="text-sm font-medium text-neutral-400 hover:text-white"
        >
          ← Back to products
        </Link>

        <h1 className="mt-4 text-3xl font-semibold">
          Edit product
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Update product details, pricing and inventory.
        </p>
      </div>

      <form
        action={updateProductWithId}
        className="space-y-6"
      >
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">
            Product information
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Field label="Name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={product.name}
                className={inputClassName}
              />
            </Field>

            <Field label="Slug" htmlFor="slug">
              <input
                id="slug"
                name="slug"
                type="text"
                required
                defaultValue={product.slug}
                className={inputClassName}
              />
            </Field>

            <div className="md:col-span-2">
              <Field
                label="Description"
                htmlFor="description"
              >
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  defaultValue={product.description}
                  className={inputClassName}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">
            Pricing and inventory
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Field label="Price" htmlFor="price">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                  $
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  defaultValue={product.price}
                  className={`${inputClassName} pl-7`}
                />
              </div>
            </Field>

            <Field
              label="Compare-at price"
              htmlFor="compareAt"
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                  $
                </span>

                <input
                  id="compareAt"
                  name="compareAt"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={product.compareAt ?? ''}
                  className={`${inputClassName} pl-7`}
                />
              </div>
            </Field>

            <Field
              label="Inventory"
              htmlFor="inventory"
            >
              <input
                id="inventory"
                name="inventory"
                type="number"
                required
                min="0"
                step="1"
                defaultValue={product.inventory}
                className={inputClassName}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">
            Organization
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Field
              label="Category"
              htmlFor="categoryId"
            >
              <select
                id="categoryId"
                name="categoryId"
                required
                defaultValue={product.categoryId}
                className={inputClassName}
              >
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>

            <div>
              <p className="text-sm font-medium text-neutral-200">
                Visibility
              </p>

              <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-800 p-4">
                <input
                  name="featured"
                  type="checkbox"
                  defaultChecked={product.featured}
                  className="h-4 w-4 rounded border-neutral-600"
                />

                <span>
                  <span className="block text-sm font-medium">
                    Featured product
                  </span>

                  <span className="mt-1 block text-xs text-neutral-500">
                    Highlight this product on the storefront.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">
            Product images
          </h2>

          <p className="mt-2 text-sm text-neutral-400">
            Enter one image URL per line. The first image
            is the primary product image.
          </p>

          <div className="mt-6">
            <Field label="Image URLs" htmlFor="images">
              <textarea
                id="images"
                name="images"
                required
                rows={6}
                defaultValue={product.images.join('\n')}
                className={inputClassName}
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/products"
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

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-neutral-200"
      >
        {label}
      </label>

      {children}
    </div>
  )
}
