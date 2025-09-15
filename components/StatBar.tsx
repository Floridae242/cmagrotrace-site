export default function StatBar(){
  const items = [
    "QR Traceability",
    "Public Scan Page",
    "Tamper‑evident Record",
    "Packhouse‑ready"
  ];
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {items.map((i)=> <span key={i} className="badge badge-soft">{i}</span>)}
    </div>
  );
}
