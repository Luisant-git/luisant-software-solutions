/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, PhoneCall, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBar() {
  return (
    <section className="bg-secondary py-5 sm:py-8 relative overflow-hidden">
      {/* Texture Overlays */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 md:gap-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 text-center md:text-left">
          <div className="w-11 h-11 sm:w-14 sm:h-14 bg-primary rounded-xl flex items-center justify-center text-white border border-primary/20 shadow-lg shadow-primary/20 shrink-0">
            <Zap size={22} className="sm:w-7 sm:h-7" />
          </div>
          <div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">Contact for a Free Demo</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1.5 mt-0.5">
              <span className="text-primary font-bold">25% OFF</span> Limited Time Offer for All Services
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full md:w-auto">
          <Link 
            to="/customer-enquiry-form" 
            className="bg-primary text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 group w-full sm:w-auto"
          >
            <Calendar size={16} className="group-hover:rotate-12 transition-transform" /> 
            MAKE AN APPOINTMENT
          </Link>
          
          <a 
            href="tel:+919080356538"
            className="bg-white/10 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-95 border border-white/10 w-full sm:w-auto"
          >
            <PhoneCall size={16} />
            +91 90803 56538
          </a>
        </div>
      </div>
    </section>
  );
}
