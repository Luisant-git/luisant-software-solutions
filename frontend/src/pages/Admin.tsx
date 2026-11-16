import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Plus, Trash2, Save, LogOut, Package, Users, Image as ImageIcon, Briefcase, Download, Search, ChevronLeft, ChevronRight, Palette, Edit3, Bold, Italic, List, ListOrdered, Link2, AlignLeft, AlignCenter, AlignRight, AlignJustify, ArrowUp, ArrowDown, Monitor, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../lib/authApi";
import { productsApi, Product, sortProducts } from "../lib/productsApi";
import { clientsApi, Client } from "../lib/clientsApi";
import { uploadApi } from "../lib/uploadApi";
import { careersApi, Career } from "../lib/careersApi";
import { portfolioApi, Portfolio } from "../lib/portfolioApi";
import PortfolioAdmin from "../components/PortfolioAdmin";
import PortfolioCategoryAdmin from "../components/PortfolioCategoryAdmin";

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "clients" | "careers" | "portfolio" | "categories">("products");
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(null);

  const [careers, setCareers] = useState<Career[]>([]);
  const [editingPortfolio, setEditingPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const productDescriptionRef = useRef<HTMLDivElement | null>(null);
  const productSelectionRef = useRef<Range | null>(null);

  // selectionchange listener to keep track of cursor selection
  useEffect(() => {
    const onSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      if (!productDescriptionRef.current?.contains(selection.anchorNode)) return;
      productSelectionRef.current = range.cloneRange();
    };

    document.addEventListener("selectionchange", onSelectionChange);
    return () => document.removeEventListener("selectionchange", onSelectionChange);
  }, []);

  // Update editor innerHTML when editingProduct changes
  useEffect(() => {
    if (!productDescriptionRef.current) return;
    if (!editingProduct) {
      productDescriptionRef.current.innerHTML = "";
      return;
    }

    const descriptionHtml = editingProduct.description || "<p><br></p>";
    if (productDescriptionRef.current.innerHTML !== descriptionHtml) {
      productDescriptionRef.current.innerHTML = descriptionHtml;
    }
  }, [editingProduct?.id, !!editingProduct]);

  const saveProductEditorSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    if (
      !productDescriptionRef.current?.contains(anchorNode) &&
      !productDescriptionRef.current?.contains(focusNode)
    ) {
      return;
    }
    productSelectionRef.current = range.cloneRange();
  };

  const execProductEditorCommand = (command: string, value?: string) => {
    if (!productDescriptionRef.current) return;

    productDescriptionRef.current.focus();

    // ensure formatBlock block exists
    document.execCommand("formatBlock", false, "p");

    if (productSelectionRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(productSelectionRef.current);
      }
    }

    if (command === "createLink") {
      const url = window.prompt("Enter URL", "https://");
      if (!url) return;
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand(command, false, value ?? null);
    }

    const html = productDescriptionRef.current.innerHTML;
    setEditingProduct({ ...editingProduct!, description: html });
  };

  const handleProductDescriptionInput = () => {
    if (!productDescriptionRef.current || !editingProduct) return;
    const html = productDescriptionRef.current.innerHTML;
    setEditingProduct({ ...editingProduct, description: html });
    saveProductEditorSelection();
  };

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      loadProducts();
      loadClients();
      loadCareers();
      loadPortfolios();
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

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      const data = await portfolioApi.getAll();
      setPortfolios(data);
    } catch (error) {
      console.error('Failed to load portfolios:', error);
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
      banner: "",
      mobileBanner: "",
      order: products.length + 1,
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
      
      // Clean up points and optional fields
      const cleanedPoints = (editingProduct.points || [])
        .map(p => p.trim())
        .filter(p => p !== "");

      const parsedOrder = typeof editingProduct.order === "number"
        ? editingProduct.order
        : editingProduct.order
        ? parseInt(String(editingProduct.order), 10)
        : 0;

      const productToSave = {
        ...editingProduct,
        points: cleanedPoints,
        buttonName: editingProduct.buttonName?.trim() || null,
        buttonUrl: editingProduct.buttonUrl?.trim() || null,
        banner: editingProduct.banner?.trim() || null,
        mobileBanner: editingProduct.mobileBanner?.trim() || null,
        order: isNaN(parsedOrder) ? 0 : parsedOrder,
      };

      if (editingProduct.id) {
        await productsApi.update(editingProduct.id, productToSave);
      } else {
        await productsApi.create(productToSave as any);
      }
      setEditingProduct(null);
      await loadProducts();
    } catch (error: any) {
      alert(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveProduct = async (product: Product, direction: "up" | "down") => {
    const sorted = sortProducts(products);
    const currentIndex = sorted.findIndex(p => p.id === product.id);
    if (currentIndex === -1) return;
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const targetProduct = sorted[targetIndex];
    const newOrderCurrent = targetIndex + 1;
    const newOrderTarget = currentIndex + 1;

    try {
      setLoading(true);
      await Promise.all([
        productsApi.update(product.id, { order: newOrderCurrent }),
        productsApi.update(targetProduct.id, { order: newOrderTarget }),
      ]);
      await loadProducts();
    } catch (err: any) {
      alert(err.message || "Failed to update product order");
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

  const handleDesktopBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      try {
        setLoading(true);
        const result = await uploadApi.uploadFile(file);
        setEditingProduct({ ...editingProduct, banner: result.url });
      } catch (error: any) {
        alert(error.message || 'Failed to upload desktop banner');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMobileBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      try {
        setLoading(true);
        const result = await uploadApi.uploadFile(file);
        setEditingProduct({ ...editingProduct, mobileBanner: result.url });
      } catch (error: any) {
        alert(error.message || 'Failed to upload mobile banner');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBannerUpload = handleDesktopBannerUpload;

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
        <div className="flex flex-col gap-4 mb-8 pb-6 border-b border-slate-100 w-full overflow-hidden">
          <div className="flex justify-between items-center w-full gap-4">
            <h1 className="text-2xl sm:text-3xl font-black text-secondary uppercase tracking-tight">
              Admin <span className="text-primary italic">Dashboard</span>
            </h1>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors font-bold uppercase text-xs sm:text-sm tracking-wider sm:tracking-widest shrink-0"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 w-full">
              <button 
                onClick={() => { setActiveTab("products"); setEditingProduct(null); setEditingClient(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shrink-0 ${activeTab === "products" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                <Package size={16} />
                PRODUCTS
              </button>
              <button 
                onClick={() => { setActiveTab("clients"); setEditingProduct(null); setEditingClient(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shrink-0 ${activeTab === "clients" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                <Users size={16} />
                CLIENTS
              </button>
              {/* <button 
                onClick={() => { setActiveTab("careers"); setEditingProduct(null); setEditingClient(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shrink-0 ${activeTab === "careers" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                <Briefcase size={16} />
                CAREERS
              </button> */}
              <button 
                onClick={() => { setActiveTab("portfolio"); setEditingProduct(null); setEditingClient(null); setEditingPortfolio(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shrink-0 ${activeTab === "portfolio" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                <Palette size={16} />
                PORTFOLIO
              </button>
              <button 
                onClick={() => { setActiveTab("categories"); setEditingProduct(null); setEditingClient(null); setEditingPortfolio(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "categories" ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                <ImageIcon size={16} />
                CATEGORIES
              </button>
            </div>
          </div>
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
        ) : activeTab === "portfolio" ? (
          <PortfolioAdmin />
        ) : activeTab === "categories" ? (
          <PortfolioCategoryAdmin />
        ) : (
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
            <div className={`lg:col-span-4 space-y-4 ${
              (activeTab === "products" && editingProduct) || (activeTab === "clients" && editingClient) 
                ? "hidden lg:block" 
                : "block"
            }`}>
              <button 
                onClick={activeTab === "products" ? handleAddProduct : handleAddClient}
                disabled={loading}
                className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2.5 hover:bg-slate-800 transition-all disabled:opacity-50 text-sm"
              >
                <Plus size={18} />
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
                {!loading && activeTab === "products" && sortProducts(products).map((p, index) => (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="min-w-0 flex items-center gap-3">
                      <span 
                        className="shrink-0 inline-flex items-center justify-center px-2 py-1 rounded-lg bg-primary/10 text-primary font-black text-xs border border-primary/20" 
                        title={`Menu Display Order: #${p.order && p.order > 0 ? p.order : index + 1}`}
                      >
                        #{p.order && p.order > 0 ? p.order : index + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-secondary truncate">{p.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">/{p.slug}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveProduct(p, "up")}
                        disabled={index === 0 || loading}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Move Up (Show earlier in menu)"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveProduct(p, "down")}
                        disabled={index === sortProducts(products).length - 1 || loading}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Move Down (Show later in menu)"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
                        title="Edit product"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(p.id);
                        }}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 bg-slate-50 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {!loading && activeTab === "clients" && clients.map((c) => (
                  <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                        {c.logo ? <img src={c.logo} className="w-full h-full object-contain" /> : <div className="text-slate-300">Logo</div>}
                      </div>
                      <div>
                        <div className="font-bold text-secondary">{c.name}</div>
                        
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingClient(c)} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all" title="Edit client">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDeleteClient(c.id)} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all" title="Delete client">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            <div className={`lg:col-span-8 ${
              (activeTab === "products" && !editingProduct) || (activeTab === "clients" && !editingClient) 
                ? "hidden lg:block" 
                : "block"
            }`}>
              {activeTab === "products" ? (
                editingProduct ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border-2 border-primary/10 rounded-xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setEditingProduct(null)} 
                          className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <h2 className="text-xl font-black text-secondary uppercase tracking-tight italic">Product Editor</h2>
                      </div>
                      <button onClick={handleSaveProduct} disabled={loading} className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 text-sm w-full sm:w-auto justify-center">
                        <Save size={16} /> {loading ? 'SAVING...' : 'SAVE CHANGES'}
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-6 text-secondary">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Product Name</label>
                        <input type="text" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">URL Slug</label>
                        <input type="text" value={editingProduct.slug || ''} onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Display Order</label>
                          <span className="text-[10px] text-primary font-bold">1 = 1st, 2 = 2nd...</span>
                        </div>
                        <input 
                          type="number" 
                          min="1" 
                          placeholder="e.g. 1" 
                          value={editingProduct.order ?? ''} 
                          onChange={(e) => setEditingProduct({ ...editingProduct, order: e.target.value ? parseInt(e.target.value, 10) : undefined })} 
                          className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1 mb-6 text-secondary">
                      <div className="flex flex-col gap-3">
                        <div>
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
                          <p className="text-[10px] sm:text-xs text-slate-500 mt-1">Use the toolbar to format the product description.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100 p-2">
                          <select
                            onMouseDown={saveProductEditorSelection}
                            onChange={(e) => execProductEditorCommand("fontSize", e.target.value)}
                            className="h-9 rounded-xl border border-slate-200 bg-white px-2.5 text-xs sm:text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("formatBlock", "<h1>")}
                            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                          >
                            H1
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("formatBlock", "<h2>")}
                            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                          >
                            H2
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("formatBlock", "<p>")}
                            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                          >
                            Normal
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("bold")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Bold"
                          >
                            <Bold size={15} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("italic")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Italic"
                          >
                            <Italic size={15} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("underline")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Underline"
                          >
                            <u className="text-base font-bold">U</u>
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("justifyLeft")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Align left"
                          >
                            <AlignLeft size={15} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("justifyCenter")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Align center"
                          >
                            <AlignCenter size={15} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("justifyRight")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Align right"
                          >
                            <AlignRight size={15} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("insertUnorderedList")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Bullet list"
                          >
                            <List size={15} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("insertOrderedList")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Numbered list"
                          >
                            <ListOrdered size={15} />
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); saveProductEditorSelection(); }}
                            onClick={() => execProductEditorCommand("createLink")}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 transition-all"
                            title="Insert link"
                          >
                            <Link2 size={15} />
                          </button>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 shadow-sm mt-2">
                        <div
                          ref={productDescriptionRef}
                          contentEditable
                          suppressContentEditableWarning
                          onInput={handleProductDescriptionInput}
                          onBlur={handleProductDescriptionInput}
                          onFocus={saveProductEditorSelection}
                          onMouseUp={saveProductEditorSelection}
                          onKeyUp={saveProductEditorSelection}
                          className="min-h-[160px] w-full px-4 py-3 text-sm bg-transparent outline-none whitespace-pre-wrap text-secondary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Feature Points</label>
                        <button onClick={addPointField} className="text-xs font-black text-primary uppercase tracking-widest hover:underline">+ Add Point</button>
                      </div>
                      {editingProduct.points?.map((point, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input type="text" value={point} onChange={(e) => updatePoint(idx, e.target.value)} className="flex-grow px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
                          <button onClick={() => setEditingProduct({ ...editingProduct, points: editingProduct.points?.filter((_, i) => i !== idx) })} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                    {/* Product Banners - Desktop & Mobile Views */}
                    <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                      <div>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                          Product Banners (Desktop & Mobile Views)
                        </label>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Upload separate banners for desktop/laptop screens and mobile devices for the best visual appearance.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Desktop View Banner */}
                        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-700">
                                <Monitor size={15} className="text-primary" /> Desktop View Banner
                              </span>
                              <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full border border-primary/20">
                                1920 × 600 px
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              Correct size: <strong className="text-slate-600">1920 × 600 px</strong> (or 1200 × 400 px, 16:9 widescreen format). Displayed on laptops and PCs.
                            </p>
                          </div>

                          <div className="w-full h-36 bg-white rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group">
                            {editingProduct.banner ? (
                              <>
                                <img src={editingProduct.banner} alt="Desktop Banner" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setEditingProduct({ ...editingProduct, banner: "" })}
                                  className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-md transition-all opacity-0 group-hover:opacity-100"
                                  title="Remove desktop banner"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            ) : (
                              <div className="text-center p-3">
                                <Monitor size={28} className="mx-auto text-slate-300 mb-1" />
                                <span className="text-[11px] text-slate-400 font-medium">No desktop banner uploaded</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleDesktopBannerUpload} 
                              className="hidden" 
                              id="desktop-banner-upload" 
                            />
                            <label 
                              htmlFor="desktop-banner-upload" 
                              className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 text-xs rounded-xl font-bold cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
                            >
                              <ImageIcon size={14} />
                              {editingProduct.banner ? "CHANGE DESKTOP BANNER" : "UPLOAD DESKTOP BANNER"}
                            </label>
                            {editingProduct.banner && (
                              <button
                                type="button"
                                onClick={() => setEditingProduct({ ...editingProduct, banner: "" })}
                                className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-all border border-red-200"
                              >
                                REMOVE
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Mobile View Banner */}
                        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-700">
                                <Smartphone size={15} className="text-primary" /> Mobile View Banner
                              </span>
                              <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full border border-primary/20">
                                750 × 500 px
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              Correct size: <strong className="text-slate-600">750 × 500 px</strong> (or 800 × 600 px, 4:3 or 16:10 mobile format). Displayed on mobile phones.
                            </p>
                          </div>

                          <div className="w-full h-36 bg-white rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group">
                            {editingProduct.mobileBanner ? (
                              <>
                                <img src={editingProduct.mobileBanner} alt="Mobile Banner" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setEditingProduct({ ...editingProduct, mobileBanner: "" })}
                                  className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-md transition-all opacity-0 group-hover:opacity-100"
                                  title="Remove mobile banner"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            ) : (
                              <div className="text-center p-3">
                                <Smartphone size={28} className="mx-auto text-slate-300 mb-1" />
                                <span className="text-[11px] text-slate-400 font-medium">No mobile banner uploaded</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleMobileBannerUpload} 
                              className="hidden" 
                              id="mobile-banner-upload" 
                            />
                            <label 
                              htmlFor="mobile-banner-upload" 
                              className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 text-xs rounded-xl font-bold cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
                            >
                              <ImageIcon size={14} />
                              {editingProduct.mobileBanner ? "CHANGE MOBILE BANNER" : "UPLOAD MOBILE BANNER"}
                            </label>
                            {editingProduct.mobileBanner && (
                              <button
                                type="button"
                                onClick={() => setEditingProduct({ ...editingProduct, mobileBanner: "" })}
                                className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-all border border-red-200"
                              >
                                REMOVE
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-6 pt-6 border-t border-slate-200">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Redirect Button (Optional)</label>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Button Name</label>
                        <input type="text" placeholder="e.g., Download Demo, Learn More" value={editingProduct.buttonName || ''} onChange={(e) => setEditingProduct({ ...editingProduct, buttonName: e.target.value })} className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Button URL</label>
                        <input type="url" placeholder="https://example.com" value={editingProduct.buttonUrl || ''} onChange={(e) => setEditingProduct({ ...editingProduct, buttonUrl: e.target.value })} className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="hidden lg:block h-full">
                    <Placeholder text="product" />
                  </div>
                )
              ) : (
                editingClient ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border-2 border-primary/10 rounded-xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setEditingClient(null)} 
                          className="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <h2 className="text-xl font-black text-secondary uppercase tracking-tight italic">Client Editor</h2>
                      </div>
                      <button onClick={handleSaveClient} disabled={loading} className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 text-sm w-full sm:w-auto justify-center">
                        <Save size={16} /> {loading ? 'SAVING...' : 'SAVE CHANGES'}
                      </button>
                    </div>
                    <div className="space-y-4 text-secondary">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Client Name</label>
                        <input type="text" value={editingClient.name || ''} onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })} className="w-full px-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-100 focus:outline-none text-secondary" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Client Logo</label>
                        <div className="flex items-center gap-6">
                          <div className="w-32 h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                            {editingClient.logo ? <img src={editingClient.logo} className="w-full h-full object-contain p-2" /> : <ImageIcon size={32} className="text-slate-200" />}
                          </div>
                          <div className="flex-grow">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="logo-upload" />
                            <label htmlFor="logo-upload" className="inline-block bg-slate-100 text-slate-600 px-4 py-2 text-sm rounded-xl font-bold cursor-pointer hover:bg-slate-200 transition-all">UPLOAD LOGO IMAGE</label>
                            <p className="mt-1 text-xs text-slate-400">Recommended: Square PNG with transparent background</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="hidden lg:block h-full">
                    <Placeholder text="client" />
                  </div>
                )
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
