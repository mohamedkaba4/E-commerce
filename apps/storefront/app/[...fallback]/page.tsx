import React from 'react';
import Link from 'next/link';

interface Props {
  params: Promise<{ fallback: string[] }>;
}

// Structured content dictionary to dynamically supply text for every single footer link
const PAGE_CONTENT_REGISTRY: Record<string, { title: string; subtitle: string; body: string }> = {
  'about': {
    title: 'About Mavencrest',
    subtitle: 'ENGINEERING ELITE ATHLETIC INFRASTRUCTURE',
    body: 'Founded on the principles of absolute performance, Mavencrest delivers precision-engineered sportswear and recovery formulations for high-intensity disciplines. We bridge the gap between human endurance and cutting-edge material science.',
  },
  'careers': {
    title: 'Careers',
    subtitle: 'JOIN THE PERFORMANCE REVOLUTION',
    body: 'We are continuously seeking cloud systems architects, material engineers, and visionary designers to scale our global retail operations. Explore our open trajectories across engineering, design, and operations.',
  },
  'sustainability': {
    title: 'Sustainability Blueprint',
    subtitle: 'ZERO WASTE PATHWAYS',
    body: 'Our structural goal is absolute neutrality. From tracking supply chain footprints to implementing premium recycled composites in our high-intensity court shoes, our gear is built to outlast the competition without outlasting the planet.',
  },
  'press': {
    title: 'Press Room',
    subtitle: 'MEDIA DESK & CORPORATE ANNOUNCEMENTS',
    body: 'Access official corporate press kits, brand assets, product launch timelines, and executive briefings regarding our strategic investments in athletic architecture.',
  },
  'account': {
    title: 'My Account Portal',
    subtitle: 'SECURE CREDENTIAL MANAGEMENT',
    body: 'Access your secure operational profile, adjust authentication credentials, view saved gear manifests, and manage your localized delivery endpoints.',
  },
  'orders': {
    title: 'Track Order',
    subtitle: 'LOGISTICS & SHIPMENT MANIFESTS',
    body: 'Enter your tracking identifier below to locate your dispatch package. Real-time updates map the precise transit progression of your gear shipments.',
  },
  'gift-cards': {
    title: 'Gift Cards',
    subtitle: 'EQUIP THE TEAM',
    body: 'Deploy digital value assets to crew members instantly. Premium gift tokens are applicable across all online catalog segments and physical flagship dispensaries.',
  },
  'support': {
    title: 'Contact Support',
    subtitle: 'TECHNICAL ASSISTANCE CHANNELS',
    body: 'Encountering structural issues with an order or account credential? Our technical response unit is active 24/7. Open a support sequence via standard terminal routing.',
  },
  'returns': {
    title: 'Return Policy',
    subtitle: 'SATISFACTION CONTRACTS',
    body: 'If your selected apparel sizes or hardware models do not match your current field parameters, submit an asset fallback return within 30 days for an absolute exchange.',
  },
  'shipping': {
    title: 'Shipping Rates',
    subtitle: 'GLOBAL DISPATCH NETWORKS',
    body: 'Standard cargo routing is calculated automatically at checkout based on regional sorting metrics. Expedited air freight paths are available for urgent deployments.',
  },
  'security': {
    title: 'Privacy & Security',
    subtitle: 'DATA ENVELOPE SECURE PROTOCOLS',
    body: 'We implement advanced encryption architectures to isolate your identity maps and payment channels. Your transaction telemetry is securely gated and never shared.',
  },
  'terms': {
    title: 'Terms of Service',
    subtitle: 'OPERATIONAL CHARTERS',
    body: 'By interfacing with the Mavencrest digital node and acquiring corporate products, you agree to comply with our global network usage protocols and purchase terms.',
  },
};

export default async function FallbackPlaceholderPage({ params }: Props) {
  const { fallback } = await params;
  const currentKey = fallback[fallback.length - 1].toLowerCase();

  // Find the exact content block or default to a generic brand message
  const pageData = PAGE_CONTENT_REGISTRY[currentKey] || {
    title: 'Corporate Portal',
    subtitle: 'MAVENCREST REPOSITORY',
    body: 'Welcome to the centralized documentation interface. Select an alternate pipeline from the navigation footer to review localized corporate briefs.',
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      
      {/* Mega Header Navigation */}
      <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-[1000] tracking-tighter italic uppercase text-white hover:opacity-80 transition-opacity">
            MAVENCREST
          </Link>
          <nav className="hidden lg:flex items-center gap-10">
            {['men', 'women', 'kids', 'running', 'nutrition'].map((cat) => (
              <Link 
                key={cat} 
                href={`/categories/${cat}`} 
                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Corporate Brief Layout */}
      <main className="flex-grow max-w-[1000px] w-full mx-auto px-6 md:px-10 pt-20 pb-32">
        <div className="space-y-8">
          
          {/* Breadcrumb Action */}
          <div>
            <Link href="/" className="text-zinc-600 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors">
              &larr; Exit Registry to Catalog
            </Link>
          </div>

          {/* Typography Hero Group */}
          <div className="border-b border-zinc-900 pb-10">
            <span className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase block mb-3">
              {pageData.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
              {pageData.title}
            </h1>
          </div>

          {/* Narrative Content Body */}
          <div className="max-w-2xl">
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              {pageData.body}
            </p>
          </div>

          {/* Styled Branding Metric Block */}
          <div className="pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <div className="text-zinc-600 font-mono text-[9px] tracking-widest uppercase mb-1">System Status</div>
              <div className="text-xs font-bold uppercase tracking-tight text-white">Operational</div>
            </div>
            <div>
              <div className="text-zinc-600 font-mono text-[9px] tracking-widest uppercase mb-1">Region Gated</div>
              <div className="text-xs font-bold uppercase tracking-tight text-white">Global Dispatch</div>
            </div>
          </div>

        </div>
      </main>

      {/* Premium Footer Continuity */}
      <footer className="bg-[#0A0A0A] border-t border-zinc-900 text-zinc-400 text-xs py-16 mt-auto">
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
          <p className="text-zinc-600 text-[10px] tracking-widest uppercase font-mono">© 2026 MAVENCREST Sporting Goods Co. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}