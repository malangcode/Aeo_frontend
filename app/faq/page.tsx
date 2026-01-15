"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Lightbulb, Zap, Shield, Target, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const AEOFAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { name: 'All', icon: <HelpCircle className="w-5 h-5" /> },
    { name: 'Getting Started', icon: <Lightbulb className="w-5 h-5" /> },
    { name: 'Features', icon: <Zap className="w-5 h-5" /> },
    { name: 'Optimization', icon: <Target className="w-5 h-5" /> },
    { name: 'Security', icon: <Shield className="w-5 h-5" /> },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'What is AEO (Answer Engine Optimization)?',
      answer: 'AEO is the practice of optimizing your content to appear in AI-generated responses from platforms like ChatGPT, Google SGE, Perplexity, and Claude. Unlike traditional SEO that focuses on ranking in search results, AEO ensures your brand is mentioned and referenced when AI engines answer questions about your industry, products, or services.',
      category: 'Getting Started'
    },
    {
      id: '2',
      question: 'How does the AEO Workspace help my business?',
      answer: 'The AEO Workspace provides a centralized platform to monitor, optimize, and control how AI engines present your brand. You can track brand mentions, analyze competitor presence, optimize content for AI consumption, schedule automated checks, and gain insights into your visibility across multiple AI platforms—all from one dashboard.',
      category: 'Getting Started'
    },
    {
      id: '3',
      question: 'What AI platforms does the workspace monitor?',
      answer: 'Our platform monitors major answer engines including ChatGPT (OpenAI), Google SGE (Search Generative Experience), Perplexity AI, Claude (Anthropic), and Gemini (Google). We continuously update our monitoring capabilities as new AI platforms emerge.',
      category: 'Features'
    },
    {
      id: '4',
      question: 'How often are brand mentions updated?',
      answer: 'Brand mention data is updated based on your scheduled tasks. You can set up hourly, daily, weekly, or monthly checks depending on your needs. Real-time monitoring is available for enterprise plans. The dashboard shows the last update timestamp and next scheduled run for all monitoring tasks.',
      category: 'Features'
    },
    {
      id: '5',
      question: 'Can I track my competitors in AI answers?',
      answer: 'Yes! The Competitor Tracking feature allows you to monitor how your competitors appear in AI-generated answers. You can see their mention frequency, market share, trending patterns, and identify gaps where your brand could gain visibility. This helps you understand the competitive landscape in the AI answer space.',
      category: 'Features'
    },
    {
      id: '6',
      question: 'How do I optimize my content for answer engines?',
      answer: 'Content optimization for AEO involves several strategies: creating clear, authoritative content that directly answers common questions, structuring data with schema markup, building entity relationships, maintaining content freshness, and ensuring your information is trustworthy and well-cited. Our platform provides specific recommendations based on AI feedback and current best practices.',
      category: 'Optimization'
    },
    {
      id: '7',
      question: 'What is the Brand Entity Control feature?',
      answer: 'Brand Entity Control helps you define and manage how AI models understand your brand. You can specify your products, services, key differentiators, and authority signals. This structured information helps answer engines accurately represent your brand when responding to relevant queries.',
      category: 'Optimization'
    },
    {
      id: '8',
      question: 'Can I schedule automated AEO checks?',
      answer: 'Absolutely! Our Task Scheduler allows you to create automated checks for brand monitoring, competitor analysis, visibility tracking, and more. You can set hourly, daily, weekly, or monthly schedules, choose specific times, and even select particular days of the week for recurring tasks.',
      category: 'Features'
    },
    {
      id: '9',
      question: 'Is my data secure in the AEO Workspace?',
      answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest using industry-standard encryption protocols. We follow SOC 2 compliance standards, conduct regular security audits, and implement strict access controls. Your competitive intelligence and brand data remain completely private and are never shared with third parties.',
      category: 'Security'
    },
    {
      id: '10',
      question: 'What metrics should I track for AEO success?',
      answer: 'Key AEO metrics include: brand mention frequency across AI platforms, market share compared to competitors, visibility score, answer engine coverage, entity recognition accuracy, content engagement rates, and position in AI-generated responses. Our analytics dashboard tracks all these metrics and provides AI-powered insights for improvement.',
      category: 'Optimization'
    },
    {
      id: '11',
      question: 'How is AEO different from traditional SEO?',
      answer: 'While SEO focuses on ranking in search engine results pages (SERPs), AEO focuses on being cited and mentioned within AI-generated answers. Traditional SEO aims for clicks and traffic, while AEO aims for authority, trust, and direct brand mentions in conversational AI responses. Both are important, but AEO addresses the shift toward answer-based search behavior.',
      category: 'Getting Started'
    },
    {
      id: '12',
      question: 'Can multiple team members use the workspace?',
      answer: 'Yes! The AEO Workspace supports team collaboration. You can invite SEO specialists, content creators, marketers, and executives to access the platform. Different permission levels ensure appropriate access control, and activity logs track all changes for accountability.',
      category: 'Features'
    },
    {
      id: '13',
      question: 'What happens if my brand isn\'t appearing in AI answers?',
      answer: 'If your brand has low or no visibility in AI answers, our platform provides actionable recommendations: create more authoritative content, improve entity signals, build quality backlinks, optimize for conversational queries, and enhance content structure. The AI-powered insights feature analyzes your current state and suggests specific improvements.',
      category: 'Optimization'
    },
    {
      id: '14',
      question: 'How long does it take to see AEO improvements?',
      answer: 'AEO results vary based on your current authority, content quality, and implementation speed. Some brands see improvements in brand mentions within 2-4 weeks of optimization, while building strong entity recognition can take 2-3 months. Consistent content creation and optimization lead to compounding benefits over time.',
      category: 'Optimization'
    },
    {
      id: '15',
      question: 'Do you offer support and training?',
      answer: 'Yes! We provide comprehensive documentation, video tutorials, and best practice guides. Email support is available for all users, with priority support for premium plans. We also offer onboarding sessions and quarterly strategy reviews for enterprise customers to ensure you\'re maximizing your AEO results.',
      category: 'Getting Started'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-indigo-50 to-fuchsia-50" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-violet-200/40 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Everything you need to know about AEO and our platform
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/30 shadow-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/50 text-zinc-900 rounded-xl pl-12 pr-4 py-4 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/30 shadow-lg">
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-5 py-3 rounded-xl font-medium transition flex items-center ${
                    activeCategory === category.name
                      ? 'bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 text-white shadow-lg'
                      : 'bg-white/50 text-zinc-700 border border-zinc-300 hover:border-indigo-400'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-8">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map(faq => (
                <div
                  key={faq.id}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/40 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 mt-2">{faq.question}</h3>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-6 h-6 text-indigo-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>
                  </button>
                  
                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-zinc-200">
                        <p className="text-zinc-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-12 border border-white/30 shadow-lg text-center">
                <HelpCircle className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-800 mb-2">No results found</h3>
                <p className="text-zinc-600">
                  Try adjusting your search or selecting a different category
                </p>
              </div>
            )}
          </div>

          {/* Still Have Questions Section */}
          <div className="bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-2xl p-8 shadow-xl text-center">
            <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">Still Have Questions?</h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Our support team is here to help you succeed with AEO. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
                Contact Support
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-white/40 hover:bg-white/30 transition">
                Schedule a Demo
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg text-center hover:shadow-xl transition">
              <Lightbulb className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-bold text-zinc-900 mb-2">Documentation</h3>
              <p className="text-zinc-600 text-sm mb-3">Detailed guides and tutorials</p>
              <button className="text-indigo-600 font-semibold text-sm hover:underline">
                View Docs →
              </button>
            </div>
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg text-center hover:shadow-xl transition">
              <Zap className="w-10 h-10 text-violet-500 mx-auto mb-3" />
              <h3 className="font-bold text-zinc-900 mb-2">Video Tutorials</h3>
              <p className="text-zinc-600 text-sm mb-3">Step-by-step video guides</p>
              <button className="text-violet-600 font-semibold text-sm hover:underline">
                Watch Now →
              </button>
            </div>
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg text-center hover:shadow-xl transition">
              <MessageCircle className="w-10 h-10 text-sky-500 mx-auto mb-3" />
              <h3 className="font-bold text-zinc-900 mb-2">Community</h3>
              <p className="text-zinc-600 text-sm mb-3">Connect with other users</p>
              <button className="text-sky-600 font-semibold text-sm hover:underline">
                Join Forum →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AEOFAQPage;