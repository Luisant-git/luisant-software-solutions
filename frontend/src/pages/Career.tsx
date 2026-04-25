import { motion } from "motion/react";
import { Send, Upload, Heart, Coffee, Truck, Briefcase, GraduationCap, Headphones, Share2, CheckCircle, X, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { careerApi } from "../lib/careerApi";
import { captchaApi, CaptchaData } from "../lib/captchaApi";

export default function Career() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    skills: "",
    resume: null as File | null,
  });

  const [captcha, setCaptcha] = useState<CaptchaData | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  const openings = [
    {
      title: "Full Stack Development",
      tags: "React.js, Node.js, MySQL and PostgreSQL",
      level: "Fresher / Internship",
      icon: <GraduationCap size={24} className="text-primary" />
    },
    {
      title: "Telecalling",
      tags: "English / Tamil / Hindi",
      level: "Experienced Only",
      icon: <Headphones size={24} className="text-primary" />
    },
    {
      title: "Digital Marketing Interns",
      tags: "Social Media, SEO, Content",
      level: "Internship",
      icon: <Share2 size={24} className="text-primary" />
    }
  ];

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
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

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("mobile", formData.mobile);
      submitData.append("email", formData.email);
      submitData.append("city", formData.city);
      submitData.append("skills", formData.skills);
      if (formData.resume) {
        submitData.append("resume", formData.resume);
      }

      await careerApi.submitApplication(submitData);

      setFormData({
        name: "",
        mobile: "",
        email: "",
        city: "",
        skills: "",
        resume: null,
      });

      setModalType("success");
      setModalMessage("Thank you for your application! We will review it and contact you shortly.");
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
      <div className="pt-24 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-secondary tracking-tight uppercase inline-block relative">
              CAREERS
              <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-primary/20 rounded-full" />
            </h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Form */}
            <div className="lg:col-span-7 h-full">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-xl p-6 md:p-10 border border-slate-100 h-full flex flex-col"
              >
                <h2 className="text-xl font-bold text-secondary mb-8 flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Briefcase size={18} />
                  </div>
                  Quick Application
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Name *</label>
                        <input 
                          type="text" 
                          placeholder="Your name"
                          required
                          className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mobile *</label>
                        <input 
                          type="tel" 
                          placeholder="Your number"
                          required
                          pattern="[0-9]{10}"
                          className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email *</label>
                        <input 
                          type="email" 
                          placeholder="Your email"
                          required
                          className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">City</label>
                        <input 
                          type="text" 
                          placeholder="Your city"
                          className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 mt-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Skills</label>
                      <textarea 
                        rows={3}
                        placeholder="E.g. React, Node, UI/UX"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium text-sm"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5 mt-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Resume (PDF/DOCX)</label>
                      <div className="relative">
                        <input 
                          type="file" 
                          className="hidden" 
                          id="resume-upload" 
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        <label 
                          htmlFor="resume-upload"
                          className="flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 cursor-pointer hover:border-primary/40 hover:bg-white transition-all group"
                        >
                          <Upload size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                          <span className="text-slate-400 font-medium group-hover:text-secondary text-sm">
                            {formData.resume ? formData.resume.name : "Choose File"}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* CAPTCHA Section */}
                    <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Verify CAPTCHA:</label>
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
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1C77C3] text-white py-4 rounded-xl font-black text-xs tracking-widest shadow-xl shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-6 uppercase disabled:opacity-50"
                  >
                    <Send size={16} />
                    {loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Right Side: Info & Openings */}
            <div className="lg:col-span-5 h-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 md:p-10 rounded-xl border border-slate-100 h-full flex flex-col"
              >
                <p className="text-md text-slate-500 leading-relaxed font-medium mb-8 italic">
                  "We are seeking creative and dynamic individuals to join our team and contribute to our global mission."
                </p>

                <div className="relative flex-grow">
                  <h3 className="text-xl font-black text-[#2e5a27] mb-6 uppercase tracking-widest text-center">
                    CURRENT OPENINGS
                  </h3>

                  <div className="space-y-3">
                    {openings.map((job, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-xl border border-slate-100 bg-white shadow-md hover:shadow-lg transition-all group"
                      >
                        <div className="flex gap-3">
                          <div className="shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/10 text-white">
                            <job.icon.type {...job.icon.props} size={20} className="text-white" />
                          </div>
                          <div>
                            <h4 className="text-md font-bold text-secondary mb-0.5">{job.title}</h4>
                            <p className="text-[11px] font-medium text-slate-400 mb-1.5">{job.tags}</p>
                            <div className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">
                              {job.level}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

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
