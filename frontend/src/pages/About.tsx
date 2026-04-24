/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

import client1 from "../images/clients/luisant-client1.png";
import client2 from "../images/clients/luisant-client2.png";
import client3 from "../images/clients/luisant-client3.png";
import client4 from "../images/clients/luisant-client4.png";
import PromoBar from "../components/PromoBar";

export default function About() {
  return (
    <div className="pt-16">
      {/* About Luisant Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Who We Are</h2>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-8 leading-tight">
                ABOUT LUISANT SOFTWARE SOLUTIONS
              </h3>
              <div className="w-16 h-1 bg-primary mb-8" />
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Luisant Software Solutions is an innovative technology industry focused, 
                business driven professional services firm. From web design and Software 
                development to custom applications, our talented people work intelligently 
                to solve and manage client's needs. 
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We serve to deliver cost effective interactive technology and design 
                solutions without compromising on quality.
              </p>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[radial-gradient(#1C77C3_1px,transparent_1px)] [background-size:24px_24px] opacity-10 -translate-x-6 translate-y-6" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
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
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-[radial-gradient(#1C77C3_1px,transparent_1px)] [background-size:24px_24px] opacity-10 translate-x-6 -translate-y-6" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1920" 
                  alt="Our Commitment"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Our Promise</h2>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-8 leading-tight">
                OUR COMMITMENTS
              </h3>
              <div className="w-16 h-1 bg-primary mb-8" />
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The quality of Luisant Software Solutions designs and programming is evident 
                in the Web sites and applications we create. Our commitment to quality designs, 
                superior technology enhancement and customer service is paramount.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Satisfying the client is fundamental to our business and has been the leading 
                factor in our growth. We make ourselves available to our clients 24 x 7 for 
                advising, training, and assistance on all their related needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">WE HAVE OVER 13+ YEARS OF EXPERIENCE</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-10" />
          <p className="text-lg text-slate-400 mb-16 leading-relaxed">
            In 2012, Luisant Software Solutions was founded. Since deciding to focus on 
            offering IT services, Luisant has experienced rapid expansion, building 
            websites for clients all over the world.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {[
              { name: "Cool Taxi", img: client1 },
              { name: "Thulir", img: client2 },
              { name: "SaaZ", img: client3 },
              { name: "Sakthi", img: client4 }
            ].map((client, i) => (
              <div key={i} className="bg-white p-6 rounded-xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 group">
                <img src={client.img} alt={client.name} className="max-h-16 w-auto object-contain group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}