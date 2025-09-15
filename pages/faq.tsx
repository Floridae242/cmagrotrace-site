import Section from '../components/Section';
import FAQAccordion from '../components/FAQAccordion';

export default function FAQ(){
  const items = [
    { q:"Do I need new hardware?", a:"No. It is software‑only. Use QR and a browser." },
    { q:"Is the scan page public?", a:"Yes. It opens fast on mobile. No login is needed." },
    { q:"Can buyers verify test results?", a:"Yes. Upload or link lab certificates." },
    { q:"Will it work for other fruits?", a:"Yes. It can expand beyond longan." },
    { q:"Can I export data?", a:"Yes. CSV export and token‑based API in future." },
    { q:"How is data protected?", a:"We use HTTPS and access controls. We share data by consent." },
    { q:"What does the pilot include?", a:"Setup, training, and a feedback loop for 4–6 weeks." },
  ];
  return (
    <Section title="FAQ" subtitle="Answers to common questions">
      <FAQAccordion items={items} />
    </Section>
  );
}
