import { ArrowRight, Check } from "lucide-react";

interface Props {
  step: number;
  totalSteps: number;
  isStepValid: boolean;
  loading: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export default function StepNavigation({
  step,
  totalSteps,
  isStepValid,
  loading,
  onNext,
  onPrev,
  onSubmit,
}: Props) {
  return (
    <div className="flex justify-between mt-10">
      <button
        disabled={step === 1}
        onClick={onPrev}
        className="px-6 py-3 bg-gray-100 rounded-xl"
      >
        Previous
      </button>

      {step < totalSteps ? (
        <button
          disabled={!isStepValid}
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
        >
          Next <ArrowRight size={16} />
        </button>
      ) : (
        <button
          disabled={loading}
          onClick={onSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-xl flex items-center gap-2"
        >
          {loading ? "Saving..." : "Complete"}
          <Check size={16} />
        </button>
      )}
    </div>
  );
}
