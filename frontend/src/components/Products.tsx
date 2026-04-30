/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Monitor, Database, ShoppingCart, Globe, Smartphone, Zap, BarChart3, LayoutDashboard, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { productsApi, Product } from "../lib/productsApi";
import { Link } from "react-router-dom";

const ICON_MAP: { [key: string]: any } = {
  "billing": Monitor,
  "microfin": Database,
  "ecommerce": ShoppingCart,
  "website": Globe,
  "mobile": Smartphone,
  "showcase": Zap,
  "analytics": BarChart3,
  "erp": LayoutDashboard,
  "whatsapp": MessageCircle
};

const getIconForProduct = (productName: string) => {
  const lowerName = productName.toLowerCase();
  for (const [key, icon] of Object.entries(ICON_MAP)) {
    if (lowerName.includes(key)) {
      return icon;
    }
  }
  return Monitor;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getPublic();
        setProducts(data.slice(0, 2));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Innovation</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-6 sm:mb-8">Our Flagship Products</h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              We develop robust, scalable products designed to streamline business operations and maximize profitability.
            </p>

            <div className="space-y-6">
              {loading ? (
                <div className="text-slate-400">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="text-slate-400">No products available</div>
              ) : (
                products.map((product, i) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-6 p-6 rounded-xl bg-white border border-slate-100 items-start group shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center text-white transition-transform flex-shrink-0">
                      {(() => {
                        const IconComponent = getIconForProduct(product.name);
                        return <IconComponent size={24} />;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-secondary mb-1 truncate">{product.name}</h4>
                      <p className="text-slate-500 text-sm font-medium line-clamp-2">{product.description}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <Link to="/our-products" className="mt-12 bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95 inline-block">
              View All Products
            </Link>
          </div>

          {/* Visuals */}
          <div className="lg:w-1/2 relative w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -10 }}
                className="pt-12"
              >
                <div className="bg-white rounded-2xl p-4 aspect-[4/5] overflow-hidden shadow-2xl shadow-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover rounded-xl"
                    alt="Billing Software Statistics"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -10 }}>
                <div className="bg-white rounded-2xl p-4 aspect-[4/5] overflow-hidden shadow-2xl shadow-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover rounded-xl"
                    alt="Microfin Manager Financial Data"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Decors */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-slate-100 rounded-full blur-3xl -z-10 opacity-60" />
            <div className="absolute top-0 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
