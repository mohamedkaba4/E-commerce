import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-100">
      <div className="section-container !py-4 flex justify-between items-center">
        {/* Brand Identity */}
        <Link href="/" className="text-[15px] font-black tracking-[-0.04em] uppercase">
          Mavencrest
        </Link>

        {/* Navigation - Professional Spacing */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/men" className="nav-link">Men</Link>
          <Link href="/women" className="nav-link">Women</Link>
          <Link href="/collections" className="nav-link">Collections</Link>
          <Link href="/about" className="nav-link">Our Story</Link>
        </nav>

        {/* Utility Links */}
        <div className="flex items-center gap-6">
          <button className="nav-link">Search</button>
          <Link href="/cart" className="nav-link flex items-center gap-2">
            Cart <span className="bg-brand-black text-white text-[10px] px-1.5 py-0.5 rounded-full">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}