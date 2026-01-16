"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Building2,
  Globe,
  Users,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { axiosWithCsrf } from "@/lib/axiosWithCsrf";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface Brand {
  id: number;
  brand_name: string;
  domain_name: string;
  url: string;
}

interface Competitor {
  id: number;
  brand_name: string;
  domain_name: string;
  url: string;
}

const AEOSettingsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const { user } = useAuth();

  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [laoding, setLoading] = useState(false);

  const [editingBrand, setEditingBrand] = useState<number | null>(null);
  const [editingCompetitor, setEditingCompetitor] = useState<number | null>(
    null
  );
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddCompetitor, setShowAddCompetitor] = useState(false);

  const [newBrand, setNewBrand] = useState({ name: "", domain: "" });
  const [newCompetitor, setNewCompetitor] = useState({ name: "", domain: "" });

  const [editBrandData, setEditBrandData] = useState({ name: "", domain: "" });
  const [editCompetitorData, setEditCompetitorData] = useState({
    name: "",
    domain: "",
  });

  const getCompetitors = async () => {
    try {
      setLoading(true);
      const res = await axiosWithCsrf.get("/competitors/");
      setCompetitors(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch competitors", error);
    }
  };

  const getSecondaryBrands = async () => {
    try {
      setLoading(true);
      const res = await axiosWithCsrf.get("/secondary-brands/");
      setBrands(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch competitors", error);
    }
  };

  useEffect(() => {
    getCompetitors();
    getSecondaryBrands();
  }, []);

  const handleAddBrand = async () => {
    if (!newBrand.name || !newBrand.domain) return;

    if (!newBrand.domain.includes(".com")){
      toast.error("Oops! it seems you forgot '.com' in domain ?");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosWithCsrf.post("/secondary-brands/", {
        brand_name: newBrand.name,
        domain_name: newBrand.domain,
        url: `https://${newBrand.domain}`,
      });

      const savedBrand: Brand = {
        id: res.data.data.id, // backend ID
        brand_name: res.data.data.brand_name,
        domain_name: res.data.data.domain_name,
        url: res.data.data.url,
      };

      setBrands((prev) => [...prev, savedBrand]);
      setLoading(false);

      setNewBrand({ name: "", domain: "" });
      setShowAddBrand(false);
      toast.success("Brand added successfully!");

    } catch (error) {
      console.error("Failed to add brand", error);
      alert("Failed to add brand. Please try again.");
      setLoading(false);
    }
  };


  const handleAddCompetitor = async () => {
    if (!newCompetitor.name || !newCompetitor.domain) return;

    if (!newCompetitor.domain.includes(".com")){
      toast.error("Oops! it seems you forgot '.com' in domain ?");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosWithCsrf.post("/competitors/", {
        brand_name: newCompetitor.name,
        domain_name: newCompetitor.domain,
        url: `https://${newCompetitor.domain}`,
      });

      const savedCompetitor: Competitor = {
        id: res.data.data.id, // backend ID
        brand_name: res.data.data.brand_name,
        domain_name: res.data.data.domain_name,
        url: res.data.data.url,
      };

      setCompetitors((prev) => [...prev, savedCompetitor]);
      setLoading(false);

      setNewCompetitor({ name: "", domain: "" });
      setShowAddCompetitor(false);
      toast.success("Competitor added successfully!")
    } catch (error) {
      console.error("Failed to add competitor", error);
      alert("Failed to add competitor. Please try again.");
    }
  };


  const handleDeleteBrand = async (id: number) => {
    const brand = brands.find((b) => b.id === id);

    if (!brand) return;

    try {
      setLoading(true);

      // Call backend to delete the secondary brand
      await axiosWithCsrf.delete(`/secondary-brands/${id}/`);

      // Remove from frontend state only after success
      setBrands(brands.filter((b) => b.id !== id));

      setLoading(false);
      toast.success("Brand removed successfully!")
    } catch (error) {
      console.error("Failed to delete brand", error);
      alert("Failed to delete brand. Please try again.");
      setLoading(false);
    }
  };

  const handleDeleteCompetitor = async (id: number) => {
    try {
      setLoading(true);
      await axiosWithCsrf.delete(`/competitors/${id}/`);
      setCompetitors(competitors.filter((c) => c.id !== id));
      setLoading(false);
      toast.success("Competitor removed successfully!")
    } catch (error) {
      console.error("Failed to delete competitor", error);
      alert("Failed to delete competitor. Please try again.");
    }
  };

  const startEditBrand = (brand: Brand) => {
    setEditingBrand(brand.id);
    setEditBrandData({ name: brand.brand_name, domain: brand.domain_name });
  };

  const startEditCompetitor = (competitor: Competitor) => {
    setEditingCompetitor(competitor.id);
    setEditCompetitorData({
      name: competitor.brand_name,
      domain: competitor.domain_name,
    });
  };

  const saveEditBrand = async (id: number) => {
    if (!editBrandData.domain.includes(".com")){
      toast.error("Oops! it seems you forgot '.com' in domain ?");
      return;
    }
    try {
      setLoading(true);

      const res = await axiosWithCsrf.put(`/secondary-brands/${id}/`, {
        brand_name: editBrandData.name,
        domain_name: editBrandData.domain,
        url: `https://${editBrandData.domain}`,
      });

      const updatedBrand: Brand = {
        id: res.data.id,
        brand_name: res.data.brand_name,
        domain_name: res.data.domain_name,
        url: res.data.url,
      };

      setBrands(brands.map((b) => (b.id === id ? updatedBrand : b)));

      setEditingBrand(null);
      setLoading(false);
      toast.success("Brand updated successfully!");
    } catch (error) {
      console.error("Failed to update brand", error);
      alert("Failed to update brand. Please try again.");
      setLoading(false);
    }
  };

  const saveEditCompetitor = async (id: number) => {
    if (!editCompetitorData.domain.includes(".com")){
      toast.error("Oops! it seems you forgot '.com' in domain ?");
      return;
    }
    try {
      setLoading(true);
      const res = await axiosWithCsrf.put(`/competitors/${id}/`, {
        brand_name: editCompetitorData.name,
        domain_name: editCompetitorData.domain,
        url: `https://${editCompetitorData.domain}`,
      });

      const updatedCompetitor: Competitor = {
        id: res.data.data.id,

        brand_name: res.data.data.brand_name,

        domain_name: res.data.data.domain_name,

        url: res.data.data.url,
      };

      setCompetitors(
        competitors.map((c) => (c.id === id ? updatedCompetitor : c))
      );
      setEditingCompetitor(null);
      setLoading(false);
      toast.success("Competitor updated successfully!");
    } catch (error) {
      console.error("Failed to update competitor", error);
      alert("Failed to update competitor. Please try again.");
    }
  };

  const cancelEditBrand = () => {
    setEditingBrand(null);
    setEditBrandData({ name: "", domain: "" });
  };

  const cancelEditCompetitor = () => {
    setEditingCompetitor(null);
    setEditCompetitorData({ name: "", domain: "" });
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
            <p className="text-xl text-zinc-600">
              Manage your brands and competitors
            </p>
          </div>

          {/* Brands Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Building2 className="w-6 h-6 text-indigo-500 mr-3" />
                <h2 className="text-2xl font-bold text-zinc-800">
                  Your Brands
                </h2>
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
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">
                  Add New Brand
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-zinc-700 font-medium mb-2">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={newBrand.name}
                      onChange={(e) =>
                        setNewBrand({ ...newBrand, name: e.target.value })
                      }
                      placeholder="e.g., Acme Corporation"
                      className="w-full bg-white/50 text-zinc-900 rounded-xl p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-medium mb-2">
                      Domain Name
                    </label>
                    <input
                      type="text"
                      value={newBrand.domain}
                      onChange={(e) =>
                        setNewBrand({ ...newBrand, domain: e.target.value })
                      }
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
                      setNewBrand({ name: "", domain: "" });
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
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-white/40 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-zinc-900">
                        {user?.brand_name}
                      </h3>

                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                        Primary
                      </span>
                    </div>
                    <div className="flex items-center text-zinc-600 mt-1">
                      <Globe className="w-4 h-4 mr-2" />
                      <span className="text-sm">{user?.domain_name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="p-2 pl-5 pr-5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                      Fixed !
                    </span>
                  </div>
                </div>
              </div>
              {brands.map((brand) => (
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
                          onChange={(e) =>
                            setEditBrandData({
                              ...editBrandData,
                              name: e.target.value,
                            })
                          }
                          className="w-full bg-white/50 text-zinc-900 rounded-lg p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editBrandData.domain}
                          onChange={(e) =>
                            setEditBrandData({
                              ...editBrandData,
                              domain: e.target.value,
                            })
                          }
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
                          <h3 className="text-lg font-bold text-zinc-900">
                            {brand.brand_name}
                          </h3>

                          <span className="px-3 py-1 bg-gray-100 text-yellow-700 text-xs font-semibold rounded-full">
                            Secondary
                          </span>
                        </div>
                        <div className="flex items-center text-zinc-600 mt-1">
                          <Globe className="w-4 h-4 mr-2" />
                          <span className="text-sm">{brand.domain_name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditBrand(brand)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(brand.id)}
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

            <div className="mt-4 bg-indigo-50 rounded-xl p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-700">
                Your primary brand is the main brand monitored across all AI
                platforms. You can add multiple brands to track different
                products or subsidiaries.
              </p>
            </div>
          </div>

          {/* Competitors Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-violet-500 mr-3" />
                <h2 className="text-2xl font-bold text-zinc-800">
                  Competitors
                </h2>
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
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">
                  Add New Competitor
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-zinc-700 font-medium mb-2">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={newCompetitor.name}
                      onChange={(e) =>
                        setNewCompetitor({
                          ...newCompetitor,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g., Competitor Inc."
                      className="w-full bg-white/50 text-zinc-900 rounded-xl p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-medium mb-2">
                      Domain Name
                    </label>
                    <input
                      type="text"
                      value={newCompetitor.domain}
                      onChange={(e) =>
                        setNewCompetitor({
                          ...newCompetitor,
                          domain: e.target.value,
                        })
                      }
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
                    <Check className="w-4 h-4 mr-2" />{" "}
                    {laoding ? "adding..." : "Add"}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCompetitor(false);
                      setNewCompetitor({ name: "", domain: "" });
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
              {competitors.map((competitor) => (
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
                          onChange={(e) =>
                            setEditCompetitorData({
                              ...editCompetitorData,
                              name: e.target.value,
                            })
                          }
                          className="w-full bg-white/50 text-zinc-900 rounded-lg p-3 border border-zinc-300 focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editCompetitorData.domain}
                          onChange={(e) =>
                            setEditCompetitorData({
                              ...editCompetitorData,
                              domain: e.target.value,
                            })
                          }
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
                        <h3 className="text-lg font-bold text-zinc-900">
                          {competitor.brand_name}
                        </h3>
                        <div className="flex items-center text-zinc-600 mt-1">
                          <Globe className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {competitor.domain_name}
                          </span>
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
                Track up to 10 competitors to monitor their presence in
                AI-generated answers. Competitor data is used for benchmarking
                and identifying opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AEOSettingsPage;
