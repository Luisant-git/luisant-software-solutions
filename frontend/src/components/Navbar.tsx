/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../images/logo-luisant-software-solutions.png";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../lib/productService";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicProducts, setDynamicProducts] = useState<{ name: string; href: string }[]>([]);
  const location = useLocation();

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProducts();
      if (products.length > 0) {
        setDynamicProducts(products.map(p => ({
          name: p.name,
          href: `/product/${p.slug}`
        })));
      } else {
        setDynamicProducts([
          { name: "Billing Software", href: "#" },
          { name: "MicroFin Manager", href: "#" }
        ]);
      }
    };
    loadProducts();
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { 
      name: "Services", 
      href: "#", 
      dropdown: [
        { name: "Ecommerce Application", href: "/ecommerce" },
        { name: "Business Website Designing", href: "/business-design" },
        { name: "Digital Showcase", href: "/digital-showcase" }
      ] 
    },
    { 
      name: "Products", 
      href: "#",
      dropdown: dynamicProducts
    },
    { name: "Career", href: "/career" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Luisant Software Solutions" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.href === "#" ? "#" : link.href}
                  onClick={(e) => link.href === "#" && e.preventDefault()}
                  className="text-[13px] xl:text-sm font-semibold text-slate-600 hover:text-primary transition-colors flex items-center gap-1 py-4 whitespace-nowrap"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} />}
                </Link>
                
                {link.dropdown && (
                  <div className="absolute top-full left-0 w-52 bg-white shadow-xl border border-slate-100 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Link to="/appointment" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 hover:bg-slate-50 rounded-lg transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                to={link.href === "#" ? "#" : link.href}
                onClick={(e) => {
                  if (link.href === "#") {
                    e.preventDefault();
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </Link>
              {link.dropdown && (
                <div className="pl-6 border-l-2 border-slate-100 ml-3 space-y-1">
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-sm text-slate-500 hover:text-primary"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <Link to="/appointment" onClick={() => setIsOpen(false)} className="block w-full bg-primary text-white py-3 rounded-xl font-semibold text-center">
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
