import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  icon: string;
  category?: string;
}

export default function ProductCard({ name, price, icon, category = "NEW ARRIVAL" }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-[32px] border-3 border-transparent hover:border-[#2E7D32] transition-all p-5 shadow-[4px_4px_0px_#5D4037] hover:shadow-[8px_8px_0px_#5D4037] hover:-translate-y-1 cursor-pointer">
      
      {/* Product Image Area */}
      <div className="bg-[#E1F5FE] rounded-[24px] h-52 flex items-center justify-center text-7xl relative overflow-hidden mb-5">
        <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
        
        {/* Floating Badge */}
        <span className="absolute top-4 left-4 bg-[#FFB300] text-[#1A1A1A] font-[family-name:var(--font-bebas)] text-sm tracking-wider px-3 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>
      
      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-[#1A1A1A] leading-tight uppercase">
          {name}
        </h3>
        <p className="text-[#5D4037]/60 font-bold text-xs uppercase tracking-widest">Premium Quality</p>
      </div>
      
      {/* Footer / Price & Button */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-black text-[#FF5722] uppercase">Price</span>
          <span className="font-[family-name:var(--font-bebas)] text-4xl text-[#1A1A1A]">${price}</span>
        </div>
        
        <button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black px-6 py-3 rounded-2xl shadow-[4px_4px_0px_#1B5E20] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2">
          ADD <span className="text-xl">+</span>
        </button>
      </div>
    </div>
  );
}