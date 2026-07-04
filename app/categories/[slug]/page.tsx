import React from 'react';
import Link from 'next/link';

const DATABASE: any = {
  men: [
    { id: 'm1', name: 'Alpha Carbon 2', price: 275, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', cat: 'Elite Racing' },
    { id: 'm2', name: 'Tech-Knit Ultra Jogger', price: 110, img: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=600&q=80', cat: 'Performance' },
    { id: 'm3', name: 'Aerolayer Vest', price: 145, img: 'https://images.unsplash.com/photo-1616166330003-8e5510436025?auto=format&fit=crop&w=600&q=80', cat: 'Running' },
    { id: 'm4', name: 'Pro-Combat Compression', price: 55, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80', cat: 'Training' },
  ],
  women: [
    { id: 'w1', name: 'Luxe Seamless Leggings', price: 95, img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80', cat: 'Yoga & Train' },
    { id: 'w2', name: 'AeroSwift Singlet', price: 75, img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80', cat: 'Pro Running' },
    { id: 'w3', name: 'Infinity Run 4', price: 160, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80', cat: 'Footwear' },
    { id: 'w4', name: 'Impact Pro Bra', price: 65, img: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=600&q=80', cat: 'Apparel' },
  ],
  kids: [
    { id: 'k1', name: 'Junior Mercurial Cleat', price: 85, img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80', cat: 'Soccer' },
    { id: 'k2', name: 'Young Athlete Windrunner', price: 70, img: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=600&q=80', cat: 'Outerwear' },
    { id: 'k3', name: 'Flex Runner 2', price: 55, img: 'https://images.unsplash.com/photo-1606225457115-9b0de873c5db?auto=format&fit=crop&w=600&q=80', cat: 'Training' },
  ],
  running: [
    { id: 'r1', name: 'Vaporfly Carbon 3', price: 285, img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80', cat: 'Racing' },
    { id: 'r2', name: 'Stride 5" Shorts', price: 65, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', cat: 'Apparel' },
    { id: 'r3', name: 'React Pegasus 40', price: 130, img: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=600&q=80', cat: 'Footwear' },
  ],
  nutrition: [
    { id: 'n1', name: 'Pure Isolated Whey', price: 60, img: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80', cat: 'Recovery' },
    { id: 'n2', name: 'Pre-Workout Igniter', price: 45, img: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80', cat: 'Performance' },
    { id: 'n3', name: 'Omega-3 Pro Pack', price: 35, img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2158?auto=format&fit=crop&w=600&q=80', cat: 'Health' },
  ],
  sale: [
    { id: 's1', name: 'Metcon 8 (Old Season)', price: 85, img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80', cat: 'Training' },
    { id: 's2', name: 'Standard Fit Tee', price: 25, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', cat: 'Apparel' },
  ]
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.slug.toLowerCase(); 
  const items = DATABASE[category] || [];

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
          {category}
        </h1>
        <p className="text-neutral-500 font-bold uppercase tracking-[0.4em] text-xs">
          {items.length} High-Performance Results
        </p>
      </section>

      {/* Grid Display Node */}
      <div className="max-w-[1600px] mx-auto px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 pb-32">
        {items.length > 0 ? (
          items.map((p: any) => (
            <Link 
              href={{ pathname: `/products/${p.id}`, query: { name: p.name, price: p.price, img: p.img, cat: p.cat } }} 
              key={p.id} 
              className="group"
            >
              <div className="aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden mb-6 border border-white/5 relative">
                {/* Fixed Image Element with standard HTML handling for dynamic payloads */}
                <img 
                   src={p.img} 
                   className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                   alt={p.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{p.cat}</p>
                <h3 className="text-xl font-bold uppercase italic tracking-tight text-white transition-colors">
                   {p.name}
                </h3>
                <p className="text-neutral-400 font-bold text-base">${p.price}.00</p>
              </div>
            </Link>
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