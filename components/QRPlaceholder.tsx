export default function QRPlaceholder(){
  // Simple inline SVG placeholder for a QR code
  return (
    <div className="card p-4 w-48 h-48 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect width="100" height="100" fill="#F3F4F6"/>
        <rect x="8" y="8" width="24" height="24" fill="#111827"/>
        <rect x="68" y="8" width="24" height="24" fill="#111827"/>
        <rect x="8" y="68" width="24" height="24" fill="#111827"/>
        <rect x="40" y="40" width="8" height="8" fill="#111827"/>
        <rect x="56" y="40" width="8" height="8" fill="#111827"/>
        <rect x="40" y="56" width="8" height="8" fill="#111827"/>
        <rect x="56" y="56" width="8" height="8" fill="#111827"/>
      </svg>
    </div>
  );
}
