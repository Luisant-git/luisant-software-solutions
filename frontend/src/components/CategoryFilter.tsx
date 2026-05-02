/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3 justify-center mb-12"
    >
      {/* All Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange("All")}
        className={`px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${
          activeCategory === "All"
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        All
      </motion.button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${
            activeCategory === category
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
