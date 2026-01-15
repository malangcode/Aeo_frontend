"use client";

import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2, Check, X, Building2, Globe, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  domain: string;
  isPrimary?: boolean;
}

interface Competitor {
  id: string;
  name: string;
  domain: string;
}

const AEOSettingsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([
    { id: '1', name: 'Your Company', domain: 'yourcompany.com', isPrimary: true }
  ]);

  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: '1', name: 'Competitor A', domain: 'competitora.com' },
    { id: '2', name: 'Competitor B', domain: 'competitorb.com' },
    { id: '3', name: 'Competitor C', domain: 'competitorc.com' }
  ]);

  const [editingBrand, setEditingBrand] = useState<string | null>(null);
  const [editingCompetitor, setEditingCompetitor] = useState<string | null>(null);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddCompetitor, setShowAddCompetitor] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [newBrand, setNewBrand] = useState({ name: '', domain: '' });
  const [newCompetitor, setNewCompetitor] = useState({ name: '', domain: '' });

  const [editBrandData, setEditBrandData] = useState({ name: '', domain: '' });
  const [editCompetitorData, setEditCompetitorData] = useState({ name: '', domain: '' });

  const handleAddBrand = () => {
    if (newBrand.name && newBrand.domain) {
      const brand: Brand = {
        id: Date.now().toString(),
        name: newBrand.name,
        domain: newBrand.domain,
        isPrimary: false
      };
      setBrands([...brands, brand]);
      setNewBrand({ name: '', domain: '' });
      setShowAddBrand(false);
      showSaveMessage('Brand added successfully!');
    }
  };

  const handleAddCompetitor = () => {
    if (newCompetitor.name && newCompetitor.domain) {
      const competitor: Competitor = {
        id: Date.now().toString(),
        name: newCompetitor.name,
        domain: newCompetitor.domain
      };
      setCompetitors([...competitors, competitor]);
      setNewCompetitor({ name: '', domain: '' });
      setShowAddCompetitor(false);
      showSaveMessage('Competitor added successfully!');
    }
  };

  const handleDeleteBrand = (id: string) => {
    const brand = brands.find(b => b.id === id);
    if (brand?.isPrimary) {
      alert('Cannot delete primary brand. Please set another brand as primary first.');
      return;
    }
    setBrands(brands.filter(b => b.id !== id));
    showSaveMessage('Brand removed successfully!');
  };

  const handleDeleteCompetitor = (id: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
    showSaveMessage('Competitor removed successfully!');
  };

  const startEditBrand = (brand: Brand) => {
    setEditingBrand(brand.id);
    setEditBrandData({ name: brand.name, domain: brand.domain });
  };

  const startEditCompetitor = (competitor: Competitor) => {
    setEditingCompetitor(competitor.id);
    setEditCompetitorData({ name: competitor.name, domain: competitor.domain });
  };

  const saveEditBrand = (id: string) => {
    setBrands(brands.map(b => 
      b.id === id ? { ...b, name: editBrandData.name, domain: editBrandData.domain } : b
    ));
    setEditingBrand(null);
    showSaveMessage('Brand updated successfully!');
  };

  const saveEditCompetitor = (id: string) => {
    setCompetitors(competitors.map(c => 
      c.id === id ? { ...c, name: editCompetitorData.name, domain: editCompetitorData.domain } : c
    ));
    setEditingCompetitor(null);
    showSaveMessage('Competitor updated successfully!');
  };

  const cancelEditBrand = () => {
    setEditingBrand(null);
    setEditBrandData({ name: '', domain: '' });
  };

  const cancelEditCompetitor = () => {
    setEditingCompetitor(null);
    setEditCompetitorData({ name: '', domain: '' });
  };

  const setPrimaryBrand = (id: string) => {
    setBrands(brands.map(b => ({
      ...b,
      isPrimary: b.id === id
    })));
    showSaveMessage('Primary brand updated!');
  };

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(null), 3000);
  };

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
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent mb-2">
              Settings
            </h1>
            <p className="text-xl text-zinc-600">Manage your brands and competitors</p>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center animate-fade-in">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800 font-medium">{saveMessage}</span>
            </div>
          )}

          {/* Brands Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Building2 className="w-6 h-6 text-indigo-500 mr-3" />
                <h2 className="text-2xl font-bold text-zinc-800">Your Brands</h2>
              </div>
              <button
                onClick={() => setShowAddBrand(true)}
                className="px-5 py-3 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Brand
              </button>
            </div>

            {/* Add Brand Form */}
            {showAddBrand && (
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 mb-4 border border-white/40">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">Add New Brand</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-zinc-700 font-medium mb-2">Brand Name</label>
                    <input
                      type="text"
                      value={newBrand.name}
                      onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                      placeholder="e.g., Acme Corporation"
                      className="w-full bg-white/50 text-zinc-900 rounded-xl p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-medium mb-2">Domain</label>
                    <input
                      type="text"
                      value={newBrand.domain}
                      onChange={(e) => setNewBrand({...newBrand, domain: e.target.value})}
                      placeholder="e.g., acmecorp.com"
                      className="w-full bg-white/50 text-zinc-900 rounded-xl p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddBrand}
                    disabled={!newBrand.name || !newBrand.domain}
                    className="px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" /> Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddBrand(false);
                      setNewBrand({ name: '', domain: '' });
                    }}
                    className="px-6 py-2 bg-zinc-200 text-zinc-700 rounded-xl font-medium hover:bg-zinc-300 transition flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Brands List */}
            <div className="space-y-3">
              {brands.map(brand => (
                <div
                  key={brand.id}
                  className="bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-white/40 hover:shadow-md transition"
                >
                  {editingBrand === brand.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          value={editBrandData.name}
                          onChange={(e) => setEditBrandData({...editBrandData, name: e.target.value})}
                          className="w-full bg-white/50 text-zinc-900 rounded-lg p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editBrandData.domain}
                          onChange={(e) => setEditBrandData({...editBrandData, domain: e.target.value})}
                          className="flex-1 bg-white/50 text-zinc-900 rounded-lg p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none"
                        />
                        <button
                          onClick={() => saveEditBrand(brand.id)}
                          className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEditBrand}
                          className="p-3 bg-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-400 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-zinc-900">{brand.name}</h3>
                          {brand.isPrimary && (
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-zinc-600 mt-1">
                          <Globe className="w-4 h-4 mr-2" />
                          <span className="text-sm">{brand.domain}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!brand.isPrimary && (
                          <button
                            onClick={() => setPrimaryBrand(brand.id)}
                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm font-medium"
                          >
                            Set as Primary
                          </button>
                        )}
                        <button
                          onClick={() => startEditBrand(brand)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(brand.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                          disabled={brand.isPrimary}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 bg-indigo-50 rounded-xl p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-700">
                Your primary brand is the main brand monitored across all AI platforms. You can add multiple brands to track different products or subsidiaries.
              </p>
            </div>
          </div>

          {/* Competitors Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-violet-500 mr-3" />
                <h2 className="text-2xl font-bold text-zinc-800">Competitors</h2>
              </div>
              <button
                onClick={() => setShowAddCompetitor(true)}
                className="px-5 py-3 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Competitor
              </button>
            </div>

            {/* Add Competitor Form */}
            {showAddCompetitor && (
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 mb-4 border border-white/40">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">Add New Competitor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-zinc-700 font-medium mb-2">Competitor Name</label>
                    <input
                      type="text"
                      value={newCompetitor.name}
                      onChange={(e) => setNewCompetitor({...newCompetitor, name: e.target.value})}
                      placeholder="e.g., Competitor Inc."
                      className="w-full bg-white/50 text-zinc-900 rounded-xl p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-medium mb-2">Domain</label>
                    <input
                      type="text"
                      value={newCompetitor.domain}
                      onChange={(e) => setNewCompetitor({...newCompetitor, domain: e.target.value})}
                      placeholder="e.g., competitor.com"
                      className="w-full bg-white/50 text-zinc-900 rounded-xl p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddCompetitor}
                    disabled={!newCompetitor.name || !newCompetitor.domain}
                    className="px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" /> Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCompetitor(false);
                      setNewCompetitor({ name: '', domain: '' });
                    }}
                    className="px-6 py-2 bg-zinc-200 text-zinc-700 rounded-xl font-medium hover:bg-zinc-300 transition flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Competitors List */}
            <div className="space-y-3">
              {competitors.map(competitor => (
                <div
                  key={competitor.id}
                  className="bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-white/40 hover:shadow-md transition"
                >
                  {editingCompetitor === competitor.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          value={editCompetitorData.name}
                          onChange={(e) => setEditCompetitorData({...editCompetitorData, name: e.target.value})}
                          className="w-full bg-white/50 text-zinc-900 rounded-lg p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editCompetitorData.domain}
                          onChange={(e) => setEditCompetitorData({...editCompetitorData, domain: e.target.value})}
                          className="flex-1 bg-white/50 text-zinc-900 rounded-lg p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none"
                        />
                        <button
                          onClick={() => saveEditCompetitor(competitor.id)}
                          className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEditCompetitor}
                          className="p-3 bg-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-400 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-zinc-900">{competitor.name}</h3>
                        <div className="flex items-center text-zinc-600 mt-1">
                          <Globe className="w-4 h-4 mr-2" />
                          <span className="text-sm">{competitor.domain}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditCompetitor(competitor)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCompetitor(competitor.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 bg-violet-50 rounded-xl p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-violet-700">
                Track up to 10 competitors to monitor their presence in AI-generated answers. Competitor data is used for benchmarking and identifying opportunities.
              </p>
            </div>
          </div>

          {/* Save All Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => showSaveMessage('All settings saved successfully!')}
              className="px-10 py-4 bg-gradient-to-tr from-indigo-500 via-violet-500 to-sky-500 rounded-xl text-white font-bold text-lg shadow-xl hover:scale-105 transition flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AEOSettingsPage;