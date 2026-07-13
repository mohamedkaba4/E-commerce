import React from 'react';
import Link from 'next/link';
import ProductCard from '@/app/components/ProductCard';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Adidas Continental 80', price: 180, category: 'Men', image: '/adidas80.jpg', description: 'Extreme comfort and timeless design.', slug: 'Adidas Continental 80', sizes: ['8', '9', '10'], colors: ['White', 'Black'] },
  { id: '2', name: 'Apex Elite Court Shoes', price: 140, category: 'Men', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80', description: 'Maximum lateral stability for high-intensity court play.', slug: 'apex-elite-court', sizes: ['9', '10', '11'], colors: ['White', 'Blue'] },
  { id: '3', name: 'Vanguard Training Hoodie', price: 85, category: 'Women', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=80', description: 'Thermal regulation fabric engineered for outdoor sessions.', slug: 'vanguard-hoodie', sizes: ['S', 'M', 'L'], colors: ['Gray', 'Black'] },
  { id: '4', name: 'AeroShell Windbreaker', price: 110, category: 'Running', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80', description: 'Ultra-lightweight weather resistance.', slug: 'aeroshell-windbreaker', sizes: ['M', 'L', 'XL'], colors: ['Volt'] },
  { id: '5', name: 'Pro-Isolate Hydration Matrix', price: 45, category: 'Nutrition', image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=600&auto=format&fit=crop&q=80', description: 'Pure whey isolate with optimal amino recovery profile.', slug: 'pro-isolate-hydration', sizes: ['2 lbs'], colors: ['Chocolate'] },
];

export default async function Home() {
  const categories = [
    { name: 'Men', slug: 'men', img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80' },
    { name: 'Women', slug: 'women', img: '/wsoccer.jpg' },
    { name: 'Kids', slug: 'kids', img: '/madrid.jpeg' },
    { name: 'Running', slug: 'running', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80' },
    { name: 'Nutrition', slug: 'nutrition', img: '/nutrition.jpg' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Discipline Explorer Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-10 w-full">
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">Explore Training Disciplines</h2>
            <p className="text-zinc-500 text-sm font-light">Gear customized for your specific operational focus.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/categories/${cat.slug}`}
                className="relative h-72 group overflow-hidden bg-zinc-900 border border-zinc-900 transition-all duration-300 hover:border-zinc-700 block"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div 
                  className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500 bg-center bg-cover opacity-60" 
                  style={{ backgroundImage: `url('${cat.img}')` }} 
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-lg font-black uppercase tracking-tight text-white mb-0.5">{cat.name}</h3>
                  <span className="text-zinc-400 text-[10px] font-mono tracking-widest uppercase group-hover:text-white group-hover:underline">
                    Explore Gear &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Dynamic Showcase Catalog Items Block */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-24 w-full">
        <div className="flex items-baseline justify-between mb-8 border-b border-zinc-900 pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tight">Featured Training Gear</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                images: [product.image],
                slug: product.slug,
                sizes: product.sizes,
                colors: product.colors,
                featured: true,
                category: { 
                  id: 'mock-id', 
                  name: product.category, 
                  slug: product.category.toLowerCase().replace(/\s+/g, '-') 
                }
              } as any}
            />
          ))}
        </div>
      </div>

      {/* Premium Multi-Column Brand Footer */}
      <footer className="bg-[#0A0A0A] border-t border-zinc-900 text-zinc-400 text-xs py-16 mt-auto w-full">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-5 text-[11px]">Company</h4>
            <ul className="space-y-3 font-medium text-zinc-500 text-xs">
              <li><Link className="hover:text-white transition-colors duration-200" href="/about">About Us</Link></li>
              <li><Link className="hover:text-white transition-colors duration-200" href="/careers">Careers</Link></li>
              <li><Link className="hover:text-white transition-colors duration-200" href="/sustainability">Sustainability</Link></li>
              <li><Link className="hover:text-white transition-colors duration-200" href="/press">Press Room</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-5 text-[11px]">Services</h4>
            <ul className="space-y-3 font-medium text-zinc-500 text-xs">
              <li><Link href="/account" className="hover:text-white transition-colors duration-200">My Account</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors duration-200">Track Order</Link></li>
              <li><Link href="/gift-cards" className="hover:text-white transition-colors duration-200">Gift Cards</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors duration-200">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-5 text-[11px]">Shop</h4>
            <ul className="space-y-3 font-medium text-zinc-500 text-xs">
              <li><Link href="/categories/all" className="hover:text-white transition-colors duration-200">All Gear</Link></li>
              <li><Link href="/categories/men" className="hover:text-white transition-colors duration-200">Men's Segment</Link></li>
              <li><Link href="/categories/women" className="hover:text-white transition-colors duration-200">Women's Segment</Link></li>
              <li><Link href="/categories/running" className="hover:text-white transition-colors duration-200">Running & Athletics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-5 text-[11px]">Resources</h4>
            <ul className="space-y-3 font-medium text-zinc-500 text-xs">
              <li><Link href="/returns" className="hover:text-white transition-colors duration-200">Return Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors duration-200">Shipping Rates</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors duration-200">Privacy & Security</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-10 border-t border-zinc-900 flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-xl font-[1000] tracking-tighter italic uppercase text-white">MAVENCREST</span>
          <p className="text-zinc-600 text-[10px] tracking-widest uppercase font-mono">
            © 2026 MAVENCREST Sporting Goods Co. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
