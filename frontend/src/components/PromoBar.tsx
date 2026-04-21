/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, PhoneCall, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBar() {
  return (
    <section className="bg-secondary py-8 relative overflow-hidden">
      {/* Texture Overlays */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white border border-primary/20 shadow-lg shadow-primary/20">
            <Zap size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Contact for a Free Demo</h3>
            <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
              <span className="text-primary">25% OFF</span> Limited Time Offer for All Services
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/appointment" className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 group">
            <Calendar size={18} className="group-hover:rotate-12 transition-transform" /> 
            MAKE AN APPOINTMENT
          </Link>
          
          <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all active:scale-95 border border-white/10">
            <PhoneCall size={18} />
            +91 427 405 6538
          </button>
        </div>
      </div>
    </section>
  );
}
