import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Trash2, Save, LogOut, Package, Users, Image as ImageIcon, Briefcase, Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../lib/authApi";
import { productsApi, Product } from "../lib/productsApi";
import { clientsApi, Client } from "../lib/clientsApi";
import { uploadApi } from "../lib/uploadApi";
import { careersApi, Career } from "../lib/careersApi";

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "clients" | "careers">("products");
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(null);

  const [careers, setCareers] = useState<Career[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      loadProducts();
      loadClients();
      loadCareers();
    }
  }, [navigate]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await clientsApi.getAll();
      setClients(data);
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCareers = async () => {
    try {
      setLoading(true);
      const data = await careersApi.getAll();
      setCareers(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to load careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.removeToken();
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Careers filtering and pagination
  const filteredCareers = careers.filter(career =>
    career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.mobile.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredCareers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCareers = filteredCareers.slice(startIndex, startIndex + itemsPerPage);

  // Product Actions
  const handleAddProduct = () => {
    setEditingProduct({
      id: "",
      name: "",
      slug: "",
      description: "",
      points: [""],
      adminId: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleSaveProduct = async () => {
    if (!editingProduct || !editingProduct.name || !editingProduct.slug) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      if (editingProduct.id) {
        await productsApi.update(editingProduct.id, editingProduct);
      } else {
        await productsApi.create(editingProduct as any);
      }
      setEditingProduct(null);
      await loadProducts();
    } catch (error: any) {
      alert(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      setLoading(true);
      await productsApi.delete(id);
      await loadProducts();
    } catch (error: any) {
      alert(error.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const updatePoint = (index: number, value: string) => {
    if (!editingProduct) return;
    const newPoints = [...(editingProduct.points || [])];
    newPoints[index] = value;
    setEditingProduct({ ...editingProduct, points: newPoints });
  };

  const addPointField = () => {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, points: [...(editingProduct.points || []), ""] });
  };

  // Client Actions
  const handleAddClient = () => {
    setEditingClient({
      id: "",
      name: "",
      logo: "",
      adminId: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleSaveClient = async () => {
    if (!editingClient || !editingClient.name) {
      alert('Please fill in client name');
      return;
    }

    try {
      setLoading(true);
      if (editingClient.id) {
        await clientsApi.update(editingClient.id, editingClient);
      } else {
        await clientsApi.create(editingClient as any);
      }
      setEditingClient(null);
      await loadClients();
    } catch (error: any) {
      alert(error.message || 'Failed to save client');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      setLoading(true);
      await clientsApi.delete(id);
      await loadClients();
    } catch (error: any) {
      alert(error.message || 'Failed to delete client');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        const result = await uploadApi.uploadFile(file);
        if (editingClient) {
          setEditingClient({ ...editingClient, logo: result.url });
        }
      } catch (error: any) {
        alert(error.message || 'Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-secondary uppercase tracking-tight">Admin <span className="text-primary italic">Dashboard</span></h1>
            <div className="flex gap-4 mt-2 flex-wrap">
              <button 
                onClick={() => { setActiveTab("products"); setEditingProduct(null); setEditingClient(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "products" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                <Package size={16} />
                PRODUCTS
              </button>
              <button 
                onClick={() => { setActiveTab("clients"); setEditingProduct(null); setEditingClient(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "clients" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                <Users size={16} />
                CLIENTS
              </button>
              <button 
                onClick={() => { setActiveTab("careers"); setEditingProduct(null); setEditingClient(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "careers" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                <Briefcase size={16} />
                CAREERS
              </button>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors font-bold uppercase text-sm tracking-widest"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {activeTab === "careers" ? (
          <div className="bg-white rounded-xl border border-slate-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg border border-slate-100">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-grow bg-transparent outline-none text-secondary font-medium"
                />
              </div>
            </div>

            {loading ? (
              <div className="p-10 text-center text-slate-400">Loading...</div>
            ) : paginatedCareers.length === 0 ? (
              <div className="p-10 text-center text-slate-400 italic">
                {careers.length === 0 ? "No career applications yet." : "No results found."}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Phone</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">City</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Skills</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Resume</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCareers.map((career, idx) => (
                        <tr key={career.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <td className="px-6 py-4 text-sm font-bold text-secondary">{career.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{career.email}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{career.mobile}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{career.city || '-'}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{career.skills || '-'}</td>
                          <td className="px-6 py-4 text-sm">
                            {career.resumeUrl ? (
                              <a href={career.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-colors">
                                <Download size={16} />
                                Download
                              </a>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{new Date(career.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-sm text-slate-600 font-medium">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCareers.length)} of {filteredCareers.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-lg font-bold text-sm transition-all ${
                              currentPage === page
                                ? 'bg-primary text-white'
                                : 'border border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <button 
                onClick={activeTab === "products" ? handleAddProduct : handleAddClient}
                disabled={loading}
                className="w-full bg-slate-900 text-white p-6 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                <Plus size={20} />
                ADD NEW {activeTab === "products" ? "PRODUCT" : "CLIENT"}
              </button>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Existing {activeTab}</h3>
                {loading && <div className="text-center py-10 text-slate-400">Loading...</div>}
                {!loading && activeTab === "products" && products.length === 0 && (
                  <div className="text-center py-10 text-slate-400 italic">No products added yet.</div>
                )}
                {!loading && activeTab === "clients" && clients.length === 0 && (
                  <div className="text-center py-10 text-slate-400 italic">No clients added yet.</div>
                )}
                {!loading && activeTab === "products" && products.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 group transition-all hover:shadow-md">
                    <span className="font-bold text-secondary truncate mr-4">{p.name}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingProduct(p)} className="p-2 text-slate-400 hover:text-primary transition-colors">Edit</button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                {!loading && activeTab === "clients" && clients.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 group transition-all hover:shadow-md">
                    <div className="flex items-center gap-3">
                      {c.logo && <img src={c.logo} className="w-8 h-8 rounded object-contain bg-slate-50" />}
                      <span className="font-bold text-secondary truncate mr-4">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingClient(c)} className="p-2 text-slate-400 hover:text-primary transition-colors">Edit</button>
                      <button onClick={() => handleDeleteClient(c.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              {activeTab === "products" ? (
                editingProduct ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border-2 border-primary/10 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                      <button onClick={handleSaveProduct} disabled={loading} className="bg-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
                        <Save size={18} /> {loading ? 'SAVING...' : 'SAVE CHANGES'}
                      </button>
                    </div>
                    <h2 className="text-2xl font-black text-secondary mb-10 uppercase tracking-tight italic">Product Editor</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8 text-secondary">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Product Name</label>
                        <input type="text" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest">URL Slug</label>
                        <input type="text" value={editingProduct.slug || ''} onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-8 text-secondary">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Description</label>
                      <textarea rows={4} value={editingProduct.description || ''} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Feature Points</label>
                        <button onClick={addPointField} className="text-xs font-black text-primary uppercase tracking-widest hover:underline">+ Add Point</button>
                      </div>
                      {editingProduct.points?.map((point, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input type="text" value={point} onChange={(e) => updatePoint(idx, e.target.value)} className="flex-grow px-6 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
                          <button onClick={() => setEditingProduct({ ...editingProduct, points: editingProduct.points?.filter((_, i) => i !== idx) })} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4 mt-8 pt-8 border-t border-slate-200">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Redirect Button (Optional)</label>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Button Name</label>
                        <input type="text" placeholder="e.g., Download Demo, Learn More" value={editingProduct.buttonName || ''} onChange={(e) => setEditingProduct({ ...editingProduct, buttonName: e.target.value })} className="w-full px-6 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Button URL</label>
                        <input type="url" placeholder="https://example.com" value={editingProduct.buttonUrl || ''} onChange={(e) => setEditingProduct({ ...editingProduct, buttonUrl: e.target.value })} className="w-full px-6 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
                      </div>
                    </div>
                  </motion.div>
                ) : <Placeholder text="product" />
              ) : (
                editingClient ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border-2 border-primary/10 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                      <button onClick={handleSaveClient} disabled={loading} className="bg-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
                        <Save size={18} /> {loading ? 'SAVING...' : 'SAVE CHANGES'}
                      </button>
                    </div>
                    <h2 className="text-2xl font-black text-secondary mb-10 uppercase tracking-tight italic">Client Editor</h2>
                    <div className="space-y-6 text-secondary">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Client Name</label>
                        <input type="text" value={editingClient.name || ''} onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
                      </div>
                      
                      <div className="space-y-4">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Client Logo</label>
                        <div className="flex items-center gap-6">
                          <div className="w-32 h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                            {editingClient.logo ? <img src={editingClient.logo} className="w-full h-full object-contain p-2" /> : <ImageIcon size={32} className="text-slate-200" />}
                          </div>
                          <div className="flex-grow">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="logo-upload" />
                            <label htmlFor="logo-upload" className="inline-block bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-slate-200 transition-all">UPLOAD LOGO IMAGE</label>
                            <p className="mt-2 text-xs text-slate-400">Recommended: Square PNG with transparent background</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : <Placeholder text="client" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="h-full min-h-[400px] border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-300 p-10 text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <Plus size={40} className="text-slate-200" />
      </div>
      <p className="font-bold text-lg mb-2">Select a {text} or create a new one</p>
      <p className="text-sm max-w-xs">Use the list on the left to manage the dynamic content shown on your website.</p>
    </div>
  );
}
