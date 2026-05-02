/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { portfolioApi, Portfolio } from "../lib/portfolioApi";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        if (slug) {
          const data = await portfolioApi.getBySlug(slug);
          setPortfolio(data);
        }
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <p className="text-slate-600 mt-4">Loading portfolio...</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <h2 className="text-3xl font-bold text-secondary mb-4">
          Portfolio Not Found
        </h2>
        <p className="text-slate-500 mb-8">
          The portfolio you're looking for doesn't exist.
        </p>
        <Link to="/portfolio" className="text-primary font-bold hover:underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden bg-slate-100">
        <img
          src={portfolio.image}
          alt={portfolio.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block text-xs font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                {portfolio.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {portfolio.title}
              </h1>
              {portfolio.clientName && (
                <p className="text-lg text-slate-200">
                  Client: <span className="font-semibold">{portfolio.clientName}</span>
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">
                  Project Overview
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {portfolio.description}
                </p>
              </motion.div>

              {/* Case Study */}
              {portfolio.caseStudy && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">
                    Case Study
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {portfolio.caseStudy}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Features */}
              {portfolio.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">
                    Key Features
                  </h2>
                  <ul className="space-y-4">
                    {portfolio.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white mt-1 shrink-0">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-slate-600 text-lg leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Results */}
              {portfolio.results && portfolio.results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">
                    Results & Outcomes
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {portfolio.results.map((result, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition-opacity" />
                        <div className="relative bg-white p-6 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all shadow-lg hover:shadow-xl">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg">
                              {i + 1}
                            </div>
                            <p className="text-slate-700 text-base leading-relaxed font-medium pt-1">
                              {result}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Gallery */}
              {portfolio.images && portfolio.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">
                    Project Gallery
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {portfolio.images.map((image, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-xl overflow-hidden shadow-lg"
                      >
                        <img
                          src={image}
                          alt={`${portfolio.title} - Image ${i + 1}`}
                          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 mb-8 sticky top-24"
              >
                <h3 className="text-lg font-bold text-secondary mb-6">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Live Link */}
                {portfolio.link && (
                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <a
                      href={portfolio.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group"
                    >
                      Visit Live Project
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <Link
                    to="/customer-enquiry-form"
                    className="block w-full bg-primary text-white py-3 rounded-lg font-bold text-center hover:bg-opacity-90 transition-all active:scale-95"
                  >
                    Start Similar Project
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
