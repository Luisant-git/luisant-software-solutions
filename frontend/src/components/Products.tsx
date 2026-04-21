/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CheckCircle2, Monitor, Database } from "lucide-react";

export default function Products() {
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
              {[
                {
                  icon: Monitor,
                  title: "Billing Software",
                  desc: "Comprehensive solution for sales, inventory, and accounting."
                },
                {
                  icon: Database,
                  title: "MicroFin Manager",
                  desc: "Specialized tool for microfinance institutions to manage loans and audits."
                }
              ].map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6 p-6 rounded-xl bg-white border border-slate-100 items-start group shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-primary rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center text-white transition-transform">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="mt-12 bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95">
              View All Products
            </button>
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
