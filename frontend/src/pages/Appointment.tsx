/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";

import AppointmentForm from "../components/AppointmentForm";

export default function Appointment() {
  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 lg:py-8">
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Contact Info Sidebar - Compact */}
          <div className="lg:col-span-4 space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
              <h3 className="text-lg font-bold text-secondary mb-4">Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  { icon: Phone, label: "Call Us", val: "+91 427 405 6538" },
                  { icon: Mail, label: "Email Us", val: "info@luisantsoftwares.com" },
                  { icon: MapPin, label: "Location", val: "Salem, Tamil Nadu" },
                  { icon: Clock, label: "Mon - Sat", val: "9:00 AM - 6:00 PM" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center lg:items-start lg:gap-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-secondary font-semibold text-sm">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="bg-primary p-6 rounded-xl text-white hidden lg:block">
              <h3 className="text-lg font-bold mb-3">Why Choose Us?</h3>
              <ul className="grid grid-cols-1 gap-2">
                {[
                  "Expert Architects",
                  "24/7 Support",
                  "Scalable Design",
                  "Cost-Effective"
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-medium">
                    <div className="w-3 h-3 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Appointment Form - Multi-column setup */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                <div>
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-1">Enquiry Form</h2>
                  <h3 className="text-2xl font-bold text-secondary uppercase">PLEASE FILL YOUR DETAILS</h3>
                </div>
              </div>
              
              <AppointmentForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
