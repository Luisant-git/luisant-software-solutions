import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Product, getProductBySlug } from "../lib/productService";
import AppointmentForm from "../components/AppointmentForm";
import PromoBar from "../components/PromoBar";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (slug) {
        const data = await getProductBySlug(slug);
        setProduct(data || null);
      }
    };
    loadProduct();
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
      <PromoBar />

      {/* Product Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 w-full min-w-0">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="w-full"
               >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary mb-6 sm:mb-8 uppercase tracking-tighter break-words">
                    {product.name}
                  </h1>
                  
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
                  </div>
               </motion.div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="bg-slate-50 p-6 sm:p-8 md:p-12 rounded-xl border border-slate-100 shadow-inner lg:sticky lg:top-24 w-full">
                 <div className="text-center mb-8 sm:mb-10">
                   <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-secondary leading-tight mb-2">Book a Free Demo</h3>
                   <div className="text-primary font-bold italic mb-4 sm:mb-6 text-sm sm:text-base">Online / Offline Demo</div>
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
