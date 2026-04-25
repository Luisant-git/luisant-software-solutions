/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
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
  ExternalLink,
  Laptop,
  Check,
  Code
} from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import PromoBar from "../components/PromoBar";

const SKILLS = [
  { name: "Responsive Web Design", percent: 100 },
  { name: "Logo Design", percent: 90 },
  { name: "Product Design", percent: 100 },
  { name: "Banner Design", percent: 90 },
  { name: "Content Writing", percent: 80 }
];

const INDUSTRIES = [
  { name: "REAL ESTATE", img: "https://img.icons8.com/color/96/home.png", desc: "Build trust with professional property showcases and lead-gen landing pages." },

  { name: "PHOTO STUDIO", img: "https://img.icons8.com/color/96/camera.png", desc: "Showcase your artistic portfolio with elegant and immersive gallery designs." },

  { name: "EXPORT & IMPORT", img: "https://img.icons8.com/color/96/cargo-ship.png", desc: "Global reach platforms for shipping, logistics, and international trade." },

  { name: "EVENT MANAGEMENT", img: "https://img.icons8.com/color/96/event-accepted.png", desc: "Manage bookings and highlight past events with dynamic showcase pages." },

  { name: "BOUTIQUES & FASHION", img: "https://img.icons8.com/color/96/t-shirt.png", desc: "Stylish storefronts that reflect your brand's unique aesthetic and fashion sense." },

  { name: "CONSTRUCTION", img: "https://img.icons8.com/color/96/crane.png", desc: "Professional websites for architectural firms and construction contractors." },

  { name: "CHARITABLE TRUST", img: "https://img.icons8.com/color/96/charity.png", desc: "Enhance your non-profit's impact with donation-ready and awareness platforms." },

  { name: "EDUCATIONAL", img: "https://img.icons8.com/color/96/graduation-cap.png", desc: "User-friendly portals for schools, colleges, and e-learning platforms." },

  { name: "MANUFACTURING", img: "https://img.icons8.com/color/96/factory.png", desc: "Industrial-grade websites highlighting production capabilities and product catalogs." },

  { name: "HEALTH CARE", img: "https://img.icons8.com/color/96/health-book.png", desc: "Secure and accessible digital solutions for clinics, hospitals, and pharmacies." },

  { name: "CUSTOM DEVELOPMENT", img: "https://img.icons8.com/color/96/source-code.png", desc: "Unique, high-performance web applications tailored to your specific business model." }
];

const FAQS = [
  { 
    q: "Why does my business need a website?", 
    a: "A website helps establish an online presence, build credibility, attract new customers, and showcase products or services 24/7." 
  },
  { 
    q: "How long does it take to develop a website?", 
    a: "The timeline depends on the complexity of the website. A basic site may take 2-4 days, while a more advanced site can take 7-15 days." 
  },
  { 
    q: "How much does a business website cost?", 
    a: "Website costs vary based on design, features, and functionality. A simple site may cost a few thousand rupees, while a custom site with advanced features may be more expensive." 
  },
  { 
    q: "Can I update my website myself after it’s built?", 
    a: "Yes, if your site is built on a CMS like WordPress, you can make edits. We also offer maintenance plans if you prefer professional updates." 
  },
  { 
    q: "Do you provide domain and hosting services?", 
    a: "Yes, we can help you register a domain and set up hosting, or we can work with your existing domain and hosting provider." 
  },
  { 
    q: "Will my website be mobile-friendly?", 
    a: "Yes, all our websites are responsive and optimized for mobile devices." 
  },
  { 
    q: "Can I integrate my social media accounts?", 
    a: "Yes, we can add social media links, feeds, and sharing buttons to connect your website with your social media platforms." 
  },
  { 
    q: "Will my website be SEO-friendly?", 
    a: "Yes, we follow SEO best practices, including fast loading speeds, keyword optimization, and proper site structure." 
  },
  { 
    q: "Can I have a contact form on my website?", 
    a: "Yes, we include contact forms, inquiry forms, and even appointment booking options based on your needs." 
  },
  { 
    q: "Do you offer eCommerce functionality?", 
    a: "Yes, we can build an online store with payment gateways, product listings, and secure checkout options." 
  },
  { 
    q: "What if I need changes after the website is launched?", 
    a: "We offer website maintenance services and update plans based on your needs." 
  },
  { 
    q: "Will my website be secure?", 
    a: "Yes, we implement SSL certificates, security plugins, and best security practices to protect your site." 
  },
  { 
    q: "Do you offer website backups?", 
    a: "Yes, we can set up regular backups to ensure your data is safe." 
  },
  { 
    q: "What happens if my website goes down?", 
    a: "If you host with us, we monitor uptime and fix issues promptly. If you use another host, we can help you troubleshoot." 
  },
  { 
    q: "Can my website grow as my business grows?", 
    a: "Yes, we build scalable websites that can be expanded with new pages, features, and integrations as needed." 
  }
];

