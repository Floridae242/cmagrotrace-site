import Link from 'next/link';
import React from 'react';

export default function Header(){
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">CM</span>
          CM‑AgroTrace
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/why">Why</Link>
          <Link href="/features">Features</Link>
          <Link href="/tech">Logistics & Tech</Link>
          <Link href="/value">Value & Impact</Link>
          <Link href="/get-started" className="btn btn-primary">Get Started</Link>
        </nav>
      </div>
    </header>
  );
}
