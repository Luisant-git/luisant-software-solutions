/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const STATS = [
  { label: "Years of Experience", value: "13+", color: "text-primary" },
  { label: "Projects Done", value: "100+", color: "text-emerald-600" },
  { label: "Total Products", value: "10+", color: "text-amber-600" },
  { label: "Clients Over All India", value: "1200+", color: "text-indigo-600" },
];

export default function Stats() {
  return (
    <section className="bg-white py-12 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className={`text-4xl sm:text-5xl lg:text-7xl font-bold ${stat.color} mb-2 sm:mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500`}>
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
