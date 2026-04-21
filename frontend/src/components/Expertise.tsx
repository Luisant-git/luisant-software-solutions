/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const SKILLS = [
  { name: "POS Billing App", percent: 90, color: "text-primary", stroke: "stroke-primary" },
  { name: "Finance Software", percent: 80, color: "text-emerald-500", stroke: "stroke-emerald-500" },
  { name: "Ecommerce Apps", percent: 90, color: "text-indigo-500", stroke: "stroke-indigo-500" },
];

export default function Expertise() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Our Expertise</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-6 sm:mb-8">We Are Expert In</h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              Web App, System App and Mobile App Development that works for your company to reach the top in the market place. We have established skilled resources and capability.
            </p>
            
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:translate-x-2 transition-all group">
              EXPLORE IT <div className="w-8 h-[2px] bg-white group-hover:w-12 transition-all" />
            </button>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILLS.map((skill, index) => (
              <div key={skill.name} className="flex flex-col items-center group">
                <div className="relative w-40 h-40 mb-6 transition-transform group-hover:scale-110 duration-500">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-100"
                    />
                    <motion.circle
                      initial={{ strokeDashoffset: 440 }}
                      whileInView={{ strokeDashoffset: 440 - (440 * skill.percent) / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="440"
                      fill="transparent"
                      strokeLinecap="round"
                      className={skill.stroke}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-black ${skill.color}`}>{skill.percent}%</span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center whitespace-nowrap">
                  {skill.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
