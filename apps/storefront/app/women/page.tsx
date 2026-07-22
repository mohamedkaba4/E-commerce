import React from 'react';
import Link from 'next/link';

export default function WomenPage() {
  return (
    <main className="min-h-screen">
      <nav className="section-container !py-4">
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black">← Home</Link>
      </nav>
      <div className="section-container">
        <h1 className="text-5xl font-bold tracking-tighter uppercase italic mb-4">Women's Gear</h1>
        <p className="text-neutral-500">Uncompromising style and support.</p>
      </div>
    </main>
  );
}
