import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Product, getProductBySlug } from "../lib/productService";
import AppointmentForm from "../components/AppointmentForm";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) {
      const data = getProductBySlug(slug);
      setProduct(data || null);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <h2 className="text-3xl font-bold text-secondary mb-4">Product Not Found</h2>
        <p className="text-slate-500 mb-8">The requested product does not exist or has been removed.</p>
        <Link to="/" className="text-primary font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* CTA Strip */}
      <section className="py-10 bg-[#F6C644] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-1 uppercase">CONTACT FOR A FREE DEMO</h3>
            <p className="text-sm font-bold text-secondary/60 uppercase tracking-widest">25% OFF FOR ALL SERVICES</p>
          </div>
          <Link 
            to="/appointment" 
            className="bg-[#1C77C3] text-white px-10 py-5 rounded-xl font-black text-sm tracking-widest flex items-center gap-3 hover:bg-opacity-90 transition-all active:scale-95 shadow-xl shadow-black/10 group"
          >
            MAKE AN APPOINTMENT 
            <div className="w-10 h-0.5 bg-white scale-x-75 group-hover:scale-x-100 transition-transform origin-right" />
          </Link>
        </div>
      </section>

      {/* Product Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="prose prose-slate prose-lg max-w-none"
               >
                  <h1 className="text-4xl font-black text-secondary mb-8 uppercase tracking-tighter">
                    {product.name}
                  </h1>
                  
                  <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                    {product.description}
                  </p>

                  <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 shadow-lg">
                    <h3 className="text-xl font-black text-secondary mb-8 uppercase tracking-widest flex items-center gap-3">
                      <div className="w-10 h-1 bg-primary" />
                      Key Features
                    </h3>
                    
                    <ul className="space-y-6 list-none p-0">
                      {product.points.map((point, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-4"
                        >
                          <div className="shrink-0 w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white mt-1 shadow-lg shadow-primary/20">
                            <span className="text-xs font-bold font-serif">•</span>
                          </div>
                          <span className="text-lg text-slate-700 font-bold leading-relaxed">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
               </motion.div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-50 p-8 md:p-12 rounded-xl border border-slate-100 shadow-inner lg:sticky lg:top-24">
                 <div className="text-center mb-10">
                   <h3 className="text-2xl lg:text-3xl font-black text-secondary leading-tight mb-2">Book a Free Demo</h3>
                   <div className="text-primary font-bold italic mb-6">Online / Offline Demo</div>
                   <div className="w-32 h-1 bg-primary/20 mx-auto rounded-full" />
                 </div>

                 <AppointmentForm defaultService={product.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
