import { db } from '@/lib/db'

export default async function InventoryPage() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      inventory: true,
    }
  })

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">Inventory Management</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-800">
            <th className="py-3">Product Name</th>
            <th className="py-3">Current Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-neutral-800">
              <td className="py-4">{product.name}</td>
              <td className={`py-4 ${product.inventory < 5 ? 'text-red-500 font-bold' : ''}`}>
                {product.inventory}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
