import React, { useState, useEffect } from "react";
import { Send, CheckCircle, X, RefreshCw } from "lucide-react";
import { appointmentApi } from "../lib/appointmentApi";
import { captchaApi, CaptchaData } from "../lib/captchaApi";

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

  const [captcha, setCaptcha] = useState<CaptchaData | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    try {
      const data = await captchaApi.generate();
      setCaptcha(data);
      setCaptchaInput("");
    } catch (error) {
      console.error('Failed to load CAPTCHA:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captcha) {
      setModalType("error");
      setModalMessage("CAPTCHA not loaded. Please refresh.");
      setShowModal(true);
      return;
    }

    if (!captchaInput.trim()) {
      setModalType("error");
      setModalMessage("Please enter the CAPTCHA code.");
      setShowModal(true);
      return;
    }

    setLoading(true);

    try {
      // Verify CAPTCHA first
      const captchaResult = await captchaApi.verify(captcha.id, captchaInput);
      
      if (!captchaResult.valid) {
        setModalType("error");
        setModalMessage("Invalid CAPTCHA code. Please try again.");
        setShowModal(true);
        loadCaptcha();
        setLoading(false);
        return;
      }

      // Submit appointment
      await appointmentApi.submitAppointment({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        businessType: formData.businessType,
        service: formData.service,
        message: formData.message
      });
      
      setFormData({
        name: "",
        phone: "",
        email: "",
        businessType: "",
        service: defaultService,
        message: ""
      });
      
      setModalType("success");
      setModalMessage("Thank you! Your enquiry has been sent. We will contact you shortly.");
      setShowModal(true);
      loadCaptcha();
    } catch (error: any) {
      setModalType("error");
      setModalMessage(`Error: ${error.message}`);
      setShowModal(true);
      loadCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              <option value="WhaSuite 360">WhaSuite 360</option>
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

        {/* CAPTCHA Section */}
        <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Verify CAPTCHA:</label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
            {captcha && (
              <div className="flex gap-2 items-center shrink-0">
                <img src={captcha.image} alt="CAPTCHA" className="h-10 sm:h-12 w-auto border border-slate-200 rounded-lg bg-white p-0.5" />
                <button
                  type="button"
                  onClick={loadCaptcha}
                  className="p-2 text-slate-400 hover:text-primary transition-colors shrink-0"
                  title="Refresh CAPTCHA"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            )}
            <input 
              type="text" 
              placeholder="Enter code above"
              required
              className="w-full sm:flex-grow px-3 sm:px-4 py-2 bg-white border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-xs sm:text-sm uppercase"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "SENDING..." : "SEND ENQUIRY"} <Send size={16} />
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-full ${modalType === "success" ? "bg-blue-100" : "bg-red-100"}`}>
                {modalType === "success" ? (
                  <CheckCircle className="text-[#1C77C3]" size={28} />
                ) : (
                  <X className="text-red-600" size={28} />
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <h2 className={`text-2xl font-bold mb-2 ${modalType === "success" ? "text-[#1C77C3]" : "text-red-600"}`}>
              {modalType === "success" ? "Success!" : "Error"}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-6">
              {modalMessage}
            </p>

            <button
              onClick={() => setShowModal(false)}
              className={`w-full py-3 rounded-lg font-bold uppercase tracking-wider transition-all ${
                modalType === "success"
                  ? "bg-[#1C77C3] hover:bg-[#1a5fa0] text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
