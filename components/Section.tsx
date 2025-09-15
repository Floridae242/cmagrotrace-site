import React from 'react';
export default function Section({title, subtitle, children}:{title?:string; subtitle?:string; children: React.ReactNode}){
  return (
    <section className="section">
      <div className="container">
        {title && <h2 className="h2">{title}</h2>}
        {subtitle && <p className="p mt-2">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
