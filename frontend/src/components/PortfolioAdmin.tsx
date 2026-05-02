import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Trash2, Save, Image as ImageIcon } from "lucide-react";
import { portfolioApi, Portfolio } from "../lib/portfolioApi";
import { uploadApi } from "../lib/uploadApi";

export default function PortfolioAdmin() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [editingPortfolio, setEditingPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      const data = await portfolioApi.getAll();
      setPortfolios(data);
    } catch (error) {
      console.error("Failed to load portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPortfolio?.title || !editingPortfolio?.slug || !editingPortfolio?.category) {
      alert("Please fill in title, slug, and category");
      return;
    }

    try {
      setLoading(true);
      if (editingPortfolio.id) {
        await portfolioApi.update(editingPortfolio.id, editingPortfolio);
      } else {
        await portfolioApi.create(editingPortfolio as any);
      }
      setEditingPortfolio(null);
      await loadPortfolios();
    } catch (error: any) {
      alert(error.message || "Failed to save portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio?")) return;

    try {
      setLoading(true);
      await portfolioApi.delete(id);
      await loadPortfolios();
    } catch (error: any) {
      alert(error.message || "Failed to delete portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingPortfolio) {
      try {
        setLoading(true);
        const result = await uploadApi.uploadFile(file);
        setEditingPortfolio({ ...editingPortfolio, image: result.url });
      } catch (error: any) {
        alert(error.message || "Failed to upload image");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4 space-y-4">
        <button
          onClick={() =>
            setEditingPortfolio({
              id: "",
              title: "",
              slug: "",
              description: "",
              category: "",
              image: "",
              images: [],
              clientName: "",
              technologies: [""],
              features: [""],
              link: "",
              caseStudy: "",
              results: [""],
              adminId: "",
              createdAt: "",
              updatedAt: "",
            })
          }
          disabled={loading}
          className="w-full bg-slate-900 text-white p-6 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          <Plus size={20} />
          ADD NEW PORTFOLIO
        </button>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-2 max-h-[600px] overflow-y-auto">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            Existing Portfolios
          </h3>
          {loading && <div className="text-center py-10 text-slate-400">Loading...</div>}
          {!loading && portfolios.length === 0 && (
            <div className="text-center py-10 text-slate-400 italic">No portfolios added yet.</div>
          )}
          {!loading &&
            portfolios.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 group transition-all hover:shadow-md"
              >
                <span className="font-bold text-secondary truncate mr-4">{p.title}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingPortfolio(p)}
                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="lg:col-span-8">
        {editingPortfolio ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border-2 border-primary/10 rounded-xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-slate-100 z-10">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                <Save size={18} /> {loading ? "SAVING..." : "SAVE PORTFOLIO"}
              </button>
            </div>

            <h2 className="text-xl font-black text-secondary mb-6 uppercase tracking-tight italic">
              Portfolio Editor
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6 text-secondary">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Project Title
                </label>
                <input
                  type="text"
                  value={editingPortfolio.title || ""}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={editingPortfolio.slug || ""}
                  onChange={(e) =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6 text-secondary">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Category
                </label>
                <input
                  type="text"
                  value={editingPortfolio.category || ""}
                  onChange={(e) =>
                    setEditingPortfolio({ ...editingPortfolio, category: e.target.value })
                  }
                  className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Client Name (Optional)
                </label>
                <input
                  type="text"
                  value={editingPortfolio.clientName || ""}
                  onChange={(e) =>
                    setEditingPortfolio({ ...editingPortfolio, clientName: e.target.value })
                  }
                  className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-1 mb-6 text-secondary">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Description
              </label>
              <textarea
                rows={3}
                value={editingPortfolio.description || ""}
                onChange={(e) =>
                  setEditingPortfolio({ ...editingPortfolio, description: e.target.value })
                }
                className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-1 mb-6 text-secondary">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Case Study (Optional)
              </label>
              <textarea
                rows={3}
                value={editingPortfolio.caseStudy || ""}
                onChange={(e) =>
                  setEditingPortfolio({ ...editingPortfolio, caseStudy: e.target.value })
                }
                className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Technologies
                </label>
                <button
                  onClick={() =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      technologies: [...(editingPortfolio.technologies || []), ""],
                    })
                  }
                  className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
                >
                  + Add Tech
                </button>
              </div>
              {editingPortfolio.technologies?.map((tech, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => {
                      const newTechs = [...(editingPortfolio.technologies || [])];
                      newTechs[idx] = e.target.value;
                      setEditingPortfolio({ ...editingPortfolio, technologies: newTechs });
                    }}
                    className="flex-grow px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary"
                  />
                  <button
                    onClick={() =>
                      setEditingPortfolio({
                        ...editingPortfolio,
                        technologies: editingPortfolio.technologies?.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Features
                </label>
                <button
                  onClick={() =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      features: [...(editingPortfolio.features || []), ""],
                    })
                  }
                  className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
                >
                  + Add Feature
                </button>
              </div>
              {editingPortfolio.features?.map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...(editingPortfolio.features || [])];
                      newFeatures[idx] = e.target.value;
                      setEditingPortfolio({ ...editingPortfolio, features: newFeatures });
                    }}
                    className="flex-grow px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary"
                  />
                  <button
                    onClick={() =>
                      setEditingPortfolio({
                        ...editingPortfolio,
                        features: editingPortfolio.features?.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Results (Optional)
                </label>
                <button
                  onClick={() =>
                    setEditingPortfolio({
                      ...editingPortfolio,
                      results: [...(editingPortfolio.results || []), ""],
                    })
                  }
                  className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
                >
                  + Add Result
                </button>
              </div>
              {editingPortfolio.results?.map((result, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={result}
                    onChange={(e) => {
                      const newResults = [...(editingPortfolio.results || [])];
                      newResults[idx] = e.target.value;
                      setEditingPortfolio({ ...editingPortfolio, results: newResults });
                    }}
                    className="flex-grow px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary"
                  />
                  <button
                    onClick={() =>
                      setEditingPortfolio({
                        ...editingPortfolio,
                        results: editingPortfolio.results?.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 pt-6 border-t border-slate-200">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Project Image
              </label>
              <div className="flex items-center gap-6">
                <div className="w-full h-40 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                  {editingPortfolio.image ? (
                    <img src={editingPortfolio.image} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={32} className="text-slate-200" />
                  )}
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="portfolio-image-upload"
              />
              <label
                htmlFor="portfolio-image-upload"
                className="inline-block bg-slate-100 text-slate-600 px-4 py-2 text-sm rounded-xl font-bold cursor-pointer hover:bg-slate-200 transition-all"
              >
                UPLOAD PROJECT IMAGE
              </label>
            </div>

            <div className="space-y-1 mb-6 text-secondary">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Live Project Link (Optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={editingPortfolio.link || ""}
                onChange={(e) => setEditingPortfolio({ ...editingPortfolio, link: e.target.value })}
                className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary"
              />
            </div>
          </motion.div>
        ) : (
          <div className="h-full min-h-[400px] border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-300 p-10 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Plus size={40} className="text-slate-200" />
            </div>
            <p className="font-bold text-lg mb-2">Select a portfolio or create a new one</p>
            <p className="text-sm max-w-xs">
              Use the list on the left to manage portfolio projects shown on your website.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
