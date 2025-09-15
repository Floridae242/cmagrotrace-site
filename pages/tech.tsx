import Section from '../components/Section';

export default function Tech(){
  return (
    <>
      <Section title="Logistics & Tech" subtitle="Built for performance, privacy, and scale">
        <div className="prose max-w-none">
          <h3>Architecture</h3>
          <ul className="list-disc pl-6">
            <li>Frontend: Next.js + Tailwind</li>
            <li>Backend: Node.js + Express + Prisma</li>
            <li>Database: PostgreSQL</li>
            <li>Security: HTTPS, JWT; least‑privilege DB roles</li>
          </ul>
          <h3>Cold Chain & Tracking (Roadmap)</h3>
          <ul className="list-disc pl-6">
            <li>AI cold chain targets and compliance logs</li>
            <li>IoT tracking and alerting</li>
            <li>AI route optimization</li>
          </ul>
          <h3>Performance & Privacy</h3>
          <ul className="list-disc pl-6">
            <li>Mobile scanning priority</li>
            <li>Optimized images, minimal PII</li>
            <li>Consent‑based sharing</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
