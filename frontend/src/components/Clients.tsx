/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getClients, Client } from "../lib/productService";

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
    const data = getClients();
    if (data.length > 0) {
      setClients(data);
    }
  }, []);

  const displayList = clients.length > 0 
    ? [...clients, ...clients] 
    : [...STATIC_CLIENTS, ...STATIC_CLIENTS];

  return (
    <section className="py-12 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h3 className="text-xl font-bold text-slate-400 uppercase tracking-[0.3em]">Partial Of Our Clients</h3>
        <div className="w-12 h-1 bg-primary/30 mx-auto mt-4" />
      </div>

      <div className="relative">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap gap-8 md:gap-16 items-center">
          {displayList.map((client, i) => (
            <div key={i} className="flex flex-col items-center gap-4 transition-all cursor-default">
              <div className="w-40 md:w-56 h-20 md:h-28 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-4 md:p-6 shadow-md overflow-hidden">
                {typeof client === "string" ? (
                  <span className="text-lg md:text-xl font-black text-secondary/60 tracking-tighter italic text-center">{client}</span>
                ) : (
                  client.logo ? (
                    <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-lg md:text-xl font-black text-secondary/60 tracking-tighter italic text-center">{client.name}</span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
