interface StepProps {
  number: number;
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

function Step({ number, title, isActive, isCompleted }: StepProps) {
  const circleClasses = `flex h-8 w-8 items-center justify-center rounded-full ${
    isActive
      ? 'bg-primary-600 text-white'
      : isCompleted
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-neutral-100 text-neutral-500'
  }`;

  const textClasses = `ml-3 text-sm font-medium ${
    isActive ? 'text-primary-900' : isCompleted ? 'text-emerald-700' : 'text-neutral-500'
  }`;

  return (
    <div className="flex items-center">
      <div className={circleClasses}>
        {isCompleted ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-sm font-medium">{number}</span>
        )}
      </div>
      <span className={textClasses}>{title}</span>
    </div>
  );
}

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { title: 'Create Lot', description: 'Enter farm details' },
    { title: 'Add Events', description: 'Record timeline events by role' },
    { title: 'View Timeline', description: 'See public scan page' }
  ];

  return (
    <div className="py-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {steps.map((step, index) => (
          <Step
            key={index}
            number={index + 1}
            title={step.title}
            isActive={currentStep === index + 1}
            isCompleted={currentStep > index + 1}
          />
        ))}
      </div>
    </div>
  );
}