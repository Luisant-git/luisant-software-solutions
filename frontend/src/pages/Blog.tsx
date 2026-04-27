/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MapPin, Calendar, User, ArrowRight } from "lucide-react";

const blogContent: { [key: string]: { title: string; description: string; content: string } } = {
  salem: {
    title: "Web Design in Salem",
    description: "Professional web design services for businesses in Salem, Tamil Nadu",
    content: "Luisant Software Solutions provides cutting-edge web design services tailored for Salem-based businesses. Our expert team creates responsive, user-friendly websites that help your business grow online."
  },
  namakkal: {
    title: "Web Design in Namakkal",
    description: "Expert web design solutions for Namakkal businesses",
    content: "We deliver professional web design services to businesses in Namakkal. Our solutions focus on creating engaging digital experiences that drive customer engagement and business growth."
  },
  dharmapuri: {
    title: "Web Design in Dharmapuri",
    description: "Quality web design services for Dharmapuri region",
    content: "Luisant Software Solutions offers comprehensive web design services for Dharmapuri businesses. We create modern, scalable websites that enhance your online presence."
  },
  krishnagiri: {
    title: "Web Design in Krishnagiri",
    description: "Professional web design for Krishnagiri businesses",
    content: "Our web design team specializes in creating beautiful, functional websites for Krishnagiri-based companies. We combine creativity with technical expertise to deliver results."
  },
  hosur: {
    title: "Web Design in Hosur",
    description: "Expert web design services in Hosur",
    content: "Luisant Software Solutions provides professional web design services for Hosur businesses. Our team creates responsive websites optimized for all devices and search engines."
  },
  erode: {
    title: "Web Design in Erode",
    description: "Quality web design solutions for Erode businesses",
    content: "We offer comprehensive web design services for businesses in Erode. Our solutions are designed to increase your online visibility and customer engagement."
  },
  tirupur: {
    title: "Web Design in Tirupur",
    description: "Professional web design for Tirupur region",
    content: "Luisant Software Solutions delivers professional web design services for Tirupur businesses. We create modern websites that reflect your brand identity and values."
  },
  coimbatore: {
    title: "Web Design in Coimbatore",
    description: "Expert web design services for Coimbatore businesses",
    content: "Luisant Software Solutions is a leading web design company in Coimbatore. We create innovative, responsive websites that help businesses establish a strong online presence and drive growth."
  }
};

export default function Blog() {
  const pathname = window.location.pathname;
  const match = pathname.match(/\/web-design-in-(.+)$/);
  const location = match ? match[1] : "coimbatore";
  const normalizedLocation = location.toLowerCase();
  const blog = blogContent[normalizedLocation] || blogContent.coimbatore;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-primary" />
            <span className="text-primary font-bold uppercase text-sm tracking-widest">
              {normalizedLocation.charAt(0).toUpperCase() + normalizedLocation.slice(1)}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-6">
            {blog.title}
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            {blog.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Luisant Software Solutions</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-xl overflow-hidden shadow-xl"
        >
          <img
            src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200`}
            alt={blog.title}
            className="w-full h-96 object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-6">About Our Services</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {blog.content}
            </p>

            <h3 className="text-xl font-bold text-secondary mb-4 mt-8">Why Choose Luisant Software Solutions?</h3>
            <ul className="space-y-3 mb-6">
              {[
                "13+ years of experience in web design and development",
                "Expert team of designers and developers",
                "Customized solutions tailored to your business needs",
                "Responsive design for all devices",
                "SEO-optimized websites for better visibility",
                "24/7 customer support and maintenance",
                "Affordable pricing with quality assurance"
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-secondary mb-4 mt-8">Our Web Design Process</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { step: "1", title: "Discovery", desc: "Understanding your business goals and requirements" },
                { step: "2", title: "Design", desc: "Creating beautiful, user-friendly designs" },
                { step: "3", title: "Development", desc: "Building responsive, fast-loading websites" },
                { step: "4", title: "Launch", desc: "Deploying and optimizing your website" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-secondary">{item.title}</h4>
                  </div>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-bold text-primary mb-2">Ready to Get Started?</h3>
              <p className="text-slate-600 mb-4">
                Contact us today to discuss your web design needs and get a free consultation.
              </p>
              <a
                href="/customer-enquiry-form"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
              >
                Get Started <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-secondary text-white p-8 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-6">About Luisant Software Solutions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-3">Who We Are</h4>
              <p className="text-slate-300 leading-relaxed">
                Luisant Software Solutions is an innovative technology industry focused, business-driven professional services firm. We solve and manage client's needs intelligently with cutting-edge solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-3">Our Expertise</h4>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Web Design & Development</li>
                <li>✓ Ecommerce Solutions</li>
                <li>✓ ERP Systems</li>
                <li>✓ WhatsApp Integration</li>
                <li>✓ Digital Showcase</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-slate-300">
              <strong>Contact Us:</strong> +91 427 405 6538 | info@luisantsoftwares.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
