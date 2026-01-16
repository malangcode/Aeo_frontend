import { Profile } from "../../page";

export default function NoticeStep1() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Please Note !</h2>
      <div className="bg-green-50 border border-green-400 text-green-800 rounded-xl p-6 max-w-2xl mx-auto my-6 shadow-lg animate-fade-in">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 flex-shrink-0 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          <p className="text-lg sm:text-xl font-semibold leading-relaxed">
            You are just one click ahead setting up your{" "}
            <span className="font-bold">primary brand</span>. After this, we
            will redirect you to the{" "}
            <span className="font-bold">settings page</span> where you can add
            your competitors and other secondary brands.
          </p>
        </div>
      </div>
    </div>
  );
}
