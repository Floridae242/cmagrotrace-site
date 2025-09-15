import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({ 
  title = 'CM‑AgroTrace - Agricultural Supply Chain Traceability',
  description = 'Empower your agricultural supply chain with blockchain-based traceability. Track produce from farm to consumer with CM‑AgroTrace.',
  image = '/og-image.jpg', // You'll need to add this image
  url = 'https://cmagrotrace.com', // Replace with your actual domain
  type = 'website'
}: SEOProps) {
  const fullTitle = title.includes('CM‑AgroTrace') ? title : `${title} | CM‑AgroTrace`;
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en,th" />
      <meta name="google" content="notranslate" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}