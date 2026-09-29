import React from 'react';
import { Star, CheckCircle2, MapPin, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/catalog';

export function Testimonials() {
  return (
    <section id="reviews" className="py-14 sm:py-16 bg-[#FAF8F5] border-t border-stone-200/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Star size={12} className="fill-amber-500 text-amber-500" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 mb-2 leading-tight">
            Loved by Over 50,000+ Homes
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Real feedback from families and business owners across Tamil Nadu who rely on RLX India relax chairs for daily rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">{t.date}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic mb-3.5">
                  "{t.comment}"
                </p>
              </div>

              <div>
                <div className="text-[10px] text-terracotta font-medium bg-terracotta/5 px-2 py-0.5 rounded-md inline-block mb-2.5">
                  Model: <strong>{t.product}</strong>
                </div>

                <div className="flex items-center gap-2.5 pt-2.5 border-t border-stone-100">
                  <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-stone-900 text-xs truncate">{t.name}</span>
                      {t.verified && (
                        <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-stone-400 truncate">
                      <MapPin size={9} />
                      <span className="truncate">{t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
