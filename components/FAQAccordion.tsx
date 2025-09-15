'use client';
import React from 'react';

type QA = { q:string; a:string };
export default function FAQAccordion({items}:{items:QA[]}){
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="card divide-y divide-neutral-100">
      {items.map((it,idx)=> (
        <details key={idx} open={open===idx} onToggle={(e)=> setOpen((e.currentTarget as HTMLDetailsElement).open ? idx : null)}>
          <summary className="cursor-pointer p-4 font-medium">{it.q}</summary>
          <div className="p-4 pt-0 text-neutral-700">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
