import FeatureCard from '../components/FeatureCard';
import Section from '../components/Section';

export default function Features(){
  return (
    <Section title="Platform Features" subtitle="Software‑only, mobile‑first, QR + Timeline">
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard title="QR Traceability" desc="Public, scannable lot page—fast on mobile, no login." />
        <FeatureCard title="Lot Timeline & Events" desc="Transport, test, arrival, sale—clear, time‑stamped events." />
        <FeatureCard title="Smart Search & Sort (Roadmap)" desc="Filter by variety, grade, and region; sort by availability or quality." />
        <FeatureCard title="Buyer ↔ Farm Chat (Roadmap)" desc="Align volume, delivery, and specifications with clarity." />
        <FeatureCard title="Tamper‑evident Record" desc="Detect edits with hashing and provide an audit view." />
      </div>
    </Section>
  );
}
