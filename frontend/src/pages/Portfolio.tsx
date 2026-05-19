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
        
        // Sanitize each portfolio's description
        const sanitizedData = data.map(portfolio => ({
          ...portfolio,
          description: sanitizeHtml(portfolio.description || "")
        }));
        
        setPortfolios(sanitizedData);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(sanitizedData.map((p: Portfolio) => p.category))
        ) as string[];
        setCategories(uniqueCategories.sort());

        // Set initial filtered portfolios
        setFilteredPortfolios(sanitizedData);
      } catch (error) {
        console.error("Failed to load portfolios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolios();
  }, []);

  // Comprehensive HTML sanitization function
  const sanitizeHtml = (html: string): string => {
    if (!html) return "";
    
    let cleaned = html;
    
    // Remove empty paragraphs
    cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');
    cleaned = cleaned.replace(/<p><br\s*\/?><\/p>/g, '');
    cleaned = cleaned.replace(/<p><\/p>/g, '');
    
    // Fix deeply nested p tags - recursive cleanup
    const fixDeepNesting = (str: string): string => {
      let changed = true;
      let result = str;
      let maxIterations = 10;
      let iterations = 0;
      
      while (changed && iterations < maxIterations) {
        changed = false;
        iterations++;
        
        // Remove p tags that are directly inside other p tags
        const newResult = result.replace(/<p>([^<]*<p>.*?<\/p>[^<]*)<\/p>/gs, (match, content) => {
          changed = true;
          return content;
        });
        
        result = newResult;
      }
      
      return result;
    };
    
    cleaned = fixDeepNesting(cleaned);
    
    // Remove p tags that wrap other block elements
    cleaned = cleaned.replace(/<p>\s*(<div>|<ul>|<ol>|<h[1-6]>|<table>|觅食|循改)/gi, '$1');
    cleaned = cleaned.replace(/(<\/div>|<\/ul>|<\/ol>|<\/h[1-6]>|<\/table>|<\/blockquote>)\s*<\/p>/gi, '$1');
    
    // Fix malformed lists
    cleaned = cleaned.replace(/<p><ol>/g, '<ol>');
    cleaned = cleaned.replace(/<\/ol><\/p>/g, '</ol>');
    cleaned = cleaned.replace(/<p><ul>/g, '<ul>');
    cleaned = cleaned.replace(/<\/ul><\/p>/g, '</ul>');
    cleaned = cleaned.replace(/<p><li>/g, '<li>');
    cleaned = cleaned.replace(/<\/li><\/p>/g, '</li>');
    
    // Fix headings
    cleaned = cleaned.replace(/<p><h([1-6])>/g, '<h$1>');
    cleaned = cleaned.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
    
    // Fix font tags to spans with styles
    cleaned = cleaned.replace(/<font size="([1-7])">/g, (match, size) => {
      const sizeMap: Record<string, string> = {
        '1': '12px',
        '2': '13px',
        '3': '16px',
        '4': '18px',
        '5': '20px',
        '6': '24px',
        '7': '28px'
      };
      return `<span style="font-size: ${sizeMap[size] || '16px'};">`;
    });
    cleaned = cleaned.replace(/<\/font>/g, '</span>');
    
    // Clean up any remaining nested structures
    cleaned = cleaned.replace(/<p><p>/g, '<p>');
    cleaned = cleaned.replace(/<\/p><\/p>/g, '</p>');
    
    // Remove any remaining empty elements
    cleaned = cleaned.replace(/<[^>]+><\/[^>]+>/g, '');
    
    // Trim whitespace
    cleaned = cleaned.trim();
    
    return cleaned;
  };

  // Function to get plain text preview (for card descriptions)
  const getPlainTextPreview = (html: string, maxLength: number = 120): string => {
    if (!html) return "";
    
    // Create a temporary div to strip HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    
    // Clean up whitespace
    const cleaned = text.replace(/\s+/g, ' ').trim();
    
    // Truncate
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength) + "...";
  };

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
                  portfolio={{
                    ...portfolio,
                    // Pass plain text preview for card description
                    descriptionPreview: getPlainTextPreview(portfolio.description, 100)
                  }}
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