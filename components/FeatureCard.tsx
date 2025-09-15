import React from 'react';
export default function FeatureCard({title, desc, icon}:{title:string; desc:string; icon?:React.ReactNode}){
  return (
    <div className="card p-5">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">{icon ?? '★'}</div>
        <div>
          <div className="h3">{title}</div>
          <p className="p mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}
