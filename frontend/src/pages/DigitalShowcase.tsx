/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  ChevronRight, 
  Layout, 
  ExternalLink,
  Target,
  Shield,
  Eye,
  Network,
  Search as SearchIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import PromoBar from "../components/PromoBar";
import digitalShowcaseImg from "../images/digitalshowcase.png";

const BENEFITS = [
  { 
    title: "Visual Representation", 
    desc: "Showcasing your work visually is far more impactful than simply describing it.",
    icon: <Eye size={20} />
  },
  { 
    title: "Credibility", 
    desc: "A well-designed portfolio can enhance your professional image and establish credibility.",
    icon: <Shield size={20} />
  },
  { 
    title: "Accessibility", 
    desc: "It’s easily accessible from anywhere in the world, making it convenient for potential clients.",
    icon: <Target size={20} />
  },
  { 
    title: "Networking", 
    desc: "It can help you connect with like-minded professionals and expand your network.",
    icon: <Network size={20} />
  },
  { 
    title: "SEO Benefits", 
    desc: "A well-optimized portfolio can improve your search engine rankings, making it easier for people to find you.",
    icon: <SearchIcon size={20} />
  }
];

export default function DigitalShowcase() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="w-full bg-white">
        <img 
          src={digitalShowcaseImg} 
          alt="Digital Showcase" 
          className="w-full h-auto object-cover"
        />
      </section>

      {/* CTA Strip
      <PromoBar /> */}

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-secondary mb-3 tracking-tighter uppercase">
              DIGITAL <span className="text-primary italic">SHOWCASE</span>
            </h2>
            <div className="w-20 h-1.5 bg-primary/20 mx-auto rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
               <div className="prose prose-slate prose-lg max-w-none">
                  <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
                    An <span className="font-bold text-secondary">online portfolio</span> is a digital platform that showcases your work, skills, and experiences. It’s a virtual resume that can be easily shared with potential clients, employers, or collaborators. For businesses, it serves as a powerful marketing tool to attract new clients and demonstrate expertise.
                  </p>

                  <h3 className="text-xl md:text-2xl font-black text-secondary mb-8 uppercase tracking-tight flex items-center gap-3">
                    <div className="w-8 md:w-10 h-1 bg-primary" />
                    Benefits of an Online Portfolio
                  </h3>

                  <div className="space-y-4 md:space-y-6">
                    {BENEFITS.map((benefit, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 md:p-6 bg-white rounded-xl border border-slate-100 group shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                      >
                         <div className="shrink-0 p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                            {benefit.icon}
                         </div>
                         <div>
                            <h4 className="text-lg font-bold text-primary mb-1">{benefit.title}</h4>
                            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">{benefit.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="bg-slate-50 p-6 sm:p-8 md:p-12 rounded-xl border border-slate-100 shadow-inner lg:sticky lg:top-24">
                 <div className="text-center mb-8 md:mb-10">
                   <h3 className="text-2xl lg:text-3xl font-black text-[#1C77C3] leading-tight mb-2">Book a Free Demo</h3>
                   <div className="text-primary font-bold italic mb-6">Online / Offline Available</div>
                   <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
                 </div>

                 <AppointmentForm defaultService="Digital Showcase" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
