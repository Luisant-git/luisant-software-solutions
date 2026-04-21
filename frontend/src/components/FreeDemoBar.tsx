import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface FreeDemoBarProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
}

export default function FreeDemoBar({ 
  title = "Contact Us for a Free Demo", 
  subtitle = "25% OFF FOR ALL SERVICES",
  buttonText = "MAKE AN APPOINTMENT",
  className = ""
}: FreeDemoBarProps) {
  return (
    <section className={`relative overflow-hidden bg-[#F6C644] py-7 ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(0,0,0,0.15) 1px, transparent 0)', backgroundSize: '12px 12px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary tracking-tight leading-tight uppercase mb-0.5"
            >
              {title}
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 justify-center md:justify-start"
            >
              <div className="hidden sm:block h-[1.5px] w-6 bg-secondary/20" />
              <p className="text-[9px] md:text-[10px] font-bold text-secondary/60 uppercase tracking-[0.25em]">{subtitle}</p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/appointment"
              className="group bg-[#1C77C3] text-white px-6 py-3.5 rounded-xl font-bold text-[10px] tracking-[0.15em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase whitespace-nowrap"
            >
              {buttonText}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
