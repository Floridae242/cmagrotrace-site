import Section from '../components/Section';
import FeatureCard from '../components/FeatureCard';

export default function Value(){
  return (
    <Section title="Value & Impact" subtitle="Benefits for farmers, buyers, and consumers">
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard title="Farmers" desc="Fair pricing and access to new markets; easier compliance and visibility." />
        <FeatureCard title="Buyers" desc="Traceable lots and logistics visibility; faster procurement." />
        <FeatureCard title="Consumers" desc="Fresh, clean, safe fruit with transparent origin." />
      </div>
      <div className="card p-6 mt-8">
        <h4 className="h3 mb-2">Pilot KPIs</h4>
        <ul className="list-disc pl-6">
          <li>Scan‑through rate</li>
          <li>Time harvest → market</li>
          <li>% lots with complete records</li>
          <li>Dispute reduction</li>
        </ul>
      </div>
    </Section>
  );
}
