/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  ChevronRight, 
  Plus, 
  Minus, 
  Layout, 
  Globe, 
  TrendingUp, 
  Zap, 
  Users, 
  CreditCard, 
  Truck, 
  BarChart3,
  Search,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    q: "Why should I invest in an eCommerce platform?",
    a: "An eCommerce platform helps your business increase sales, reduce costs, reach global customers, and operate 24/7. It also enables you to automate inventory, payments, and order management."
  },
  {
    q: "How can an eCommerce platform increase my sales?",
    a: "🔹 Expands your customer base beyond local markets.\n🔹 Allows customers to shop anytime, increasing conversions.\n🔹 Enables targeted marketing through Google & Facebook Ads."
  },
  {
    q: "Which eCommerce platform is best for my business?",
    a: "🔹 WooCommerce (WordPress) – Great for small to medium businesses.\n🔹 Shopify – Easy-to-use, hosted solution for quick setup.\n🔹 Magento/OpenCart – Best for enterprise-level eCommerce.\n🔹 Custom Development (PHP/Node.js) – Fully customized solutions for large businesses."
  },
  {
    q: "How long does it take to launch my eCommerce store?",
    a: "🔹 Basic store: 2-4 weeks\n🔹 Custom-built platform: 2-6 months"
  },
  {
    q: "How can I accept payments on my eCommerce store?",
    a: "🔹 We integrate secure payment gateways like Razorpay, PayPal, Stripe, UPI, Net Banking, and Cash on Delivery (COD) to ensure a seamless checkout experience."
  },
  {
    q: "How do I handle shipping and deliveries?",
    a: "🔹 Partner with logistics providers like Shiprocket, Delhivery, Blue Dart, and FedEx for automated shipping and tracking.\n🔹 Offer Cash on Delivery (COD) to attract more customers."
  },
  {
    q: "How can I market my eCommerce store?",
    a: "We offer complete digital marketing solutions:\n🔹 Google & Facebook Ads – Target customers effectively.\n🔹 SEO Optimization – Rank your website higher on Google.\n🔹 WhatsApp & Email Marketing – Retain and engage customers."
  },
  {
    q: "Do you provide maintenance & support after launch?",
    a: "Yes! Our support plans include:\n🔹 Regular security updates & bug fixes.\n🔹 Performance optimization & new feature updates.\n🔹 24/7 technical support for any issues."
  }
];

const BENEFITS = [
  { img: "https://img.icons8.com/animated/100/ecommerce/hourglass.gif", title: "24/7 Availability & Convenience", desc: "Your shop never closes, allowing customers to buy whenever they want." },
  { img: "https://img.icons8.com/animated/100/ecommerce/world-map.gif", title: "Wider Customer Reach", desc: "Break geographical barriers and sell to customers across the country or world." },
  { img: "https://img.icons8.com/animated/100/ecommerce/wallet.gif", title: "Cost-Effective & Scalable", desc: "Lower overhead costs compared to physical stores and easy to scale as you grow." },
  { img: "https://img.icons8.com/animated/100/ecommerce/graph.gif", title: "Customer Data & Insights", desc: "Track user behavior and sales trends to make data-driven business decisions." },
  { img: "https://img.icons8.com/animated/100/ecommerce/megaphone.gif", title: "Improved Marketing & Lead Generation", desc: "Leverage SEO and social media integrations to drive targeted traffic." },
  { img: "https://img.icons8.com/animated/100/ecommerce/settings.gif", title: "Automation & Efficient Operations", desc: "Automate inventory, orders, and customer management for better efficiency." },
  { img: "https://img.icons8.com/animated/100/ecommerce/shipped.gif", title: "Multiple Payment & Shipping Options", desc: "Provide flexibility with various payment methods and delivery choices." },
  { img: "https://img.icons8.com/animated/100/ecommerce/customer-support.gif", title: "Builds Brand & Customer Loyalty", desc: "Create direct relationships with customers through personalized experiences." }
];

const INDUSTRIES = [
  { name: "Retail & Consumer Goods", img: "https://img.icons8.com/animated/100/ecommerce/shopping-basket.gif", desc: "Empowering retailers with high-conversion storefronts." },
  { name: "Fashion & Apparel", img: "https://img.icons8.com/animated/100/ecommerce/t-shirt.gif", desc: "Showcase your collections with style and elegance." },
  { name: "Electronics & Gadgets", img: "https://img.icons8.com/animated/100/ecommerce/computer.gif", desc: "Sell technical products with detailed specs and easy navigation." },
  { name: "Food & Grocery", img: "https://img.icons8.com/animated/100/ecommerce/shopping-bag.gif", desc: "Streamline deliveries and fresh-stock management." },
  { name: "Healthcare & Pharmacy", img: "https://img.icons8.com/animated/100/ecommerce/heart-with-pulse.gif", desc: "Secure and accessible platforms for medical supplies." },
  { name: "Beauty & Personal Care", img: "https://img.icons8.com/animated/100/ecommerce/cosmetic-brush.gif", desc: "Beautifully designed shops for cosmetic brands." },
  { name: "Art, Collectibles & Handicrafts", img: "https://img.icons8.com/animated/100/ecommerce/paint-palette.gif", desc: "Unique platforms for creators and collectors." },
  { name: "B2B Ecommerce", img: "https://img.icons8.com/animated/100/ecommerce/handshake.gif", desc: "Robust portals for wholesale and bulk ordering." }
];

