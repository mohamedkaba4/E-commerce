'use client'

export default function SignupPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-32">
      {/* Back navigation */}
      <a href="/checkout" className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors mb-8 block">
        ← Return to Checkout
      </a>

      {/* Header section matching Corporate Portal style */}
      <div className="mb-16">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Registration Interface</h2>
        <h1 className="text-5xl font-black uppercase tracking-tight italic text-white">Create Account</h1>
        <p className="text-neutral-500 mt-6 max-w-md">Register your secure operational profile to enable gear management and localized dispatch tracking.</p>
      </div>

      {/* Form section */}
      <form className="max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Full Name" className="w-full bg-neutral-950 border border-neutral-800 p-4 text-white focus:border-white outline-none transition-colors" />
        <input type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-800 p-4 text-white focus:border-white outline-none transition-colors" />
        <input type="password" placeholder="Password" className="w-full bg-neutral-950 border border-neutral-800 p-4 text-white focus:border-white outline-none transition-colors" />
        <button type="submit" className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-200 transition-colors">
          Initialize Registration
        </button>
      </form>

      {/* Footer status matching Corporate Portal design */}
      <div className="mt-32 flex gap-12 border-t border-neutral-900 pt-8">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-neutral-600">System Status</p>
          <p className="text-xs font-bold text-white">OPERATIONAL</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-neutral-600">Region Gated</p>
          <p className="text-xs font-bold text-white">GLOBAL DISPATCH</p>
        </div>
      </div>
    </main>
  )
}
