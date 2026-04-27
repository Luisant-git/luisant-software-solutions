import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { productsApi, Product } from "../lib/productsApi";
import PromoBar from "../components/PromoBar";

export default function OurProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getPublic();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <p className="text-slate-600 mt-4">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <h2 className="text-3xl font-bold text-secondary mb-4">No Products Available</h2>
        <p className="text-slate-500 mb-8">Products will be available soon.</p>
        <Link to="/" className="text-primary font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* CTA Strip */}
      <PromoBar />

      {/* Products List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-slate-100 pb-12 last:border-b-0 last:pb-0"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7 w-full min-w-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full"
                  >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary mb-6 sm:mb-8 uppercase tracking-tighter break-words">
                      {product.name}
                    </h2>
                    
                    <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-medium break-words">
                      {product.description}
                    </p>

                    <div className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-100 shadow-lg w-full overflow-hidden">
                      <h3 className="text-lg sm:text-xl font-black text-secondary mb-6 sm:mb-8 uppercase tracking-widest flex items-center gap-3 flex-wrap pr-4">
                        <div className="w-10 h-1 bg-primary shrink-0" />
                        <span className="break-words">Key Features</span>
                      </h3>
                      
                      <ul className="space-y-4 sm:space-y-6 list-none p-0 pr-4">
                        {product.points.map((point, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-3 sm:gap-4 w-full min-w-0"
                          >
                            <div className="shrink-0 w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white mt-1 shadow-lg shadow-primary/20 flex-shrink-0">
                              <span className="text-xs font-bold font-serif">•</span>
                            </div>
                            <span className="text-base sm:text-lg text-slate-700 font-bold leading-relaxed break-words w-full">{point}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
                        <Link 
                          to={`/product/${product.slug}`}
                          className="inline-flex items-center gap-2 bg-slate-200 text-slate-800 px-8 py-3 rounded-full font-bold hover:bg-slate-300 transition-all active:scale-95 shadow-lg shadow-slate-200/20"
                        >
                          View Details
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </Link>
                        {product.buttonName && product.buttonUrl && (
                          <a
                            href={product.buttonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                          >
                            {product.buttonName}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="lg:col-span-5 w-full">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8 rounded-xl border border-primary/20 shadow-lg w-full">
                    <h3 className="text-xl sm:text-2xl font-black text-secondary mb-4">Ready to Get Started?</h3>
                    <p className="text-slate-600 mb-6">
                      Book a free demo to see how {product.name} can transform your business.
                    </p>
                    <Link 
                      to={`/customer-enquiry-form?service=${encodeURIComponent(product.name)}`}
                      className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                      Book Free Demo
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


    </div>
  );
}
