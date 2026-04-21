import { motion } from "motion/react";
import { Mail, MapPin, Phone, Smartphone, Navigation } from "lucide-react";
import FreeDemoBar from "../components/FreeDemoBar";

export default function Contact() {
  const contactInfo = [
    {
      title: "Visit Us",
      label: "Our Office Location",
      icon: <MapPin className="w-6 h-6" />,
      content: (
        <div className="text-secondary/70 leading-relaxed font-semibold text-sm">
          288/6, 2nd Floor, NM Complex,<br />
          Opposite to ARRS Multiplex,<br />
          Salem-636 004, Tamilnadu, India.
        </div>
      ),
      color: "bg-primary",
    },
    {
      title: "Mail Us",
      label: "Official Support",
      icon: <Mail className="w-6 h-6" />,
      content: (
        <p className="text-secondary font-black text-base md:text-lg tracking-tight">info@luisantsoftwares.com</p>
      ),
      color: "bg-primary",
    },
    {
      title: "Call Us",
      label: "Landline Number",
      icon: <Phone className="w-6 h-6" />,
      content: (
        <p className="text-secondary font-black text-xl md:text-2xl tracking-tighter">+91 427 405 6538</p>
      ),
      color: "bg-primary",
    },
    {
      title: "Mobile",
      label: "Instant Support",
      icon: <Smartphone className="w-6 h-6" />,
      content: (
        <p className="text-secondary font-black text-xl md:text-2xl tracking-tighter">+91 90803 56538</p>
      ),
      color: "bg-primary",
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-2 opacity-80 underline decoration-2 underline-offset-8">Information Center</h2>
          <h3 className="text-2xl md:text-4xl font-black text-secondary tracking-tighter uppercase">Get In <span className="text-primary italic">Touch</span></h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Contact Info */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all cursor-default flex flex-col gap-4 overflow-hidden relative"
              >
                <div className="flex items-center gap-5">
                  <div className={`shrink-0 w-12 h-12 ${info.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500`}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-primary leading-none uppercase tracking-widest mb-1">{info.title}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{info.label}</p>
                  </div>
                </div>
                
                <div className="pl-0 border-l-2 border-slate-50 pl-4 group-hover:border-primary/20 transition-colors">
                  {info.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Map */}
          <div className="lg:col-span-8 h-full min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full h-full rounded-xl overflow-hidden border border-slate-200 shadow-2xl relative group bg-white p-2"
            >
              <div className="w-full h-full rounded-lg overflow-hidden relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.3789218615602!2d78.13268260946923!3d11.66753534208004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf041b47c78af%3A0x9cb679479afd03dd!2sLuisant%20Software%20Solutions!5e0!3m2!1sen!2sin!4v1776771462276!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Visual Accent */}
                <div className="absolute top-6 right-6 bg-secondary text-white px-5 py-2.5 rounded-lg font-bold text-xs shadow-2xl flex items-center gap-3 backdrop-blur-md bg-secondary/90 border border-white/10">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   LIVE LOCATION
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=11.66753534208004,78.13268260946923&destination_place_id=0x3babf041b47c78af:0x9cb679479afd03dd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary text-white p-4 rounded-xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-3 font-bold text-sm"
                >
                  <Navigation size={20} />
                  GET DIRECTIONS
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <FreeDemoBar />
    </div>
  );
}
