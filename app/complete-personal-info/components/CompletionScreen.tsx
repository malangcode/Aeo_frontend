import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CompletionScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Brand Info Completed</h2>
        <button
          onClick={() => router.push("/ai-page")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
