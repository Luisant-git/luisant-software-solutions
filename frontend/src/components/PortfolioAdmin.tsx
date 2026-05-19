import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Edit3,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { portfolioApi, Portfolio, getCategoryName } from "../lib/portfolioApi";
import { uploadApi } from "../lib/uploadApi";

export default function PortfolioAdmin() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [editingPortfolio, setEditingPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [loading, setLoading] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const selectionRef = useRef<Range | null>(null);

  useEffect(() => {
    loadPortfolios();
    loadCategories();
  }, []);

  useEffect(() => {
    const onSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      if (!descriptionRef.current?.contains(selection.anchorNode)) return;
      selectionRef.current = range.cloneRange();
    };

    document.addEventListener("selectionchange", onSelectionChange);
    return () => document.removeEventListener("selectionchange", onSelectionChange);
  }, []);

  useEffect(() => {
    if (!descriptionRef.current) return;
    if (!editingPortfolio) {
      descriptionRef.current.innerHTML = "";
      return;
    }

    const descriptionHtml = editingPortfolio.description || "<p><br></p>";
    if (descriptionRef.current.innerHTML !== descriptionHtml) {
      descriptionRef.current.innerHTML = descriptionHtml;
    }
  }, [editingPortfolio?.id, editingPortfolio?.description]);

  useEffect(() => {
    if (editingPortfolio?.category) {
      setCategorySearch(getCategoryName(editingPortfolio.category));
    } else {
      setCategorySearch("");
    }
  }, [editingPortfolio?.category]);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.toLowerCase().includes(categorySearch.toLowerCase()),
      ),
    );
  }, [categorySearch, categories]);

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

  const loadCategories = async () => {
    try {
      const data = await portfolioApi.getCategories();
      setCategories(data.map((category) => category.name));
    } catch (error) {
      console.error("Failed to load portfolio categories:", error);
    }
  };

  const handleSave = async () => {
    if (!editingPortfolio?.title || !editingPortfolio?.slug || !editingPortfolio?.category) {
      alert("Please fill in title, slug, and category");
      return;
    }

    try {
      setLoading(true);

      // Clean up optional fields and arrays
      const cleanedTechs = (editingPortfolio.technologies || [])
        .map(t => t.trim())
        .filter(t => t !== "");

      const cleanedFeatures = (editingPortfolio.features || [])
        .map(f => f.trim())
        .filter(f => f !== "");

      const cleanedResults = (editingPortfolio.results || [])
        .map(r => r.trim())
        .filter(r => r !== "");

      const cleanedImages = (editingPortfolio.images || [])
        .map(img => img.trim())
        .filter(img => img !== "");

      const portfolioToSave = {
        ...editingPortfolio,
        technologies: cleanedTechs,
        features: cleanedFeatures,
        results: cleanedResults,
        images: cleanedImages,
        clientName: editingPortfolio.clientName?.trim() || null,
        link: editingPortfolio.link?.trim() || null,
        caseStudy: editingPortfolio.caseStudy?.trim() || null,
      };

      if (editingPortfolio.id) {
        await portfolioApi.update(editingPortfolio.id, portfolioToSave);
      } else {
        await portfolioApi.create(portfolioToSave as any);
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

  const saveEditorSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    if (
      !descriptionRef.current?.contains(anchorNode) &&
      !descriptionRef.current?.contains(focusNode)
    ) {
      return;
    }
    selectionRef.current = range.cloneRange();
  };

  const restoreEditorSelection = () => {
    const range = selectionRef.current;
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    if (range) {
      selection.addRange(range);
    }
  };

  const execEditorCommand = (command: string, value?: string) => {
    if (!descriptionRef.current) return;

    descriptionRef.current.focus();

    // ✅ ensure block exists
    document.execCommand("formatBlock", false, "p");

    if (command === "createLink") {
      const url = window.prompt("Enter URL", "https://");
      if (!url) return;
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand(command, false, value ?? null);
    }

    const html = descriptionRef.current.innerHTML;
    setEditingPortfolio({ ...editingPortfolio!, description: html });
  };

  const handleDescriptionInput = () => {
    if (!descriptionRef.current || !editingPortfolio) return;
    const html = descriptionRef.current.innerHTML;
    setEditingPortfolio({ ...editingPortfolio, description: html });
    saveEditorSelection();
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
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
      <div className={`lg:col-span-4 space-y-4 ${editingPortfolio ? "hidden lg:block" : "block"}`}>
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
          className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2.5 hover:bg-slate-800 transition-all disabled:opacity-50 text-sm"
        >
          <Plus size={18} />
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
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md"
              >
                <div className="min-w-0">
                  <div className="font-bold text-secondary truncate">{p.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{p.category || 'Uncategorized'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingPortfolio(p)}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                    title="Edit portfolio"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-slate-50 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
                    title="Delete portfolio"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={`lg:col-span-8 ${!editingPortfolio ? "hidden lg:block" : "block"}`}>
        {editingPortfolio ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border-2 border-primary/10 rounded-xl px-4 pb-4 sm:px-6 sm:pb-6 pt-0 shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white pt-4 sm:pt-6 pb-4 mb-6 border-b border-slate-100 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditingPortfolio(null)}
                  className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <h2 className="text-xl font-black text-secondary uppercase tracking-tight italic">
                  Portfolio Editor
                </h2>
              </div>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 text-sm"
              >
                <Save size={16} /> {loading ? "SAVING..." : "SAVE PORTFOLIO"}
              </button>
            </div>

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
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Category
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCategorySearch(value);
                      setIsCategoryOpen(true);
                      if (editingPortfolio) {
                        setEditingPortfolio({ ...editingPortfolio, category: value });
                      }
                    }}
                    onFocus={() => setIsCategoryOpen(true)}
                    placeholder="Search categories"
                    className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <ChevronDown size={16} />
                  </span>
                  {isCategoryOpen && filteredCategories.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg max-h-56 overflow-y-auto">
                      {filteredCategories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            if (editingPortfolio) {
                              setEditingPortfolio({ ...editingPortfolio, category });
                            }
                            setCategorySearch(category);
                            setIsCategoryOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Search an existing category or create one in the Categories admin tab.
                </p>
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
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Description
                  </label>
                  <p className="text-xs text-slate-500 mt-1">Use the toolbar to format the project description.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 rounded-3xl bg-slate-100 p-2">
                  <select
                    onMouseDown={saveEditorSelection}
                    onChange={(e) => execEditorCommand("fontSize", e.target.value)}
                    className="h-10 rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue="3"
                  >
                    <option value="2">12</option>
                    <option value="3">14</option>
                    <option value="4">16</option>
                    <option value="5">18</option>
                    <option value="6">20</option>
                  </select>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("formatBlock", "<h1>")}
                    className="h-10 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("formatBlock", "<h2>")}
                    className="h-10 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("formatBlock", "<h3>")}
                    className="h-10 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("formatBlock", "<p>")}
                    className="h-10 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("bold")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Bold"
                  >
                    <Bold size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("italic")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Italic"
                  >
                    <Italic size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("underline")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Underline"
                  >
                    <u className="text-lg">U</u>
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("justifyLeft")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Align left"
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("justifyCenter")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Align center"
                  >
                    <AlignCenter size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("justifyRight")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Align right"
                  >
                    <AlignRight size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("justifyFull")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Justify"
                  >
                    <AlignJustify size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("insertUnorderedList")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Bullet list"
                  >
                    <List size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("insertOrderedList")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Numbered list"
                  >
                    <ListOrdered size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEditorSelection();
                    }}
                    onClick={() => execEditorCommand("createLink")}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-200 transition-all"
                    title="Insert link"
                  >
                    <Link2 size={16} />
                  </button>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <div
                  ref={descriptionRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleDescriptionInput}
                  onBlur={handleDescriptionInput}
                  onFocus={saveEditorSelection}
                  onMouseUp={saveEditorSelection}
                  onKeyUp={saveEditorSelection}
                  onPointerUp={saveEditorSelection}
                  className="min-h-[200px] w-full px-4 py-4 text-sm rounded-3xl bg-transparent outline-none whitespace-pre-wrap"
                />
              </div>
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
          <div className="hidden lg:block h-full">
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-300 p-10 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Plus size={40} className="text-slate-200" />
              </div>
              <p className="font-bold text-lg mb-2">Select a portfolio or create a new one</p>
              <p className="text-sm max-w-xs">
                Use the list on the left to manage portfolio projects shown on your website.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
