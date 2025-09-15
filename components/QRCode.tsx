import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  lotId: string;
  size?: number;
}

export default function QRCode({ lotId, size = 128 }: QRCodeProps) {
  const url = `${window.location.origin}/scan/${lotId}`;
  
  return (
    <div className="bg-white p-4 rounded border inline-block">
      <QRCodeSVG
        value={url}
        size={size}
        level="M"
        includeMargin={true}
      />
      <div className="mt-2 text-center text-sm text-gray-600">
        Scan to view lot details
      </div>
    </div>
  );
}