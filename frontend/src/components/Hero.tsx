/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-[auto] lg:min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6 max-w-full">
              <span className="shrink-0 relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="break-words">Dedicated to Delivering Exceptional Technology</span>
            </div>
            
            <h1 className="text-2xl xs:text-4xl sm:text-5xl lg:text-7xl font-bold text-secondary leading-[1.2] sm:leading-[1.1] mb-6 sm:mb-8 break-words text-balance">
              Grow Your 
              <span className="text-primary italic"> Business</span> Online
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 max-w-xl leading-relaxed">
              We empower enterprises with cutting-edge software solutions that drive growth, efficiency, and market leadership in the digital era.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link to="/about" className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 text-sm sm:text-base">
                READ MORE <ArrowRight size={20} />
              </Link>
              
              <button className="flex items-center gap-3 text-secondary font-bold hover:text-primary transition-colors group text-sm sm:text-base">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all group-hover:text-white">
                  <Play size={16} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />
                </div>
                How we work
              </button>
            </div>

            <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 grayscale opacity-50">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    alt="Trusted User"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">Joined by 1200+ global clients</p>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-slate-200 rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[4/3] sm:aspect-square lg:aspect-auto h-[300px] sm:h-[450px] lg:h-[600px] max-w-lg mx-auto lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920"
                className="w-full h-full object-cover"
                alt="Luisant Software Solutions Team"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/20 to-transparent" />
            </div>
            
            {/* Stats Card Overlay */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ArrowRight size={24} className="-rotate-45" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">100+</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Projects Done</div>
                </div>
              </div>
            </motion.div>

            {/* Achievement Overlay */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-secondary text-white p-6 rounded-xl shadow-xl hidden sm:block"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">13+</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
