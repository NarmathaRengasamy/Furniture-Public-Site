import React, { useState } from 'react';
import { Phone, Clock, MapPin, FileDown, PhoneCall, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

export function Footer() {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand & Address Column */}
          <div className="flex flex-col gap-3">
            <div className="text-xl font-serif text-white font-bold">{COMPANY_INFO.name}</div>
            <div className="text-xs text-amber-500 font-bold uppercase tracking-widest">{COMPANY_INFO.brand}</div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Madurai's premier manufacturer and wholesale dealer of relaxing easy chairs, solid wood furniture, stainless steel panthi tables, and ergonomic office solutions.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Phone size={13} className="text-amber-500 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneNumber}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone} (Showroom Hotline)
                </a>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <Clock size={13} className="shrink-0" />
                <span>{COMPANY_INFO.operatingHours}</span>
              </div>
              <div className="flex items-start gap-2 text-stone-400">
                <MapPin size={13} className="shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Popular Collections */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">Popular Collections</div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">Sambuthatha Relax Chair</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Rainbow Multi Easy Chair</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Imported Fabric Recliner</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Wooden Bheem Relax Chair</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Volvo Orthopedic Cushion Chair</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Comfort Zone Zero-Gravity Chair</a></li>
            </ul>
          </div>

          {/* Furniture & Commercial */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">Tables &amp; Furniture</div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">SS Panthi Dining Tables</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Virgin Plastic Arm Chairs</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Executive Office Chairs</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Traditional Teak Swings</a></li>
              <li className="pt-2">
                <a
                  href={COMPANY_INFO.pdfCatalogueUrl}
                  download="RLX_India_Easy_Chair_Catalogue_2026.pdf"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  <FileDown size={13} />
                  <span>Download April 2026 PDF</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Inquiries */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Direct Showroom Contact</div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Speak directly with our factory experts in Madurai for stock availability, color choices, and custom models.
            </p>
            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-terracotta hover:bg-terracotta-hover text-white transition-colors"
            >
              <PhoneCall size={14} />
              <span>Call +91 98421 39565</span>
            </a>

            {/* Quick newsletter signup */}
            <div className="mt-2">
              <div className="text-[11px] text-stone-400 mb-1">
                Receive wholesale updates &amp; seasonal catalogs:
              </div>
              {subscribed ? (
                <div className="text-xs text-emerald-400 font-semibold">
                  ✓ Thank you! We will share our latest catalogs.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name} ({COMPANY_INFO.brand}). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 transition-colors">
              Official Website: rlxindia.in
            </a>
            <a href="https://www.facebook.com/DhyanalingaEnterprises18" target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 transition-colors">
              Facebook
            </a>
            <a href="https://www.instagram.com/dhyanalinga_enterprises/" target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
