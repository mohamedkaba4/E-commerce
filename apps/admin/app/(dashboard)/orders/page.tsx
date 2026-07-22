import { ShoppingCart } from 'lucide-react'

export default function OrdersPage() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Orders</h1>

        <p className="mt-2 text-sm text-neutral-400">
          Review and manage customer orders.
        </p>
      </div>

      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-950 px-6 text-center">
        <div className="rounded-full bg-neutral-900 p-4">
          <ShoppingCart className="h-7 w-7 text-neutral-400" />
        </div>

        <h2 className="mt-5 text-lg font-semibold">
          Order management is not configured yet
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
          The storefront currently needs Order and OrderItem database
          models before completed purchases can appear here.
        </p>
      </div>
    </section>
  )
}
