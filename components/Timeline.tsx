type Event = { type:string; time:string; location?:string };
export default function Timeline({events}:{events: Event[]}){
  return (
    <ol className="relative border-s border-neutral-200 pl-6">
      {events.map((e,idx)=>(
        <li key={idx} className="mb-6 ms-4">
          <div className="absolute w-3 h-3 bg-emerald-600 rounded-full mt-1.5 -start-1.5"></div>
          <time className="small">{e.time}</time>
          <h4 className="font-semibold">{e.type}{e.location? ` — ${e.location}`:''}</h4>
        </li>
      ))}
    </ol>
  );
}
