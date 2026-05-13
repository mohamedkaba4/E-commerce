import React from 'react';
import ProductCard from './ProductCard';

const MOCK_PRODUCTS = [
  { id: 1, name: "Pro Grip Basketball", price: 29, icon: "🏀", category: "BEST SELLER" },
  { id: 2, name: "Family Camping Tent", price: 150, icon: "🏕️", category: "FAMILY PICK" },
  { id: 3, name: "Ultra-Light Soccer Ball", price: 25, icon: "⚽", category: "NEW" },
  { id: 4, name: "Adult Mountain Bike", price: 450, icon: "🚲", category: "ELITE" },
];

export default function ProductGrid() {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-[family-name:var(--font-bebas)] text-5xl tracking-tight text-[#1A1A1A]">
          READY FOR <span className="text-[#2E7D32]">ADVENTURE?</span>
        </h2>
        <button className="font-bold text-[#2E7D32] hover:underline">View All →</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard 
            key={product.id}
            name={product.name}
            price={product.price}
            icon={product.icon}
            category={product.category}
          />
        ))}
      </div>
    </section>
  );
}