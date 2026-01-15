"use client";
import React, { useState, useEffect } from "react";
import {
  Lightbulb,
  Rocket,
  Stars,
  CloudLightning,
  Target,
  Bot,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Animated Background */}

      <div className="min-h-screen text-zinc-900 relative z-10">

        {/* HERO */}
        <section className="pt-32 pb-20 max-w-7xl mx-auto px-6 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl">
              <h1 className="text-6xl sm:text-8xl font-black bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent mb-6">
                AEO Workspace
              </h1>

              <h2 className="text-2xl sm:text-4xl font-bold text-zinc-800 mb-6">
                Control How AI Answers Questions About Your Brand
              </h2>

              <p className="text-xl text-zinc-600 max-w-3xl mx-auto mb-10">
                A centralized workspace to optimize, monitor, and dominate
                AI-driven search results across ChatGPT, Google SGE, Perplexity,
                and other answer engines.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => router.push("/ai-page")}
                  className="px-10 py-5 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-2xl text-white font-semibold text-lg shadow-xl hover:scale-105 transition"
                >
                  Enter Workspace <Rocket className="inline ml-2" />
                </button>

                <button
                  onClick={() => router.push("/how-it-works")}
                  className="px-10 py-5 bg-white/50 rounded-2xl border border-white/30 text-zinc-700 font-semibold hover:bg-white/70 transition"
                >
                  How AEO Works <Lightbulb className="inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-tr from-indigo-600 via-violet-600 to-sky-600 bg-clip-text text-transparent mb-4">
              Everything You Need for AEO
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Built specifically for the era of AI answers—not blue links.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Brand Entity Control",
                desc: "Define your brand, products, services, and authority so AI models understand and trust you.",
                icon: <Target />,
              },
              {
                title: "Competitor Answer Tracking",
                desc: "See how competitors appear in AI answers and identify gaps you can capture.",
                icon: <Stars />,
              },
              {
                title: "AI Visibility Monitoring",
                desc: "Track how often and where your brand is mentioned across major AI platforms.",
                icon: <CloudLightning />,
              },
              {
                title: "Answer Optimization",
                desc: "Optimize structured content that answer engines actually consume.",
                icon: <Lightbulb />,
              },
              {
                title: "LLM Signals Dashboard",
                desc: "Understand trust, consistency, and entity signals used by large language models.",
                icon: <Bot />,
              },
              {
                title: "Workspace Collaboration",
                desc: "SEO teams, founders, and marketers collaborate in one shared AEO workspace.",
                icon: <Rocket />,
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transition hover:-translate-y-2"
              >
                <div className="text-indigo-500 mb-4">{f.icon}</div>
                <h3 className="text-2xl font-bold text-zinc-800 mb-3">
                  {f.title}
                </h3>
                <p className="text-zinc-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl">
            <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-tr from-indigo-600 via-violet-600 to-sky-600 bg-clip-text text-transparent mb-6">
              Be the Answer, Not the Result
            </h2>

            <p className="text-xl text-zinc-600 mb-10">
              Search is changing. Brands that adapt to AEO will win visibility,
              trust, and demand in the AI era.
            </p>

            <button
              onClick={() => router.push("/complete-personal-info")}
              className="px-14 py-6 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-2xl text-white font-bold text-xl shadow-xl hover:scale-105 transition"
            >
              Create Your AEO Workspace →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
