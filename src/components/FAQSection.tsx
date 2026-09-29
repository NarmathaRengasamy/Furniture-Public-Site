import React, { useState } from 'react';
import { HelpCircle, ChevronDown, PhoneCall, Mail } from 'lucide-react';
import { FAQ_DATA, COMPANY_INFO } from '../data/catalog';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-stone-100/60 border-t border-stone-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle size={13} className="text-amber-700" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 mb-2 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Everything you need to know about our relax chairs, materials, transport shipping, and wholesale guarantees.
          </p>
        </div>

        <div className="space-y-3 mb-10">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-white border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-terracotta/40 shadow-sm' : 'border-stone-200/80'
                }`}
              >
                <button
                  type="button"
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                    {faq.q}
                  </span>
                  <div className={`text-stone-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-terracotta' : ''}`}>
                    <ChevronDown size={17} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 text-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="sm:max-w-sm">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-1">
              Need custom dimensions or model advice?
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Speak directly with our factory showroom team in Madurai. We are happy to assist you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="btn-primary flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-sm whitespace-nowrap"
            >
              <PhoneCall size={14} />
              <span>Call Showroom</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="btn-secondary flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-800 whitespace-nowrap"
            >
              <Mail size={14} />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