const PORTFOLIO = [
  { name: "Saaz Fashions", url: "https://saazfashions.com", img: "https://img.icons8.com/animated/100/ecommerce/dress.gif" },
  { name: "Knowledge Electronics", url: "#", img: "https://img.icons8.com/animated/100/ecommerce/smart-home.gif" },
  { name: "Panto Pollon", url: "#", img: "https://img.icons8.com/animated/100/ecommerce/packaging.gif" },
  { name: "Thulir Organics", url: "https://thulirorganics.in", img: "https://img.icons8.com/animated/100/ecommerce/organic-food.gif" }
];

import { Clock, Settings, Heart } from "lucide-react";

import AppointmentForm from "../components/AppointmentForm";
import FreeDemoBar from "../components/FreeDemoBar";

export default function Ecommerce() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-24 overflow-hidden bg-[#1e1438]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 50 Q 25 25, 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-3/5 text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8"
              >
                Develop Your <br />
                Ecommerce Website <br />
                With Us
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/appointment"
                  className="inline-block bg-white text-[#1e1438] px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
                >
                  ENQUIRE NOW
                </Link>
              </motion.div>
            </div>

            <div className="lg:w-2/5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1920" 
                  alt="Ecommerce Development"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                
                {/* Search Overlay Decor */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                    <Search size={18} />
                  </div>
                  <div className="text-white text-xs font-medium">www.luisant.in</div>
                </div>
              </motion.div>
              
              {/* Dot Decor */}
              <div className="absolute -top-10 -right-10 w-24 h-24 grid grid-cols-4 gap-2 opacity-30">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip - Moved after Hero */}
      <FreeDemoBar />

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest mb-3">Development</div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 leading-tight">
                Ecommerce Application Development
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                E-commerce applications are software programs that enable businesses to 
                sell products and services online. They provide a platform for customers to 
                browse, select, and purchase items through the internet. These applications 
                have revolutionized the way we shop, offering convenience, accessibility, 
                and a vast selection of products.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Ecommerce development involves creating online platforms where 
                businesses can sell products or services. It includes designing, building, and 
                maintaining websites or applications that support online transactions.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-xl -z-10 group-hover:bg-primary/10 transition-colors" />
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200" 
                  alt="Ecommerce Shopping Cart and Boxes"
                  className="w-full rounded-xl shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why eCommerce Section */}
      <section className="py-16 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-3 tracking-tight">
            WHY YOUR BUSINESS NEEDS <span className="text-primary uppercase">eCOMMERCE PLATFORM?</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Businesses need an eCommerce platform to expand your reach, increase sales, and streamline operations.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center group"
              >
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                  className="w-20 h-20 mx-auto overflow-hidden mb-6"
                >
                  <img 
                    src={benefit.img} 
                    alt={benefit.title} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="w-8 h-0.5 bg-primary/20 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-secondary mb-3 leading-tight">{benefit.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Form Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* FAQ Column */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-secondary mb-8 tracking-tight uppercase">
                FREQUENTLY ASKED QUESTIONS ABOUT <span className="text-primary">ECOMMERCE</span>
              </h2>
              
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-1.5 rounded-full ${openFaq === i ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                          {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                        </div>
                        <span className="font-bold text-secondary text-sm md:text-base">{faq.q}</span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 text-slate-600 leading-relaxed text-sm md:text-base pl-16 pr-8 whitespace-pre-line"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Form Column */}
            <div className="bg-slate-50/50 p-8 md:p-12 rounded-xl border border-slate-100 shadow-inner">
               <div className="text-center mb-10">
                 <h3 className="text-2xl font-black text-secondary mb-2">Contact Us for a Free Demo</h3>
                 <div className="w-32 h-0.5 bg-primary/20 mx-auto" />
               </div>

               <AppointmentForm defaultService="Ecommerce" />
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-3 tracking-tight">
            INDUSTRIES WE <span className="text-primary uppercase">FOCUS</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            We specialize in providing high-performance eCommerce solutions tailored specifically for your industry's unique challenges.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 shadow-sm text-center group"
              >
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                  className="w-20 h-20 mx-auto overflow-hidden mb-6"
                >
                  <img 
                    src={ind.img} 
                    alt={ind.name} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="w-8 h-0.5 bg-primary/20 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-secondary mb-3 leading-tight">{ind.name}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-secondary mb-4 tracking-tighter">
            OUR PORTFOLIO
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PORTFOLIO.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="relative w-full aspect-square md:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white group-hover:border-primary/10 transition-colors flex items-center justify-center bg-slate-50">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className="w-full h-full max-h-[80%] overflow-hidden relative p-4"
                  >
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white text-secondary px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 w-fit mb-2 hover:bg-primary hover:text-white transition-colors"
                    >
                      Visit Site <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <div className="mt-8 relative text-center">
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 opacity-10 pointer-events-none">
                      <Layout size={32} />
                   </div>
                   <span className="text-xs font-black text-primary underline decoration-2 underline-offset-4">{item.url}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