const TECH_LOGOS = [
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Bootstrap", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "WordPress", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
];

const PORTFOLIO = [
  { name: "JK Agro Exporters", url: "www.jkagroexporters.com", color: "bg-[#e2f18b]", img: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=800" },
  { name: "Thulir Organics", url: "www.thulirorganics.in", color: "bg-[#e3ead3]", img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800" },
  { name: "I Globe Services", url: "www.iglobeservices.com", color: "bg-slate-50", img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800" },
  { name: "Mighty Man Power Solution", url: "www.mightymanpowersolution.in", color: "bg-white", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80" }
];

export default function BusinessWebDesign() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1e1438] text-white py-16 lg:py-24">
        {/* Slanted Background */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-white/5 skew-x-[-12deg] translate-x-1/4 z-0 hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-bold leading-tight mb-8"
              >
                Solving complex <br />
                <span className="text-primary italic font-medium">business challenges</span> <br />
                with smart website <br />
                development
              </motion.h1>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  to="/customer-enquiry-form"
                  className="bg-white text-secondary px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  ENQUIRE NOW
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="relative z-10 bg-slate-800 rounded-xl overflow-hidden shadow-2xl border-4 border-white/10"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                   alt="Design"
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                 />
                 
                 {/* Floating Feature Box */}
                 <div className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-6 rounded-xl shadow-2xl border border-slate-100 max-w-xs text-secondary hidden md:block">
                    <h4 className="font-bold mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                       Our Service:
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                       {[
                         { name: "Domain Name", icon: Globe },
                         { name: "Website Design", icon: Layout },
                         { name: "Cloud Hosting", icon: Zap },
                         { name: "Logo Design", icon: BarChart3 }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-3 text-xs font-bold">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                               <Check size={12} />
                            </div>
                            {item.name}
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Discount Tag */}
                 <div className="absolute -top-6 -left-6 bg-[#F6C644] text-secondary p-4 rounded-xl shadow-xl font-black text-center rotate-[-12deg]">
                    <div className="text-xl">Discount</div>
                    <div className="text-3xl">25% Off</div>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
             <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight">
               Business Website <span className="text-primary italic">Designing</span>
             </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="lg:w-1/2">
               <h3 className="text-xl md:text-2xl font-bold text-secondary mb-5 uppercase tracking-tight">Web Design and Development Services</h3>
               <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                 At Luisant Softwares, we specialize in <span className="font-bold text-secondary">web design and development services</span> tailored for small businesses, offering a diverse array of business websites that enhance your online presence. Our expert team understands the importance of a well-crafted website in today's digital landscape, providing custom solutions that cater to industries such as healthcare, real estate, and construction.
               </p>

               <h3 className="text-xl md:text-2xl font-bold text-secondary mb-5 uppercase tracking-tight">Small Business Website Design Services</h3>
               <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                 Our <span className="font-bold text-secondary">small business website design services</span> are perfect for companies seeking an affordable yet professional online platform. We understand the specific challenges small businesses face, and we deliver high-quality websites that effectively showcase your brand and offerings.
               </p>
               <p className="text-slate-600 leading-relaxed text-lg">
                 Our dedicated website developers create solutions that are visually appealing and functional, ensuring your website meets your unique business needs. From <span className="font-bold text-secondary">business portfolio websites</span> to <span className="font-bold text-secondary">product showcase websites</span>, we offer a variety of dynamic and static options that work seamlessly across industries.
               </p>
            </div>
            <div className="lg:w-1/2">
               <div className="relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl -rotate-3 scale-110" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                      alt="Device Mockups" 
                      className="relative rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover border-4 md:border-8 border-white"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PromoBar after Business Website Designing Section */}
      <PromoBar />

      {/* Skills & Form Section */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-8 tracking-tight">
                  Affordable Web Design for <span className="text-primary uppercase">Small Business</span>
                </h3>
                <p className="text-slate-600 mb-8">
                  With a focus on cost-effective solutions, we provide affordable web design for small businesses. Our services ensure you get a high-quality website without breaking your budget, with a specialized focus on sectors such as:
                </p>
                <ul className="space-y-4 mb-12">
                   {[
                     { title: "Photo Studios", desc: "Capture and share your work through engaging websites that showcase your portfolio effectively." },
                     { title: "Export & Import Firms", desc: "Display your products and services with catalogue websites designed for easy navigation and user engagement." },
                     { title: "Event Management", desc: "Create dynamic sites that highlight your events, services, and booking capabilities, designed to convert leads into clients." },
                     { title: "Boutiques", desc: "Attract customers with stylish, user-friendly websites that highlight your collections and promote your brand." }
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        <span className="text-slate-600"><span className="font-bold text-secondary">{item.title}:</span> {item.desc}</span>
                     </li>
                   ))}
                </ul>

                <div className="text-center lg:text-left mb-8">
                   <h4 className="text-2xl font-bold text-secondary mb-8 tracking-tight uppercase">Our <span className="text-primary">Skills</span></h4>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                      {SKILLS.map((skill, i) => (
                        <div key={i} className="flex flex-col items-center">
                           <div className="relative w-24 h-24 mb-3">
                              <svg className="w-full h-full" viewBox="0 0 36 36">
                                 <path
                                   className="text-slate-200 stroke-current"
                                   strokeWidth="3"
                                   fill="none"
                                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                 />
                                 <motion.path
                                   initial={{ strokeDasharray: "0, 100" }}
                                   whileInView={{ strokeDasharray: `${skill.percent}, 100` }}
                                   transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                                   className="text-primary stroke-current"
                                   strokeWidth="3"
                                   strokeLinecap="round"
                                   fill="none"
                                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                 />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                                 {skill.percent}%
                              </div>
                           </div>
                           <span className="text-xs font-bold text-secondary text-center px-2">{skill.name}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-slate-100 flex flex-col justify-center">
                 <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#1C77C3] mb-2 uppercase tracking-tight">Contact Us for a Free Enquiry</h3>
                    <div className="text-primary font-bold mb-6">Online / Offline Demo</div>
                 </div>
                 <AppointmentForm defaultService="Business Website Designing" />
              </div>
           </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-3 tracking-tight text-center uppercase">
             INDUSTRIES WE <span className="text-primary uppercase">SERVE</span>
           </h3>
           <p className="text-lg text-slate-500 max-w-3xl mx-auto text-center mb-10 leading-relaxed">
             We specialize in providing professional business websites tailored specifically for various industry sectors.
           </p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {INDUSTRIES.map((ind, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center group transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 p-2 bg-primary/5 rounded-lg transition-colors">
                     <img 
                       src={ind.img} 
                       alt={ind.name} 
                       className="w-full h-full object-contain"
                       referrerPolicy="no-referrer"
                     />
                  </div>
                  <div className="w-8 h-0.5 bg-primary/20 mx-auto mb-3" />
                  <h4 className="text-xs font-black text-primary uppercase tracking-wider mb-2 leading-tight">{ind.name}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-3">{ind.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* FAQ & Platforms Section */}
      <section className="py-16 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16">
              <div>
                 <h3 className="text-2xl font-bold text-secondary mb-10 text-center tracking-tight uppercase">
                   Frequently Asked <span className="text-primary">Questions</span>
                 </h3>
                 <div className="space-y-3">
                    {FAQS.map((faq, i) => (
                       <div key={i} className="bg-white border-b-2 border-slate-100/50">
                          <button 
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors group"
                          >
                             <span className="text-secondary font-medium text-sm">{faq.q}</span>
                             <div className="text-slate-400 group-hover:text-primary transition-colors">
                                <Plus size={16} className={openFaq === i ? "rotate-45" : ""} />
                             </div>
                          </button>
                          <AnimatePresence>
                             {openFaq === i && (
                               <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="px-6 pb-4 overflow-hidden"
                               >
                                 <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-primary/20">
                                   {faq.a}
                                 </p>
                               </motion.div>
                             )}
                          </AnimatePresence>
                       </div>
                    ))}
                 </div>
              </div>

              <div>
                 <h3 className="text-2xl font-bold text-secondary mb-10 text-center tracking-tight uppercase">
                   Platforms <span className="text-primary">we use</span>
                 </h3>
                 <div className="grid grid-cols-3 sm:grid-cols-3 gap-8 items-center justify-items-center bg-white p-10 rounded-xl shadow-inner border border-slate-100">
                    {TECH_LOGOS.map((tech, i) => (
                       <div key={i} className="flex flex-col items-center gap-3">
                          <img 
                            src={tech.url} 
                            alt={tech.name} 
                            className="w-12 h-12 transition-all duration-300" 
                          />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tech.name}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4 tracking-tight">
            FEW OF OUR <span className="text-primary uppercase">PORTFOLIO</span>
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {PORTFOLIO.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center group"
                >
                  <a 
                    href={`https://${item.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl border-8 border-white ${item.color} group-hover:shadow-primary/20 transition-all duration-500 p-8 flex items-center justify-center cursor-pointer`}
                  >
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Floating Info Overlay */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[80%] bg-secondary p-3 rounded-full flex items-center justify-between text-white shadow-xl translate-y-4 group-hover:translate-y-0 transition-all">
                       <span className="text-[10px] font-bold truncate pl-4 uppercase tracking-widest">{item.url}</span>
                       <div className="p-1 rounded-full bg-primary flex items-center justify-center">
                          <ExternalLink size={14} />
                       </div>
                    </div>
                  </a>
                </motion.div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
