"use client";

import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus, MessageSquare, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import BackButton from '@/components/BackButton';

interface BrandMetric {
  name: string;
  mentions: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

const AEOAnalyticsDashboard = () => {
  const [brandMetrics] = useState<BrandMetric[]>([
    { name: "YourBrand", mentions: 245, percentage: 35, trend: "up" },
    { name: "Competitor A", mentions: 189, percentage: 27, trend: "down" },
    { name: "Competitor B", mentions: 156, percentage: 22, trend: "stable" },
    { name: "Competitor C", mentions: 112, percentage: 16, trend: "up" },
  ]);

  const [showAiFeedback, setShowAiFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  // Performance over time data
  const performanceData = [
    { month: 'Jan', yourBrand: 180, competitorA: 200, competitorB: 140, competitorC: 90 },
    { month: 'Feb', yourBrand: 195, competitorA: 195, competitorB: 145, competitorC: 95 },
    { month: 'Mar', yourBrand: 210, competitorA: 190, competitorB: 150, competitorC: 100 },
    { month: 'Apr', yourBrand: 225, competitorA: 185, competitorB: 152, competitorC: 105 },
    { month: 'May', yourBrand: 245, competitorA: 189, competitorB: 156, competitorC: 112 },
  ];

  // Engagement metrics
  const engagementData = [
    { metric: 'Visibility', value: 85 },
    { metric: 'Authority', value: 72 },
    { metric: 'Trust', value: 68 },
    { metric: 'Relevance', value: 91 },
  ];

  // Answer Engine Distribution
  const answerEngineData = [
    { name: 'ChatGPT', value: 340, color: '#6366f1' },
    { name: 'Perplexity', value: 280, color: '#8b5cf6' },
    { name: 'Claude', value: 220, color: '#0ea5e9' },
    { name: 'Gemini', value: 160, color: '#a855f7' },
  ];

  // Content Performance
  const contentPerformance = [
    { category: 'Blog Posts', mentions: 420, engagement: 78 },
    { category: 'Product Pages', mentions: 380, engagement: 85 },
    { category: 'Case Studies', mentions: 290, engagement: 72 },
    { category: 'FAQs', mentions: 350, engagement: 81 },
    { category: 'Guides', mentions: 310, engagement: 76 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#0ea5e9', '#a855f7'];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-zinc-400" />;
  };

  const handleAiFeedback = () => {
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setShowAiFeedback(false);
      setFeedbackSubmitted(false);
      setFeedbackText('');
    }, 2000);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <BackButton />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className=" text-5xl sm:text-6xl font-black bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent mb-2">
              AEO Analytics Dashboard
            </h1>
            <p className="text-xl text-zinc-600">Comprehensive Answer Engine Optimization metrics and insights</p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <div className="text-zinc-600 text-sm mb-1">Total Mentions</div>
              <div className="text-3xl font-bold text-zinc-900">{brandMetrics.reduce((sum, b) => sum + b.mentions, 0)}</div>
              <div className="text-green-500 text-sm mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" /> +12.5%
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <div className="text-zinc-600 text-sm mb-1">Market Share</div>
              <div className="text-3xl font-bold text-zinc-900">35%</div>
              <div className="text-green-500 text-sm mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" /> +3.2%
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <div className="text-zinc-600 text-sm mb-1">Avg. Position</div>
              <div className="text-3xl font-bold text-zinc-900">1.8</div>
              <div className="text-green-500 text-sm mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" /> Improved
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <div className="text-zinc-600 text-sm mb-1">Visibility Score</div>
              <div className="text-3xl font-bold text-zinc-900">85/100</div>
              <div className="text-green-500 text-sm mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" /> +5pts
              </div>
            </div>
          </div>

          {/* Brand Metrics Table */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/30 shadow-lg">
            <h2 className="text-2xl font-bold text-zinc-800 mb-4">Brand Mention Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-300">
                    <th className="text-left text-zinc-600 pb-3 pr-4 font-semibold">Brand</th>
                    <th className="text-right text-zinc-600 pb-3 pr-4 font-semibold">Mentions</th>
                    <th className="text-right text-zinc-600 pb-3 pr-4 font-semibold">Market Share</th>
                    <th className="text-right text-zinc-600 pb-3 font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {brandMetrics.map((brand, idx) => (
                    <tr key={idx} className="border-b border-zinc-200">
                      <td className="py-4 pr-4 text-zinc-900 font-medium">{brand.name}</td>
                      <td className="py-4 pr-4 text-right text-zinc-700">{brand.mentions}</td>
                      <td className="py-4 pr-4 text-right text-zinc-700">{brand.percentage}%</td>
                      <td className="py-4 text-right flex justify-end">{getTrendIcon(brand.trend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bar Chart - Brand Mentions */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Brand Mentions Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={brandMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
                  <XAxis dataKey="name" stroke="#71717a" />
                  <YAxis stroke="#71717a" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '12px' }}
                    labelStyle={{ color: '#18181b', fontWeight: 600 }}
                  />
                  <Bar dataKey="mentions" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart - Market Share */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Market Share Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={brandMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {brandMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart - Performance Over Time */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Performance Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
                  <XAxis dataKey="month" stroke="#71717a" />
                  <YAxis stroke="#71717a" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '12px' }}
                    labelStyle={{ color: '#18181b', fontWeight: 600 }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="yourBrand" stroke="#6366f1" strokeWidth={2} name="Your Brand" />
                  <Line type="monotone" dataKey="competitorA" stroke="#8b5cf6" strokeWidth={2} name="Competitor A" />
                  <Line type="monotone" dataKey="competitorB" stroke="#0ea5e9" strokeWidth={2} name="Competitor B" />
                  <Line type="monotone" dataKey="competitorC" stroke="#a855f7" strokeWidth={2} name="Competitor C" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Area Chart - Answer Engine Distribution */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Answer Engine Coverage</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={answerEngineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
                  <XAxis dataKey="name" stroke="#71717a" />
                  <YAxis stroke="#71717a" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '12px' }}
                    labelStyle={{ color: '#18181b', fontWeight: 600 }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {answerEngineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Metrics & Content Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Engagement Score Bars */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Engagement Metrics</h2>
              <div className="space-y-4">
                {engagementData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-700 font-medium">{item.metric}</span>
                      <span className="text-zinc-900 font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Performance */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Content Performance</h2>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={contentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
                  <XAxis dataKey="category" stroke="#71717a" angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#71717a" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '12px' }}
                    labelStyle={{ color: '#18181b', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="mentions" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Feedback Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Sparkles className="w-6 h-6 text-indigo-500 mr-3" />
                <h2 className="text-2xl font-bold text-zinc-800">AI-Powered Insights</h2>
              </div>
              <button
                onClick={() => setShowAiFeedback(!showAiFeedback)}
                className="px-6 py-3 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Get AI Feedback
              </button>
            </div>

            {showAiFeedback && !feedbackSubmitted && (
              <div className="mt-4 bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/40">
                <p className="text-zinc-700 mb-4 font-medium">
                  Based on your current analytics, here are AI-generated insights:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-lg">✓</span>
                    <span className="text-zinc-700">Your brand shows strong upward momentum with 35% market share, leading all competitors.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2 text-lg">⚠</span>
                    <span className="text-zinc-700">Authority score (72%) has room for improvement. Consider building more high-quality backlinks.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 text-lg">ℹ</span>
                    <span className="text-zinc-700">Product pages show highest engagement (85%). Replicate this strategy across other content types.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-500 mr-2 text-lg">★</span>
                    <span className="text-zinc-700">ChatGPT shows highest answer engine coverage. Optimize specifically for Claude and Gemini to expand reach.</span>
                  </li>
                </ul>
                
                <div className="border-t border-zinc-300 pt-4">
                  <label className="text-zinc-700 font-medium block mb-2">Was this feedback helpful?</label>
                  <div className="flex items-center space-x-4 mb-4">
                    <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-medium transition">
                      <ThumbsUp className="w-4 h-4 mr-2" /> Yes
                    </button>
                    <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition">
                      <ThumbsDown className="w-4 h-4 mr-2" /> No
                    </button>
                  </div>
                  
                  <textarea
                    className="w-full bg-white/50 text-zinc-900 rounded-xl p-4 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    rows={3}
                    placeholder="Share your thoughts on these insights..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                  />
                  <button
                    onClick={handleAiFeedback}
                    className="mt-3 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 hover:scale-105 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            )}

            {feedbackSubmitted && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-700 flex items-center font-medium">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Thank you! Your feedback helps improve our AI insights.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AEOAnalyticsDashboard;