/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { portfolioApi, Portfolio } from "../lib/portfolioApi";
import PromoBar from "../components/PromoBar";
import PortfolioCard from "../components/PortfolioCard";
import CategoryFilter from "../components/CategoryFilter";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        setLoading(true);
        const data = await portfolioApi.getPublic();
        setPortfolios(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((p: Portfolio) => p.category))
        ) as string[];
        setCategories(uniqueCategories.sort());

        // Set initial filtered portfolios
        setFilteredPortfolios(data);
      } catch (error) {
        console.error("Failed to load portfolios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolios();
  }, []);

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    if (category === "All") {
      setFilteredPortfolios(portfolios);
    } else {
      setFilteredPortfolios(
        portfolios.filter((p) => p.category === category)
      );
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <p className="text-slate-600 mt-4">Loading portfolios...</p>
      </div>
    );
  }

  if (portfolios.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <h2 className="text-3xl font-bold text-secondary mb-4">
          No Portfolios Available
        </h2>
        <p className="text-slate-500 mb-8">Portfolios will be available soon.</p>
        <Link to="/" className="text-primary font-bold hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* CTA Strip */}
      <PromoBar />

      {/* Header Section */}
      <section className="py-8 lg:py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-4">
              Our Portfolio
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Showcase of our successful projects and innovative solutions delivered to clients worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="pt-6 pb-10 lg:pt-8 lg:pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Portfolio Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPortfolios.length > 0 ? (
              filteredPortfolios.map((portfolio, index) => (
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-slate-500 text-lg">
                  No portfolios found in this category.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <p className="text-slate-600 font-medium">
              Showing {filteredPortfolios.length} of {portfolios.length} projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your business goals with our proven expertise
            </p>
            <Link
              to="/customer-enquiry-form"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
