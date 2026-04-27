/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import logo from "../images/logo-luisant-software-solutions.png";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-10 relative overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <img src={logo} alt="Luisant Software Solutions" className="h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              Luisant Software Solutions is an innovative technology industry focused, business driven professional services firm. We solve and manage client's needs intelligently.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-primary" /> Locations
            </h4>
            <ul className="space-y-4 text-slate-400">
              {["Salem", "Namakkal", "Dharmapuri", "Krishnagiri", "Hosur", "Erode", "Tirupur", "Coimbatore"].map(city => (
                <li key={city} className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  <a href={`/web-design-in-${city.toLowerCase()}`} className="hover:text-primary transition-colors">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-primary" /> Information
            </h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-conditions/" className="hover:text-primary transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="/refund-policy/" className="hover:text-primary transition-colors">Refund Policy</a>
              </li>
              <li>
                <a href="/career" className="hover:text-primary transition-colors">Careers</a>
              </li>
              <li>
                <a href="/about-us" className="hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-primary" /> Contact Us
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed cursor-default">
                  288/6, 2nd Floor, NM Complex, ARRS Multiplex Road, Meyyanur, Salem-636004, Tamilnadu, India
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={18} />
                </div>
                <p className="text-slate-400 text-sm break-all font-medium">info@luisantsoftwares.com</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={18} />
                </div>
                <p className="text-slate-400 text-sm font-medium">+91 427 405 6538</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Luisant Software Solutions. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms-conditions/" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
