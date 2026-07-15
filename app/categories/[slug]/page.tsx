import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/app/components/ProductCard';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const categorySlug = resolvedParams.slug.toLowerCase(); 

  const categoryData = await prisma.categories.findUnique({
    where: { slug: categorySlug },
    include: {
      products: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  const items = categoryData?.products || [];
  const categoryName = categoryData?.name || resolvedParams.slug;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Sub-Nav Layout */}
      <div className="max-w-[1600px] mx-auto px-10 py-8 flex justify-between items-center border-b border-white/5">
        <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-all italic">
          ← Mavencrest Storefront
        </Link>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
           <span>Sort</span>
           <span>Filter</span>
        </div>
      </div>

      {/* Hero Category Header */}
      <section className="max-w-[1600px] mx-auto px-10 py-16">
        <h1 className="text-[10vw] font-[1000] italic uppercase tracking-tighter leading-[0.8] mb-6 text-white">
          {categoryName}
        </h1>
        <p className="text-neutral-500 font-bold uppercase tracking-[0.4em] text-xs">
          {items.length} High-Performance Results
        </p>
      </section>

      {/* Grid Display Node using standard unified Product Cards */}
      <div className="max-w-[1600px] mx-auto px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 pb-32">
        {items.length > 0 ? (
          items.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                ...product,
                category: {
                  id: categoryData?.id || '',
                  name: categoryName,
                  slug: categorySlug,
                  createdAt: categoryData?.createdAt || new Date(),
                  updatedAt: categoryData?.updatedAt || new Date()
                }
              }}
            />
          ))
        ) : (
          <div className="col-span-full py-40 text-center bg-neutral-900/50 rounded-2xl border border-dashed border-neutral-800">
            <h2 className="text-4xl font-black italic uppercase text-neutral-800 tracking-tighter">Vault Empty</h2>
            <p className="text-neutral-600 font-bold uppercase text-[10px] tracking-[0.3em] mt-4">New drops pending authorization</p>
          </div>
        )}
      </div>
    </main>
  );
}