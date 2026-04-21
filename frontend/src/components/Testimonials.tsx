/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const TESTIMONIALS = [
  {
    heading: "Positive Feedback on eCommerce Solution",
    text: "I am writing to express my sincere gratitude for your prompt service. We greatly appreciate your Ecommerce solution and the valuable assistance it has provided",
    author: "Mr. Karthick Lakshmanan",
    location: "Coimbatore",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=George&bgShape=circle&backgroundColor=b6e3f4"
  },
  {
    heading: "Giving an Excellent Support for Supermarket Billing Software",
    text: "I acquired a high-quality supermarket billing software from the provider. They have offered exceptional support throughout the implementation process.",
    author: "Mr. Balaji",
    location: "Tamil Nadu",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=James&bgShape=circle&backgroundColor=c0aede"
  },
  {
    heading: "Excellent Service",
    text: "I am highly satisfied with the service and promptness in addressing my requirements. Your team has demonstrated a clear understanding of my needs and provided genuine, valuable suggestions.",
    author: "Mr. Soundarrajan",
    location: "Chennai",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Robert&bgShape=circle&backgroundColor=d1d4f9"
  },
  {
    heading: "Website Development Feedback",
    text: "I recently approached Luisant Software Solutions to develop a website. They have designed it very well and have been highly supportive throughout the process. I am pleased with their services.",
    author: "Mrs. Ramya",
    location: "Salem",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Avery&bgShape=circle&backgroundColor=ffd5dc"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section 
      className="py-16 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Aligned with other sections */}
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Testimonials</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-4">What Our Partners Say</h3>
        </div>

        <div className="relative group/carousel">
          {/* Controls */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-20 p-3 bg-white rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-primary hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-20 p-3 bg-white rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-primary hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carousel - Reduced height */}
          <div className="min-h-[380px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                className="w-full text-center max-w-4xl mx-auto bg-slate-50/50 p-8 md:p-10 rounded-2xl border border-slate-100 relative shadow-sm"
              >
                {/* Background Quote - Slightly smaller */}
                <span className="absolute top-4 sm:top-6 left-6 sm:left-10 text-[80px] sm:text-[140px] text-slate-200/40 font-serif leading-none select-none pointer-events-none">"</span>
                
                <div className="relative z-10">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 px-4">
                    {TESTIMONIALS[current].heading}
                  </h4>
                  
                  <div className="flex justify-center items-center mb-6 sm:mb-8">
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl font-medium px-2">
                      {TESTIMONIALS[current].text}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <motion.div 
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative mb-4"
                    >
                      <div className="w-20 h-20 bg-white rounded-full p-1.5 shadow-xl border border-slate-200 overflow-hidden">
                        <motion.img 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          src={TESTIMONIALS[current].avatar}
                          className="w-full h-full object-cover rounded-full"
                          alt={TESTIMONIALS[current].author}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white border-[3px] border-white shadow-md">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    </motion.div>
                    <h5 className="text-xl font-bold text-primary">{TESTIMONIALS[current].author}</h5>
                    <span className="text-slate-400 font-bold tracking-widest uppercase text-[10px] mt-1">{TESTIMONIALS[current].location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators - Reduced top margin */}
          <div className="flex justify-center gap-4 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`group relative py-2 focus:outline-none`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <div className={`h-2 rounded-full transition-all duration-500 ${
                  i === current ? "bg-primary w-12" : "bg-slate-200 w-3 hover:bg-slate-300"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
