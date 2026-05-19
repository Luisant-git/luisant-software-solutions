/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { clientsApi, Client } from "../lib/clientsApi";

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

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await clientsApi.getPublic();
        setClients(data);
      } catch (error) {
        console.error('Failed to load clients:', error);
      }
    };
    loadClients();
  }, []);

  const displayList = clients.length > 0 
    ? clients 
    : STATIC_CLIENTS.map(name => ({ id: name, name, logo: '' }));

  return (
    <section className="py-16 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h3 className="text-xl font-black text-slate-400 uppercase tracking-[0.3em]">Our Trusted Clients</h3>
        <div className="w-12 h-1 bg-primary/30 mx-auto mt-4" />
      </div>

      <div className="relative w-full overflow-hidden py-4">
        {/* Fading overlay gradients for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-50 via-slate-50/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-50 via-slate-50/40 to-transparent z-10 pointer-events-none" />

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

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </section>
  );
}
