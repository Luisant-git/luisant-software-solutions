import { motion } from "motion/react";
import { Send, Upload, Heart, Coffee, Truck, Briefcase, GraduationCap, Headphones, Share2 } from "lucide-react";
import { useState } from "react";

export default function Career() {
  const openings = [
    {
      title: "Full Stack Development",
      tags: "React.js, Node.js, MySQL and PostgreSQL",
      level: "Fresher / Internship",
      icon: <GraduationCap size={24} className="text-primary" />
    },
    {
      title: "Telecalling",
      tags: "English / Tamil / Hindi",
      level: "Experienced Only",
      icon: <Headphones size={24} className="text-primary" />
    },
    {
      title: "Digital Marketing Interns",
      tags: "Social Media, SEO, Content",
      level: "Internship",
      icon: <Share2 size={24} className="text-primary" />
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-secondary tracking-tight uppercase inline-block relative">
            CAREERS
            <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-primary/20 rounded-full" />
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Form */}
          <div className="lg:col-span-7 h-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 md:p-10 border border-slate-100 h-full flex flex-col"
            >
              <h2 className="text-xl font-bold text-secondary mb-8 flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Briefcase size={18} />
                </div>
                Quick Application
              </h2>

              <form className="space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Name *</label>
                      <input 
                        type="text" 
                        placeholder="Your name"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mobile *</label>
                      <input 
                        type="tel" 
                        placeholder="Your number"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email *</label>
                      <input 
                        type="email" 
                        placeholder="Your email"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">City</label>
                      <input 
                        type="text" 
                        placeholder="Your city"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 mt-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Skills</label>
                    <textarea 
                      rows={3}
                      placeholder="E.g. React, Node, UI/UX"
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                    />
                  </div>

                  <div className="space-y-1.5 mt-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Resume (PDF/DOCX)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        className="hidden" 
                        id="resume-upload" 
                        accept=".pdf,.doc,.docx"
                      />
                      <label 
                        htmlFor="resume-upload"
                        className="flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 cursor-pointer hover:border-primary/40 hover:bg-white transition-all group"
                      >
                        <Upload size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                        <span className="text-slate-400 font-medium group-hover:text-secondary text-sm">Choose File</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#1C77C3] text-white py-4 rounded-xl font-black text-xs tracking-widest shadow-xl shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-6 uppercase"
                >
                  <Send size={16} />
                  SUBMIT APPLICATION
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Side: Info & Openings */}
          <div className="lg:col-span-5 h-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 md:p-10 rounded-xl border border-slate-100 h-full flex flex-col"
            >
              <p className="text-md text-slate-500 leading-relaxed font-medium mb-8 italic">
                "We are seeking creative and dynamic individuals to join our team and contribute to our global mission."
              </p>

              <div className="relative flex-grow">
                <h3 className="text-xl font-black text-[#2e5a27] mb-6 uppercase tracking-widest text-center">
                  CURRENT OPENINGS
                </h3>

                <div className="space-y-3">
                  {openings.map((job, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-xl border border-slate-100 bg-white shadow-md hover:shadow-lg transition-all group"
                    >
                      <div className="flex gap-3">
                        <div className="shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/10 text-white">
                          <job.icon.type {...job.icon.props} size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="text-md font-bold text-secondary mb-0.5">{job.title}</h4>
                          <p className="text-[11px] font-medium text-slate-400 mb-1.5">{job.tags}</p>
                          <div className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">
                            {job.level}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
