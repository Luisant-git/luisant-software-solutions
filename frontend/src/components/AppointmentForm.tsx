import React, { useState } from "react";
import { Send } from "lucide-react";

interface AppointmentFormProps {
  defaultService?: string;
}

export default function AppointmentForm({ defaultService = "" }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    businessType: "",
    service: defaultService,
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you! Your enquiry has been sent. We will contact you shortly.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Name:</label>
          <input 
            type="text" 
            required
            className="w-full px-5 py-3 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Contact No:</label>
          <input 
            type="tel" 
            required
            pattern="[0-9]{10}"
            className="w-full px-5 py-3 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Email ID:</label>
          <input 
            type="email" 
            className="w-full px-5 py-3 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Business Type:</label>
          <input 
            type="text" 
            className="w-full px-5 py-3 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
            value={formData.businessType}
            onChange={(e) => setFormData({...formData, businessType: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Selected Service:</label>
        <div className="relative group">
          <select 
            required
            className="w-full px-5 py-3 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none text-sm"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
          >
            <option value="" disabled>—Please choose an option—</option>
            <option value="Billing Software">Billing Software</option>
            <option value="Ecommerce">Ecommerce Application</option>
            <option value="Website">Business Website Designing</option>
            <option value="Digital">Digital Showcase</option>
            <option value="Custom">Custom Web Design</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Message:</label>
        <textarea 
          rows={4}
          className="w-full px-5 py-3 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm resize-none"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 text-sm flex items-center justify-center gap-2"
      >
        SEND ENQUIRY <Send size={16} />
      </button>
    </form>
  );
}
