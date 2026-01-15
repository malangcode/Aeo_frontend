"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Share,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  RotateCcw,
  LogOut,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Bell,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {useRouter} from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Types
interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface PromptHistory {
  id: number;
  prompt: string;
  date: string;
  brandMentioned: boolean;
  brands: string[];
  timestamp: string;
}

interface BrandMetric {
  name: string;
  mentions: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

const DAILY_CHECKS = 500;

const AEOWorkspace: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Welcome to AEO Workspace! Monitor your brand mentions across AI responses. Enter your brand and competitors to start tracking.",
      timestamp: new Date(),
    },
  ]);

  // Prompt history with brand mentions
  const [promptHistory] = useState<PromptHistory[]>([
    {
      id: 1,
      prompt: "Best project management tools for startups",
      date: "2 hours ago",
      brandMentioned: true,
      brands: ["YourBrand", "Asana"],
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      prompt: "Top CRM solutions for small business",
      date: "5 hours ago",
      brandMentioned: false,
      brands: ["Salesforce", "HubSpot"],
      timestamp: "11:15 AM",
    },
    {
      id: 3,
      prompt: "Marketing automation platforms comparison",
      date: "1 day ago",
      brandMentioned: true,
      brands: ["YourBrand", "Mailchimp"],
      timestamp: "Yesterday 3:45 PM",
    },
    {
      id: 4,
      prompt: "Enterprise software recommendations",
      date: "2 days ago",
      brandMentioned: false,
      brands: ["Microsoft", "Oracle"],
      timestamp: "Jan 11, 4:20 PM",
    },
  ]);

  // Brand metrics data
  const [brandMetrics] = useState<BrandMetric[]>([
    { name: "YourBrand", mentions: 245, percentage: 35, trend: "up" },
    { name: "Competitor A", mentions: 189, percentage: 27, trend: "down" },
    { name: "Competitor B", mentions: 156, percentage: 22, trend: "stable" },
    { name: "Competitor C", mentions: 112, percentage: 16, trend: "up" },
  ]);

  // Time series data for line chart
  const [timeSeriesData] = useState([
    { date: "Jan 7", yourBrand: 42, competitorA: 38, competitorB: 35 },
    { date: "Jan 8", yourBrand: 45, competitorA: 40, competitorB: 33 },
    { date: "Jan 9", yourBrand: 48, competitorA: 37, competitorB: 36 },
    { date: "Jan 10", yourBrand: 51, competitorA: 39, competitorB: 34 },
    { date: "Jan 11", yourBrand: 54, competitorA: 41, competitorB: 37 },
    { date: "Jan 12", yourBrand: 59, competitorA: 43, competitorB: 38 },
    { date: "Jan 13", yourBrand: 62, competitorA: 45, competitorB: 40 },
  ]);

  // Left sidebar tabs
  const [leftTab, setLeftTab] = useState<"brands" | "history">("brands");
  const [isThinking, setIsThinking] = useState(false);

  // Checks (demo metrics)
  const [checksUsed, setChecksUsed] = useState(247);
  const [alertsActive, setAlertsActive] = useState(12);
  const checksRemaining = DAILY_CHECKS - checksUsed;
  const checksPct = Math.min(100, Math.round((checksUsed / DAILY_CHECKS) * 100));

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Layout toggles
  const defaultLayout = {
    showLeft: true,
    showCanvas: true,
    showRight: true,
  };
  const [layout, setLayout] = useState(defaultLayout);

  // Widths (percent)
  const [leftW, setLeftW] = useState(22);
  const [rightW, setRightW] = useState(28);

  // Chart selection
  const [activeChart, setActiveChart] = useState<"pie" | "bar" | "line">("pie");

  // Drag handlers
  const onDragLeft = (_: any, info: { delta: { x: number } }) => {
    const parent = document.getElementById("layout-root");
    if (!parent) return;
    const totalPx = parent.getBoundingClientRect().width;
    const deltaPct = (info.delta.x / totalPx) * 100;
    setLeftW((prev) => Math.max(16, Math.min(40, prev + deltaPct)));
  };

  const onDragRight = (_: any, info: { delta: { x: number } }) => {
    const parent = document.getElementById("layout-root");
    if (!parent) return;
    const totalPx = parent.getBoundingClientRect().width;
    const deltaPct = (info.delta.x / totalPx) * 100;
    setRightW((prev) => Math.max(16, Math.min(40, prev - deltaPct)));
  };

  const ThinkingDots: React.FC = () => {
    const [i, setI] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setI((v) => (v + 1) % 4), 400);
      return () => clearInterval(t);
    }, []);
    const dots = ".".repeat(i);
    return (
      <span className="inline-flex items-center gap-2">
        <span className="relative inline-block h-2 w-2 rounded-full bg-slate-500/70 animate-pulse" />
        <span className="opacity-70">analyzing{dots}</span>
      </span>
    );
  };

  // Autoscroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    const typingId = Date.now() + 1;
    const typingMessage: Message = {
      id: typingId,
      type: "ai",
      content: "__thinking__",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, typingMessage]);
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Your brand was mentioned in 8 out of 10 recent AI responses for this query type. Competitors A and B also appeared frequently.",
        "Analysis complete: Your brand has 35% share of voice in this category. Trending upward compared to last week.",
        "Found 12 new mentions of your brand in AI responses today. Your positioning is strongest in product comparison queries.",
        "Brand visibility check: You're currently ranking in top 3 for 78% of relevant prompts. Competitor C is gaining ground.",
      ];
      const aiText = responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) =>
        prev.map((m) => (m.id === typingId ? { ...m, content: aiText } : m))
      );
      setIsThinking(false);
      setChecksUsed((v) => Math.min(DAILY_CHECKS, v + 1));
    }, 2000);
  };

  // Pie Chart Component
  const PieChart2: React.FC = () => {
    const total = brandMetrics.reduce((sum, b) => sum + b.mentions, 0);
    let currentAngle = 0;

    const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#a855f7"];

    return (
      <div className="flex items-center shadow w-full p-10 rounded-2xl justify-center gap-8">
        <svg width="280" height="280" viewBox="0 0 280 280">
          {brandMetrics.map((brand, idx) => {
            const percentage = (brand.mentions / total) * 100;
            const angle = (percentage / 100) * 360;
            const x1 = 140 + 100 * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 140 + 100 * Math.sin((currentAngle * Math.PI) / 180);
            const x2 = 140 + 100 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
            const y2 = 140 + 100 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
            const largeArc = angle > 180 ? 1 : 0;

            const path = `M 140 140 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`;
            currentAngle += angle;

            return (
              <path
                key={idx}
                d={path}
                fill={colors[idx % colors.length]}
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
          <circle cx="140" cy="140" r="60" fill="white" />
          <text x="140" y="135" textAnchor="middle" className="text-2xl font-bold fill-slate-900">
            {total}
          </text>
          <text x="140" y="155" textAnchor="middle" className="text-xs fill-slate-600">
            Total Mentions
          </text>
        </svg>
        <div className="space-y-3">
          {brandMetrics.map((brand, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: colors[idx % colors.length] }}
              />
              <div>
                <div className="font-medium text-sm">{brand.name}</div>
                <div className="text-xs text-slate-600">
                  {brand.mentions} mentions ({brand.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Bar Chart Component
  const BarChart: React.FC = () => {
    const maxMentions = Math.max(...brandMetrics.map((b) => b.mentions));

    return (
      <div className="space-y-6 shadow w-full p-10 px-4">
        {brandMetrics.map((brand, idx) => {
          const width = (brand.mentions / maxMentions) * 100;
          const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#a855f7"];

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{brand.name}</span>
                <span className="text-slate-600">{brand.mentions} mentions</span>
              </div>
              <div className="h-8 bg-white/70 rounded-lg overflow-hidden ring-1 ring-white/60">
                <div
                  className="h-full transition-all duration-500 flex items-center justify-end px-3 text-white text-xs font-semibold"
                  style={{
                    width: `${width}%`,
                    backgroundColor: colors[idx % colors.length],
                  }}
                >
                  {brand.percentage}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Line Chart Component
  const LineChartComponent: React.FC = () => {
    const maxValue = Math.max(
      ...timeSeriesData.flatMap((d) => [d.yourBrand, d.competitorA, d.competitorB])
    );
    const padding = 40;
    const width = 500;
    const height = 300;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const getX = (index: number) => padding + (index / (timeSeriesData.length - 1)) * chartWidth;
    const getY = (value: number) => height - padding - (value / maxValue) * chartHeight;

    const createPath = (dataKey: "yourBrand" | "competitorA" | "competitorB") => {
      return timeSeriesData
        .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d[dataKey])}`)
        .join(" ");
    };

    return (
      <div className="flex flex-col p-10 w-full shadow items-center gap-4">
        <svg width={width} height={height} className="overflow-visible">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding + (i / 4) * chartHeight;
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          {/* Lines */}
          <path
            d={createPath("yourBrand")}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            className="transition-all duration-300"
          />
          <path
            d={createPath("competitorA")}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            className="transition-all duration-300"
          />
          <path
            d={createPath("competitorB")}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            className="transition-all duration-300"
          />

          {/* Data points */}
          {timeSeriesData.map((d, i) => (
            <g key={i}>
              <circle cx={getX(i)} cy={getY(d.yourBrand)} r="4" fill="#6366f1" />
              <circle cx={getX(i)} cy={getY(d.competitorA)} r="4" fill="#8b5cf6" />
              <circle cx={getX(i)} cy={getY(d.competitorB)} r="4" fill="#06b6d4" />
            </g>
          ))}

          {/* X-axis labels */}
          {timeSeriesData.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-slate-600"
            >
              {d.date}
            </text>
          ))}
        </svg>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-sm">YourBrand</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-sm">Competitor A</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-500" />
            <span className="text-sm">Competitor B</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen overflow-x-hidden bg-gradient-to-br from-indigo-50 via-violet-50 to-sky-50 text-slate-900 flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 border-b border-white/50 bg-white/40 backdrop-blur-2xl shadow-[0_12px_60px_rgba(99,102,241,0.18)]">
        <div className="px-4 py-1 flex items-center justify-between w-full">
          <div className="flex items-center py-2 gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500/40 via-violet-500/30 to-sky-500/40 ring-1 ring-white/60 shadow-[0_8px_30px_rgba(99,102,241,0.35)]" />
            <span className="font-semibold tracking-tight mr-4">AEO Workspace</span>

            {/* View toggles */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLayout((s) => ({ ...s, showLeft: !s.showLeft }))}
                className="rounded-xl px-3 py-1.5 bg-white/50 ring-1 ring-white/60 hover:bg-white/70 transition inline-flex items-center gap-2"
              >
                {layout.showLeft ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                Sidebar
              </button>
              <button
                onClick={() => setLayout((s) => ({ ...s, showCanvas: !s.showCanvas }))}
                className="rounded-xl px-3 py-1.5 bg-white/50 ring-1 ring-white/60 hover:bg-white/70 transition inline-flex items-center gap-2"
              >
                {layout.showCanvas ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                Analytics
              </button>
              <button
                onClick={() => setLayout((s) => ({ ...s, showRight: !s.showRight }))}
                className="rounded-xl px-3 py-1.5 bg-white/50 ring-1 ring-white/60 hover:bg-white/70 transition inline-flex items-center gap-2"
              >
                {layout.showRight ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                Monitor
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setLayout(defaultLayout)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-rose-600 bg-white/60 ring-1 ring-white/60 hover:bg-white/80 transition"
              title="Reset Layout"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            
            <button
            onClick={()=> router.push("/")}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-700 bg-white/60 ring-1 ring-white/60 hover:bg-white/80 transition"
              title="back"
            >
             Back <ArrowRight className="h-5 w-5"/>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div id="layout-root" className="flex flex-1 overflow-hidden w-full px-3 py-3 gap-3">
        {/* Left Sidebar */}
        {layout.showLeft && (
          <div
            className="bg-white/50 backdrop-blur-2xl min-w-[20%] ring-1 ring-white/60 rounded-2xl shadow-[0_20px_80px_rgba(99,102,241,0.18)] flex flex-col"
            style={{ width: `${leftW}%` }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/60">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Monitoring</h2>
                <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 shadow-[0_10px_36px_rgba(99,102,241,0.45)]">
                  <Bell className="h-4 w-4 inline mr-1" />
                  Alerts
                </button>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Daily Checks</span>
                    <span className="text-slate-600">
                      {checksUsed} / {DAILY_CHECKS}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/70 ring-1 ring-white/60 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500"
                      style={{ width: `${checksPct}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="p-2 rounded-lg bg-white/70 ring-1 ring-white/60">
                    <div className="text-2xl font-bold text-indigo-600">{checksRemaining}</div>
                    <div className="text-xs text-slate-600">Remaining</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/70 ring-1 ring-white/60">
                    <div className="text-2xl font-bold text-violet-600">{alertsActive}</div>
                    <div className="text-xs text-slate-600">Active Alerts</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLeftTab("brands")}
                  className={`rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-white/60 ${
                    leftTab === "brands"
                      ? "text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 shadow-[0_10px_36px_rgba(99,102,241,0.45)]"
                      : "bg-white/70 text-slate-800 hover:bg-white"
                  }`}
                >
                  Brands
                </button>
                <button
                  onClick={() => setLeftTab("history")}
                  className={`rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-white/60 ${
                    leftTab === "history"
                      ? "text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 shadow-[0_10px_36px_rgba(99,102,241,0.45)]"
                      : "bg-white/70 text-slate-800 hover:bg-white"
                  }`}
                >
                  History
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-3">
              {leftTab === "brands" ? (
                <div className="space-y-2">
                  {brandMetrics.map((brand, idx) => (
                    <div
                      key={idx}
                      className="w-full text-left p-3 rounded-xl transition cursor-pointer ring-1 bg-white/60 ring-white/60 hover:bg-white/80"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{brand.name}</div>
                        <TrendingUp
                          className={`h-4 w-4 ${
                            brand.trend === "up"
                              ? "text-green-600"
                              : brand.trend === "down"
                              ? "text-rose-600"
                              : "text-slate-600"
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-slate-600">{brand.mentions} mentions</p>
                        <span className="text-xs font-semibold text-indigo-600">
                          {brand.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {promptHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl transition cursor-pointer bg-white/60 ring-1 ring-white/60 hover:bg-white/80"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm line-clamp-2">{item.prompt}</h3>
                        {item.brandMentioned ? (
                          <CheckCircle className="h-4 w-4 text-green-600 shrink-0 ml-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose-500 shrink-0 ml-2" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.brands.map((brand, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-0.5 rounded ${
                              brand === "YourBrand"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-600">{item.timestamp}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer icons */}
            {/* <div className="p-4 border-t border-white/60">
              <div className="flex justify-between text-slate-700">
                
              </div>
            </div> */}
          </div>
        )}

        {/* Left drag handle */}
        {layout.showLeft && layout.showCanvas && (
          <motion.div
            className="relative select-none cursor-col-resize"
            style={{ width: 12 }}
            drag="x"
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={onDragLeft}
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full bg-white/60 hover:bg-white transition" />
          </motion.div>
        )}

        {/* Analytics Canvas */}
        {layout.showCanvas && (
          <div className="flex-1 min-w-[30%] flex flex-col bg-white/50 backdrop-blur-2xl ring-1 ring-white/60 rounded-2xl shadow-[0_20px_120px_rgba(99,102,241,0.18)] overflow-hidden min-h-0">
            {/* Canvas controls */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/60">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-indigo-500/40 via-violet-500/30 to-sky-500/40 ring-1 ring-white/60" />
                <span className="font-semibold">Brand Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveChart("pie")}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold inline-flex items-center gap-2 ${
                    activeChart === "pie"
                      ? "text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 shadow-[0_10px_36px_rgba(99,102,241,0.45)]"
                      : "text-indigo-700 bg-white/70 ring-1 ring-white/60 hover:bg-white"
                  }`}
                >
                  <PieChart className="h-4 w-4" />
                  Pie
                </button>
                <button
                  onClick={() => setActiveChart("bar")}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold inline-flex items-center gap-2 ${
                    activeChart === "bar"
                      ? "text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 shadow-[0_10px_36px_rgba(99,102,241,0.45)]"
                      : "text-indigo-700 bg-white/70 ring-1 ring-white/60 hover:bg-white"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Bar
                </button>
                <button
                  onClick={() => setActiveChart("line")}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold inline-flex items-center gap-2 ${
                    activeChart === "line"
                      ? "text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 shadow-[0_10px_36px_rgba(99,102,241,0.45)]"
                      : "text-indigo-700 bg-white/70 ring-1 ring-white/60 hover:bg-white"
                  }`}
                >
                  <LineChart className="h-4 w-4" />
                  Trend
                </button>
                <button
                  onClick={() => {
                    setChecksUsed(247);
                    setAlertsActive(12);
                  }}
                  className="rounded-lg px-3 py-1.5 text-sm font-semibold text-rose-700 bg-white/70 ring-1 ring-white/60 hover:bg-white inline-flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Chart Display */}
            <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
              {activeChart === "pie" && <PieChart2 />}
              {activeChart === "bar" && <BarChart />}
              {activeChart === "line" && <LineChartComponent />}
            </div>

            {/* Insights Panel */}
            <div className="border-t border-white/60 p-4 bg-white/60">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-indigo-600" />
                Key Insights
              </h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="p-2 rounded-lg bg-white/70 ring-1 ring-white/60">
                  <div className="text-xs text-slate-600">Share of Voice</div>
                  <div className="text-lg font-bold text-indigo-600">35%</div>
                </div>
                <div className="p-2 rounded-lg bg-white/70 ring-1 ring-white/60">
                  <div className="text-xs text-slate-600">Weekly Growth</div>
                  <div className="text-lg font-bold text-green-600">+12%</div>
                </div>
                <div className="p-2 rounded-lg bg-white/70 ring-1 ring-white/60">
                  <div className="text-xs text-slate-600">Rank Position</div>
                  <div className="text-lg font-bold text-violet-600">#1</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right drag handle */}
        {layout.showCanvas && layout.showRight && (
          <motion.div
            className="relative select-none cursor-col-resize"
            style={{ width: 12 }}
            drag="x"
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={onDragRight}
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full bg-white/60 hover:bg-white transition" />
          </motion.div>
        )}

        {/* Right Monitor Panel */}
        {layout.showRight && (
          <div
            className={`bg-white/50 min-w-[30%] backdrop-blur-2xl ring-1 ring-white/60 rounded-2xl shadow-[0_20px_80px_rgba(99,102,241,0.18)] flex ${
              layout.showCanvas ? "" : "flex-1"
            } flex-col`}
            style={{ width: `${rightW}%` }}
          >
            <div className="p-4 border-b border-white/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-indigo-600" />
                <h2 className="font-semibold">Brand Monitor</h2>
              </div>
              <div className="flex gap-2">
                <Share className="h-5 w-5 text-slate-700 hover:text-slate-900 cursor-pointer" />
                <Download className="h-5 w-5 text-slate-700 hover:text-slate-900 cursor-pointer" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 ${msg.type === "user" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block max-w-full p-3 rounded-xl ring-1 ${
                      msg.type === "user"
                        ? "text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 ring-white/40 shadow-[0_12px_48px_rgba(99,102,241,0.45)]"
                        : "bg-white/70 ring-white/60 text-slate-900"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.type === "ai" && (
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500/40 via-violet-500/30 to-sky-500/40 ring-1 ring-white/60 flex items-center justify-center shrink-0">
                          <Search className="h-4 w-4 text-indigo-600" />
                        </div>
                      )}
                      <div className="overflow-auto max-w-full">
                        {msg.content === "__thinking__" ? (
                          <ThinkingDots />
                        ) : (
                          <>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            <p className="text-xs opacity-60 mt-1">
                              {msg.timestamp.toLocaleTimeString()}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Monitor Input */}
            <div className="p-3 border-t border-white/60">
              <div className="flex flex-col gap-2 bg-white/60 backdrop-blur-2xl rounded-2xl ring-1 ring-white/60 px-4 py-3 shadow-[0_14px_60px_rgba(99,102,241,0.18)]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-600" />
                  <span className="text-xs text-slate-600">
                    Last check: {new Date().toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex items-end gap-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Enter search query to check brand mentions..."
                    rows={1}
                    className="flex-1 placeholder:text-sm resize-none bg-transparent text-slate-900 placeholder-slate-500 outline-none text-base leading-relaxed min-h-[44px] max-h-[132px] overflow-y-auto"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isThinking}
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 shadow-[0_12px_48px_rgba(99,102,241,0.45)] hover:shadow-[0_14px_56px_rgba(99,102,241,0.6)] transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    Check Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile responsiveness */}
      <style>{`
        @media (max-width: 1024px) {
          #layout-root { flex-direction: column; }
          #layout-root > div[style*="width"] { width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default AEOWorkspace;