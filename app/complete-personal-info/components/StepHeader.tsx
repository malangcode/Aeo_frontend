interface StepHeaderProps {
  step: number;
  totalSteps: number;
}

export default function StepHeader({ step, totalSteps }: StepHeaderProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
      <h1 className="text-2xl font-bold">Complete Brand Information</h1>
      <p className="opacity-95 mt-1 text-sm"><strong>Note: </strong>These information are very important to monitor your brand.</p>
      <p className="opacity-90 mt-1">
        Step {step} of {totalSteps}
      </p>

      <div className="w-full bg-indigo-300 rounded-full h-2 mt-4">
        <div
          className="bg-white h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
