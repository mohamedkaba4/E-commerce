import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  icon: string; // Assuming this is an emoji or path
  category?: string;
}

export default function ProductCard({ name, price, icon, category = "NEW ARRIVAL" }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      {/* 1. The Image Container (Defined in our Globals.css) */}
      <div className="product-image-container">
        {/* Category Badge - Subtle & Minimal */}
        <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-brand-black text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border border-neutral-100 uppercase">
          {category}
        </span>
        
        {/* The Icon/Image Area */}
        <div className="text-6xl group-hover:scale-105 transition-transform duration-500 ease-subtle">
          {icon}
        </div>
      </div>

      {/* 2. Product Info - Sophisticated Typography */}
      <div className="mt-5 space-y-1 px-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[14px] font-semibold text-brand-black tracking-tight leading-tight">
              {name}
            </h3>
            <p className="text-[12px] text-neutral-500 mt-0.5">Premium Edition</p>
          </div>
          
          {/* Price - Clean & Bold */}
          <span className="text-[14px] font-bold text-brand-black">
            ${price}
          </span>
        </div>

        {/* 3. Subtle Action / Footer */}
        <div className="pt-4">
          <button className="w-full py-2.5 rounded-full border border-brand-black text-brand-black text-[12px] font-bold uppercase tracking-wider hover:bg-brand-black hover:text-white transition-all duration-300 ease-subtle opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}