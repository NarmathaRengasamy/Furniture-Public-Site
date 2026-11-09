import React, { useState } from 'react';
import { ChevronDown, PhoneCall, Mail } from 'lucide-react';
import { FAQ_DATA, COMPANY_INFO } from '../data/catalog';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-surface-contrast border-t border-[#D8D2C6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-[#D8D2C6] text-[11px] font-mono text-stone-500 mb-2 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span>Timber care &amp; support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal mb-2 leading-tight">
            Frequently asked questions
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Essential guidance on solid hardwood seasoning, hardwax oil care, and transit packaging.
          </p>
        </div>

        <div className="space-y-3 mb-12">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-surface-card border border-[#D8D2C6] overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  className="w-full p-4 sm:p-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-charcoal text-xs sm:text-sm">
                    {faq.q}
                  </span>
                  <div className={`text-stone-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-stone-700' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-6 pt-0 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-[#EAE5DC]">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Studio consultation card */}
        <div className="p-6 sm:p-8 rounded-xl bg-surface-card border border-[#D8D2C6] text-charcoal flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="sm:max-w-sm">
            <h3 className="text-sm sm:text-base font-medium text-charcoal mb-1">
              Custom dimensions or timber finish samples?
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Connect directly with our woodworking consultants at our Indiranagar workshop.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="btn-primary flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-medium whitespace-nowrap"
            >
              <PhoneCall size={13} />
              <span>Call workshop</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="btn-secondary flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-medium whitespace-nowrap"
            >
              <Mail size={13} />
              <span>Email inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
