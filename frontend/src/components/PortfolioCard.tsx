/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Portfolio } from "../lib/portfolioApi";

interface PortfolioCardProps {
  portfolio: Portfolio;
  index: number;
}

export default function PortfolioCard({ portfolio, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-64 sm:h-72 bg-slate-100">
        <img
          src={portfolio.image}
          alt={portfolio.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {/* Category Badge */}
        <div className="inline-block mb-4">
          <span className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-widest">
            {portfolio.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-3 line-clamp-2">
          {portfolio.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
          {portfolio.description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {portfolio.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg"
              >
                {tech}
              </span>
            ))}
            {portfolio.technologies.length > 3 && (
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                +{portfolio.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Client Name */}
        {portfolio.clientName && (
          <p className="text-xs text-slate-500 font-semibold mb-4 uppercase tracking-wider">
            Client: <span className="text-slate-700">{portfolio.clientName}</span>
          </p>
        )}

        {/* View Details Button */}
        <Link
          to={`/portfolio/${portfolio.slug}`}
          className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all group/btn"
        >
          View Case Study
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
