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
    <footer className="bg-surface-contrast text-stone-700 pt-16 pb-12 border-t border-[#D8D2C6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#D0C9BD]">
          {/* Brand & Address Column */}
          <div className="flex flex-col gap-4">
            <div className="text-xl font-serif text-charcoal tracking-tight">{COMPANY_INFO.name}</div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Woodworking studio and workshop crafting solid timber dining tables, tailored living room seating, and architectural desks in Bengaluru.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Phone size={13} className="text-stone-500 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneNumber}`} className="hover:text-charcoal transition-colors tabular-nums font-mono font-medium">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
                <Clock size={13} className="shrink-0" />
                <span>{COMPANY_INFO.operatingHours}</span>
              </div>
              <div className="flex items-start gap-2 text-stone-600 text-xs">
                <MapPin size={13} className="shrink-0 mt-0.5 text-stone-500" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Living & Bedroom Collections */}
          <div>
            <div className="text-xs font-mono text-charcoal mb-3 font-medium">
              Living &amp; bedroom
            </div>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Mid-Century Velvet Armchair</a></li>
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Nordic 3-Seater Sofa</a></li>
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Solid Walnut Coffee Table</a></li>
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Haven Queen Platform Bed</a></li>
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">All-Weather Patio Lounge</a></li>
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Modern Teak Porch Swing</a></li>
            </ul>
          </div>

          {/* Dining & Office Collections */}
          <div>
            <div className="text-xs font-mono text-charcoal mb-3 font-medium">
              Dining &amp; office
            </div>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Solid Oak 6-Seater Table</a></li>
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Curved Dining Chairs (Pair)</a></li>
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Ergonomic High-Back Office Chair</a></li>
              <li><a href="#catalog" className="hover:text-charcoal transition-colors">Minimalist Solid Oak Desk</a></li>
              <li className="pt-2">
                <a
                  href={COMPANY_INFO.pdfCatalogueUrl}
                  download="haven_craft_furniture_catalogue_2026.pdf"
                  className="inline-flex items-center gap-2 text-stone-700 hover:text-charcoal font-medium transition-colors"
                >
                  <FileDown size={13} className="text-stone-500" />
                  <span>Download 2026 catalogue PDF</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Workshop Inquiries & Newsletter */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono text-charcoal font-medium">
              Studio inquiries
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Connect with our workshop team for bespoke dimensions, wood finish swatches, and trade quotations.
            </p>
            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-medium btn-primary"
            >
              <PhoneCall size={13} />
              <span>Call workshop desk</span>
            </a>

            {/* Lookbook dispatch */}
            <div className="mt-2">
              <div className="text-xs font-mono text-stone-500 mb-2">
                Collection dispatches
              </div>
              {subscribed ? (
                <div className="text-xs text-charcoal font-medium bg-surface-card border border-[#D8D2C6] p-3 rounded-lg">
                  Thank you. We will notify you for our next release.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="architect@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-surface-card border border-[#D8D2C6] rounded-lg text-xs text-charcoal placeholder-stone-400 focus:outline-none focus:border-bronze font-mono"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 btn-primary rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    title="Subscribe"
                  >
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="font-mono text-xs">
            © {new Date().getFullYear()} {COMPANY_INFO.name} ({COMPANY_INFO.brand}). Handcrafted in India.
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">
              Studio site
            </a>
            <span className="opacity-40">/</span>
            <a href="#" className="hover:text-charcoal transition-colors">
              Privacy
            </a>
            <span className="opacity-40">/</span>
            <a href="#" className="hover:text-charcoal transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
