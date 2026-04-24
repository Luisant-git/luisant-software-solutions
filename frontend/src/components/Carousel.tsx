/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Grow Your Business Online",
    subtitle: "Dedicated to Delivering Exceptional Technology",
    description: "We empower enterprises with cutting-edge software solutions that drive growth, efficiency, and market leadership in the digital era.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920",
    link: "/about",
    stats: { value: "100+", label: "Projects Done" }
  },
  {
    id: 2,
    title: "Ecommerce Solutions",
    subtitle: "Build Your Online Store",
    description: "Create powerful online stores with seamless payment integration, inventory management, and customer analytics to maximize your sales.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1920",
    link: "/about",
    stats: { value: "500+", label: "Stores Built" }
  },
  {
    id: 3,
    title: "ERP Systems",
    subtitle: "Streamline Your Operations",
    description: "Integrate all your business processes with our comprehensive ERP solutions for better efficiency and real-time insights.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920",
    link: "/about",
    stats: { value: "200+", label: "Implementations" }
  },
  {
    id: 4,
    title: "Custom Website Design",
    subtitle: "Professional Web Solutions",
    description: "Get a stunning, responsive website tailored to your business needs with modern design and optimal performance.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920",
    link: "/about",
    stats: { value: "300+", label: "Websites" }
  },
  {
    id: 5,
    title: "WhatsApp Integration",
    subtitle: "Connect with Your Customers",
    description: "Integrate WhatsApp Business API to automate customer communication, send notifications, and provide instant support.",
    image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?auto=format&fit=crop&q=80&w=1920",
    link: "/about",
    stats: { value: "1000+", label: "Integrations" }
  }
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setAutoPlay(false);
  };

  return (
    <section className="relative min-h-[auto] lg:min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Decor */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6 max-w-full">
                <span className="shrink-0 relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="break-words">{slides[current].subtitle}</span>
              </div>
              
              <h1 className="text-2xl xs:text-4xl sm:text-5xl lg:text-7xl font-bold text-secondary leading-[1.2] sm:leading-[1.1] mb-6 sm:mb-8 break-words text-balance">
                {slides[current].title}
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 max-w-xl leading-relaxed">
                {slides[current].description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Link to={slides[current].link} className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 text-sm sm:text-base">
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
          </AnimatePresence>

          {/* Visual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`visual-${current}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-slate-200 rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[4/3] sm:aspect-square lg:aspect-auto h-[300px] sm:h-[450px] lg:h-[600px] max-w-lg mx-auto lg:max-w-none">
                <img
                  src={slides[current].image}
                  className="w-full h-full object-cover"
                  alt={slides[current].title}
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
                    <div className="text-2xl font-bold text-secondary">{slides[current].stats.value}</div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">{slides[current].stats.label}</div>
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
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all border border-white/20"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all border border-white/20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full border border-slate-300 ${
              index === current
                ? "bg-secondary w-8 h-3 sm:w-10 sm:h-3"
                : "bg-slate-300 w-3 h-3 hover:bg-slate-400"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20 text-secondary font-bold text-sm sm:text-base bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
        {current + 1} / {slides.length}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute top-8 right-8 z-20 bg-slate-100 hover:bg-slate-200 text-secondary px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border border-slate-200"
      >
        {autoPlay ? "⏸ Pause" : "▶ Play"}
      </button>
    </section>
  );
}
