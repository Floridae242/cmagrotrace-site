import Link from 'next/link';

export default function Footer(){
  return (
    <footer className="border-t border-neutral-200 mt-12">
      <div className="container py-8 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold">CM‑AgroTrace</div>
          <p className="small mt-2">QR traceability for Chiang Mai longan. Scan to see origin and timeline.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Links</div>
          <ul className="space-y-1 small">
            <li><Link href="/why">Why</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/tech">Logistics & Tech</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <p className="small">Email: hello@cm-agrotrace.example</p>
          <p className="small">Language: EN / TH</p>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4">
        <div className="container small text-neutral-500">© {new Date().getFullYear()} CM‑AgroTrace. All rights reserved.</div>
      </div>
    </footer>
  );
}
