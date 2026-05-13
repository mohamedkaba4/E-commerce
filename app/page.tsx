import React from 'react';
import Link from 'next/link';

// Mock function representing your Prisma call
async function getProducts() {
  // const products = await prisma.product.findMany();
  // return products;
  return [
    { id: '1', name: 'Air Max Alpha', price: 120, cat: "Men's Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { id: '2', name: 'Dri-FIT Pro', price: 45, cat: "Apparel", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d" },
  ];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <nav className="h-20 border-b flex items-center justify-between px-10">
        <div className="font-black italic text-2xl">MAVENCREST</div>
        <div className="space-x-8 font-bold text-xs uppercase">
          <Link href="#men">Men</Link>
          <Link href="#women">Women</Link>
          <Link href="/cart">Cart (0)</Link>
        </div>
      </nav>

      <section className="p-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black italic uppercase mb-10">Featured Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link href={`/products/${p.id}`} key={p.id} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-neutral-100 mb-4 overflow-hidden">
                <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={p.name} />
              </div>
              <p className="text-orange-600 text-[10px] font-black uppercase tracking-tighter">{p.cat}</p>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-neutral-500 font-medium">\${p.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
