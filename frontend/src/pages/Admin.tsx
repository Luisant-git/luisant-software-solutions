import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Lock, Plus, Trash2, Save, LogOut, Package, Users, Image as ImageIcon } from "lucide-react";
import { Product, getProducts, saveProduct, deleteProduct, Client, getClients, saveClient, deleteClient } from "../lib/productService";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "clients">("products");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("luisant_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setProducts(getProducts());
    setClients(getClients());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true);
      localStorage.setItem("luisant_admin_auth", "true");
      setError("");
      loadData();
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("luisant_admin_auth");
  };

  // Product Actions
  const handleAddProduct = () => {
    setEditingProduct({
      id: Date.now().toString(),
      name: "",
      slug: "",
      description: "",
      points: [""]
    });
  };

  const handleSaveProduct = () => {
    if (editingProduct && editingProduct.name && editingProduct.slug) {
      saveProduct(editingProduct as Product);
      setEditingProduct(null);
      loadData();
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    loadData();
  };

  // Client Actions
  const handleAddClient = () => {
    setEditingClient({
      id: Date.now().toString(),
      name: "",
      logo: ""
    });
  };

  const handleSaveClient = () => {
    if (editingClient && editingClient.name) {
      saveClient(editingClient as Client);
      setEditingClient(null);
      loadData();
    }
  };

  const handleDeleteClient = (id: string) => {
    deleteClient(id);
    loadData();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingClient) {
          setEditingClient({ ...editingClient, logo: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 border border-slate-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-secondary">Admin Login</h2>
            <p className="text-slate-500">Access your business dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              LOG IN
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-secondary uppercase tracking-tight">Admin <span className="text-primary italic">Dashboard</span></h1>
            <div className="flex gap-4 mt-2">
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

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={activeTab === "products" ? handleAddProduct : handleAddClient}
              className="w-full bg-slate-900 text-white p-6 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
            >
              <Plus size={20} />
              ADD NEW {activeTab.toUpperCase().slice(0, -1)}
            </button>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Existing {activeTab}</h3>
              {activeTab === "products" ? (
                products.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 italic">No products added yet.</div>
                ) : (
                  products.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 group transition-all hover:shadow-md">
                      <span className="font-bold text-secondary truncate mr-4">{p.name}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingProduct(p)} className="p-2 text-slate-400 hover:text-primary transition-colors">Edit</button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                clients.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 italic">No clients added yet.</div>
                ) : (
                  clients.map((c) => (
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
                  ))
                )
              )}
            </div>
          </div>

          <div className="lg:col-span-8">
            {activeTab === "products" ? (
              editingProduct ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border-2 border-primary/10 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                    <button onClick={handleSaveProduct} className="bg-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
                      <Save size={18} /> SAVE CHANGES
                    </button>
                  </div>
                  <h2 className="text-2xl font-black text-secondary mb-10 uppercase tracking-tight italic">Product Editor</h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-8 text-secondary">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Product Name</label>
                      <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest">URL Slug</label>
                      <input type="text" value={editingProduct.slug} onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-8 text-secondary">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Description</label>
                    <textarea rows={4} value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
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
                </motion.div>
              ) : <Placeholder text="product" />
            ) : (
              editingClient ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border-2 border-primary/10 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8">
                    <button onClick={handleSaveClient} className="bg-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
                      <Save size={18} /> SAVE CHANGES
                    </button>
                  </div>
                  <h2 className="text-2xl font-black text-secondary mb-10 uppercase tracking-tight italic">Client Editor</h2>
                  <div className="space-y-6 text-secondary">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Client Name</label>
                      <input type="text" value={editingClient.name} onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
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
