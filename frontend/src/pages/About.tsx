/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { clientsApi, Client } from "../lib/clientsApi";
import PromoBar from "../components/PromoBar";

const STATIC_CLIENTS = [
  "JK Agro Exporters",
  "Sakthi Carton Industries",
  "Sakthi Poly Films",
  "SaaZ Fashions",
  "Sunshine Constructions",
  "Rajshree Sugars",
  "Gemini Edibles",
  "TVS Motors"
];

export default function About() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await clientsApi.getPublic();
        setClients(data);
      } catch (error) {
        console.error('Failed to load clients:', error);
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, []);

  const displayList = clients.length > 0 
    ? clients 
    : STATIC_CLIENTS.map(name => ({ id: name, name, logo: '' }));

  return (
    <div className="pt-16">
      {/* About Luisant Section */}
      <section className="py-10 sm:py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-xs sm:text-sm font-bold text-primary uppercase tracking-[0.3em] mb-2 sm:mb-4">Who We Are</h2>
              <h3 className="text-xl sm:text-3xl lg:text-5xl font-bold text-secondary mb-4 sm:mb-6 lg:mb-8 leading-tight">
                ABOUT LUISANT
              </h3>
              <div className="w-12 sm:w-16 h-1 bg-primary mb-4 sm:mb-6 lg:mb-8" />
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                Luisant Software Solutions is an innovative technology industry focused, 
                business driven professional services firm. From web design and Software 
                development to custom applications, our talented people work intelligently 
                to solve and manage client's needs. 
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                We serve to deliver cost effective interactive technology and design 
                solutions without compromising on quality.
              </p>
            </div>
            
            <div className="lg:w-1/2 relative w-full">
              <div className="absolute inset-0 bg-[radial-gradient(#1C77C3_1px,transparent_1px)] [background-size:24px_24px] opacity-10 -translate-x-4 translate-y-4 sm:-translate-x-6 sm:translate-y-6" />
              <div className="relative rounded-xl overflow-hidden shadow-xl sm:shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920" 
                  alt="Our Team"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PromoBar after About Section */}
      <PromoBar />

      {/* Our Commitments Section */}
      <section className="py-10 sm:py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            <div className="lg:w-1/2 relative w-full">
              <div className="absolute inset-0 bg-[radial-gradient(#1C77C3_1px,transparent_1px)] [background-size:24px_24px] opacity-10 translate-x-4 -translate-y-4 sm:translate-x-6 sm:-translate-y-6" />
              <div className="relative rounded-xl overflow-hidden shadow-xl sm:shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1920" 
                  alt="Our Commitment"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-xs sm:text-sm font-bold text-primary uppercase tracking-[0.3em] mb-2 sm:mb-4">Our Promise</h2>
              <h3 className="text-xl sm:text-3xl lg:text-5xl font-bold text-secondary mb-4 sm:mb-6 lg:mb-8 leading-tight">
                OUR COMMITMENTS
              </h3>
              <div className="w-12 sm:w-16 h-1 bg-primary mb-4 sm:mb-6 lg:mb-8" />
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                The quality of Luisant Software Solutions designs and programming is evident 
                in the Web sites and applications we create. Our commitment to quality designs, 
                superior technology enhancement and customer service is paramount.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                Satisfying the client is fundamental to our business and has been the leading 
                factor in our growth. We make ourselves available to our clients 24 x 7 for 
                advising, training, and assistance on all their related needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 sm:py-20 md:py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-lg sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 uppercase tracking-tight">WE HAVE OVER 13+ YEARS OF EXPERIENCE</h2>
          <div className="w-12 sm:w-16 h-1 bg-primary mx-auto mb-6 sm:mb-10" />
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-4xl mx-auto mb-10 sm:mb-16 leading-relaxed">
            In 2012, Luisant Software Solutions was founded. Since deciding to focus on 
            offering IT services, Luisant has experienced rapid expansion, building 
            websites for clients all over the world.
          </p>

          {loading ? (
            <div className="w-full text-center py-8 text-slate-300">Loading clients...</div>
          ) : (
            <div className="relative w-full overflow-hidden py-4">
              {/* Fading overlay gradients for dark background */}
              <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-secondary via-secondary/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-secondary via-secondary/40 to-transparent z-10 pointer-events-none" />

              {/* Scroll Tracks container */}
              <div className="flex w-max gap-0 items-center">
                {/* Track 1 */}
                <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] items-center">
                  {displayList.map((client, i) => (
                    <div 
                      key={`t1-${i}`} 
                      className="w-44 md:w-60 h-20 md:h-28 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-4 md:p-6 shadow-md overflow-hidden shrink-0 mr-8 md:mr-16 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
                    >
                      {client.logo ? (
                        <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-base md:text-lg font-black text-secondary/70 tracking-tight italic text-center leading-tight">
                          {client.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Track 2 */}
                <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] items-center" aria-hidden="true">
                  {displayList.map((client, i) => (
                    <div 
                      key={`t2-${i}`} 
                      className="w-44 md:w-60 h-20 md:h-28 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-4 md:p-6 shadow-md overflow-hidden shrink-0 mr-8 md:mr-16 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
                    >
                      {client.logo ? (
                        <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-base md:text-lg font-black text-secondary/70 tracking-tight italic text-center leading-tight">
                          {client.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}} />
      </section>
    </div>
  );
}
