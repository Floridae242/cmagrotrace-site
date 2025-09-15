import Container from '../components/Container';
import Section from '../components/Section';
import StatBar from '../components/StatBar';
import FeatureCard from '../components/FeatureCard';
import Timeline from '../components/Timeline';
import QRPlaceholder from '../components/QRPlaceholder';
import Link from 'next/link';

export default function Home(){
  const demoEvents = [
    { type:'HARVEST_CREATED', time:'2025-08-01 07:30, Fang' },
    { type:'TRANSPORTED', time:'2025-08-01 14:10', location:'Fang → Mae Taeng' },
    { type:'INSPECTED', time:'2025-08-02 10:00', location:'Packhouse' },
    { type:'ARRIVED_AT', time:'2025-08-02 13:30', location:'Wholesale Market' },
    { type:'SOLD', time:'2025-08-02 15:45' },
  ];
  return (
    <>
      <section className="section">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="h1">Longan you can trace—QR to timeline in seconds.</h1>
              <p className="p mt-3">CM‑AgroTrace turns every lot into a transparent story—origin, handling, and quality—so farmers sell fairly and buyers purchase with confidence.</p>
              <div className="mt-6 flex gap-3">
                <Link href="/get-started" className="btn btn-primary">Request Pilot Access</Link>
                <Link href="/faq" className="btn btn-ghost">View Live Demo</Link>
              </div>
              <StatBar />
            </div>
            <div className="card p-6">
              <div className="grid sm:grid-cols-2 gap-6 items-start">
                <div>
                  <div className="small text-neutral-600 mb-2">Scan this QR (demo)</div>
                  <QRPlaceholder />
                </div>
                <div>
                  <div className="small text-neutral-600 mb-2">Sample Lot Timeline</div>
                  <Timeline events={demoEvents} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section title="How it works" subtitle="Create Lot → Add Events → Scan Public Page">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Create Lot" desc="Make a lot in minutes. Print or share the QR." />
          <FeatureCard title="Add Events" desc="Transport, test, arrival, sale—your end-to-end timeline." />
          <FeatureCard title="Scan" desc="Public page opens fast on mobile. No login needed." />
        </div>
      </Section>

      <Section title="Why CM‑AgroTrace" subtitle="Trust, Traceability, Partners, Sustainability">
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard title="Food Security & Trust" desc="Build confidence in quality and safety with verified lot info." />
          <FeatureCard title="Smart Transport & Traceability" desc="See the journey end-to-end with time‑stamped events." />
          <FeatureCard title="Trusted Partners & Happy Buyers" desc="Direct connections and fair pricing with clarity." />
          <FeatureCard title="Healthy Consumers, Sustainable Future" desc="Transparency supports better choices for everyone." />
        </div>
      </Section>
    </>
  );
}
