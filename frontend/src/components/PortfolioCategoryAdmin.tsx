import React, { useEffect, useState } from "react";
import { Plus, Save, Edit3, Trash2, ChevronLeft } from "lucide-react";
import { portfolioApi, PortfolioCategory } from "../lib/portfolioApi";
 
export default function PortfolioCategoryAdmin() {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
 
  useEffect(() => {
    loadCategories();
  }, []);
 
  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await portfolioApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load portfolio categories:", error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }
 
    try {
      setLoading(true);
      if (editingCategoryId) {
        await portfolioApi.updateCategory(editingCategoryId, {
          name: categoryName.trim(),
        });
      } else {
        await portfolioApi.createCategory({
          name: categoryName.trim(),
        });
      }
      setCategoryName("");
      setEditingCategoryId(null);
      setShowEditor(false);
      await loadCategories();
    } catch (error: any) {
      alert(error.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };
 
  const handleEditCategory = (category: PortfolioCategory) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
    setShowEditor(true);
  };
 
  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setCategoryName("");
    setShowEditor(false);
  };
 
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category? This may remove related portfolio entries.")) return;
 
    try {
      setLoading(true);
      await portfolioApi.deleteCategory(id);
      await loadCategories();
    } catch (error: any) {
      alert(error.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };
 
  const isEditing = showEditor;
 
  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
      <div className={`lg:col-span-4 space-y-4 ${isEditing ? "hidden lg:block" : "block"}`}>
        <button
          type="button"
          onClick={() => {
            setEditingCategoryId(null);
            setCategoryName("");
            setShowEditor(true);
          }}
          className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2.5 hover:bg-slate-800 transition-all text-sm"
        >
          <Plus size={18} />
          ADD NEW CATEGORY
        </button>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Existing Categories</h3>
          {loading && categories.length === 0 ? (
            <div className="text-center py-10 text-slate-400">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-10 text-slate-400 italic">No categories added yet.</div>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-800 truncate">{category.name}</div>
                   
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory(category);
                      }}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer z-10"
                      title="Edit category"
                    >
                      <Edit3 size={18} className="pointer-events-none" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-slate-50 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer z-10"
                      title="Delete category"
                    >
                      <Trash2 size={18} className="pointer-events-none" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`lg:col-span-8 ${!isEditing ? "hidden lg:block" : "block"}`}>
        {isEditing ? (
          <div className="bg-white border-2 border-primary/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div>
                  <h2 className="text-xl font-black text-secondary uppercase tracking-tight italic">{editingCategoryId ? "Edit Category" : "Add Category"}</h2>
                  <p className="text-xs text-slate-400">Use this form to maintain the category master list.</p>
                </div>
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{categories.length} categories</div>
            </div>
 
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary"
                  placeholder="e.g. Web Design"
                />
              </div>
 
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSaveCategory}
                  disabled={loading}
                  className="flex-1 bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all disabled:opacity-50 text-sm"
                >
                  <Save size={16} /> {loading ? "SAVING..." : editingCategoryId ? "UPDATE CATEGORY" : "CREATE CATEGORY"}
                </button>
                {editingCategoryId && (
                  <button
                    onClick={handleCancelEdit}
                    type="button"
                    className="flex-1 bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-300 transition-all text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:block h-full">
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400 p-10 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Plus size={40} className="text-slate-200" />
              </div>
              <p className="font-bold text-lg mb-2">Add a new category or edit an existing one</p>
              <p className="text-sm max-w-xs">Select an existing category from the left or click Add New Category to begin.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
