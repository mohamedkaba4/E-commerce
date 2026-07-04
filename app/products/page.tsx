'use client';

import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

// Comprehensive mock data matching a professional sports retail inventory
const MOCK_PRODUCTS = [
  { id: '1', name: 'Alpha Carbon V2', price: 180, category: 'Running', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', description: 'Elite responsiveness and carbon plate propulsion.' },
  { id: '2', name: 'Apex Elite Court Shoes', price: 140, category: 'Men', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80', description: 'Maximum lateral stability for high-intensity court play.' },
  { id: '3', name: 'Vanguard Training Hoodie', price: 85, category: 'Women', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=80', description: 'Thermal regulation fabric engineered for outdoor sessions.' },
  { id: '4', name: 'AeroShell Windbreaker', price: 110, category: 'Running', image: 'https://images.unsplash.com/photo-1514989940723-e8e5163ccbe8?w=600&auto=format&fit=crop&q=80', description: 'Ultra-lightweight weather resistance.' },
  { id: '5', name: 'Pro-Isolate Hydration Matrix', price: 45, category: 'Nutrition', image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600&auto=format&fit=crop&q=80', description: 'Pure whey isolate with optimal amino recovery profile.' },
  { id: '6', name: 'Youth Court Dominator V1', price: 65, category: 'Kids', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80', description: 'Durable traction and ankle support for young athletes.' },
];

const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'Running', 'Nutrition', 'Sale'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#E0FF00] selection:text-black">
      
      {/* 1. HERO IMPACT BANNER */}
      <div className="relative h-[65vh] w-full flex items-center justify-start overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,255,0,0.15)_0%,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
          <span className="text-[#E0FF00] font-mono text-sm tracking-widest uppercase mb-3 block">
            // NEW SEASON ARRIVALS
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter max-w-2xl leading-none mb-6">
            ENGINEERED TO <br/>OUTPERFORM.
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mb-8 font-light">
            Premium performance gear designed, tested, and fine-tuned for elite athletic output.
          </p>
          <button className="bg-white text-black hover:bg-[#E0FF00] transition-colors duration-300 font-bold uppercase tracking-wider text-sm px-8 py-4">
            Shop the Collection
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* 2. PRO RETRO STICKY FILTER BAR */}
        <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md py-6 border-b border-zinc-800 mb-12 flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex gap-2 whitespace-nowrap">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 border ${
                  selectedCategory === category
                    ? 'bg-[#E0FF00] text-black border-[#E0FF00]'
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center text-xs font-mono text-zinc-500 uppercase tracking-wider">
            Showing {filteredProducts.length} Results
          </div>
        </div>

        {/* 3. PERFORMANCE DYNAMIC PRODUCT GRID */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              {selectedCategory} Gear
            </h2>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative flex flex-col bg-zinc-950 border border-zinc-900 p-4 transition-all duration-300 hover:border-zinc-700">
                  <ProductCard product={product} />
                  <div className="mt-4 flex flex-col flex-grow">
                    <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="text-lg font-bold group-hover:text-[#E0FF00] transition-colors duration-200">{product.name}</h3>
                    <p className="text-zinc-400 text-sm font-light mt-1 flex-grow line-clamp-2">{product.description}</p>
                    <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center justify-between">
                      <span className="font-mono font-bold text-lg">${product.price}</span>
                      <button className="text-xs uppercase tracking-widest font-bold bg-zinc-900 px-4 py-2 hover:bg-white hover:text-black transition-colors duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-zinc-800">
              <p className="text-zinc-500 font-mono uppercase text-sm">No products found in this category.</p>
            </div>
          )}
        </section>

        {/* 4. DEEP SCROLL LOWER CATEGORIES CAROUSEL */}
        <section className="border-t border-zinc-900 pt-16 mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">Explore Training Disciplines</h2>
            <p className="text-zinc-500 text-sm font-light">Gear customized for your specific operational focus.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 group overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500 bg-center bg-cover opacity-60" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80')` }} />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">High-Intensity Training</h3>
                <span className="text-[#E0FF00] text-xs font-mono tracking-widest uppercase group-hover:underline">Explore Collection &rarr;</span>
              </div>
            </div>

            <div className="relative h-80 group overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500 bg-center bg-cover opacity-60" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80')` }} />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Track & Field</h3>
                <span className="text-[#E0FF00] text-xs font-mono tracking-widest uppercase group-hover:underline">Explore Collection &rarr;</span>
              </div>
            </div>

            <div className="relative h-80 group overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500 bg-center bg-cover opacity-60" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=80')` }} />
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Combat Sports</h3>
                <span className="text-[#E0FF00] text-xs font-mono tracking-widest uppercase group-hover:underline">Explore Collection &rarr;</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
