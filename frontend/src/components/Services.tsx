/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Globe, 
  ShoppingCart, 
  HardDrive, 
  Server, 
  Settings, 
  CreditCard, 
  MessageSquare, 
  Smartphone 
} from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Design",
    desc: "We have a team of experts to design a customized website as per your needs.",
    color: "bg-primary",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Development",
    desc: "An expert team to develop an Ecommerce Website for your business.",
    color: "bg-emerald-500",
  },
  {
    icon: HardDrive,
    title: "Domain Name",
    desc: "We have expertise to find a suitable domain name for your business website.",
    color: "bg-amber-500",
  },
  {
    icon: Server,
    title: "Web Hosting",
    desc: "We help you to maintain your web application in our server as per your requirements.",
    color: "bg-indigo-500",
  },
  {
    icon: Settings,
    title: "Website Maintenance",
    desc: "We have an expert team to maintain your website as per your needs.",
    color: "bg-rose-500",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    desc: "We help you to collect payment from your customers using your web application.",
    color: "bg-violet-500",
  },
  {
    icon: MessageSquare,
    title: "SMS Gateway",
    desc: "Integrate SMS to your software as per your needs efficiently.",
    color: "bg-sky-500",
  },
  {
    icon: Smartphone,
    title: "Whatsapp API",
    desc: "We help you to send bulk WhatsApp messages to promote your products.",
    color: "bg-green-500",
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">What We Do</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary">Our Professional Services</h3>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-default"
            >
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-black/5`}>
                <service.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-primary mb-3">
                {service.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                {service.desc}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                Learn More <div className="w-6 h-[2px] bg-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
