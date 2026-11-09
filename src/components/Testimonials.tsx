import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/catalog';

export function Testimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-surface-ground border-t border-[#D8D2C6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-[#D8D2C6] text-[11px] font-mono text-stone-500 mb-2 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span>Commissions &amp; feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal mb-2 leading-tight">
            Furnishing homes and design studios
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Notes from architects, interior stylists, and homeowners living with Haven &amp; Craft pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-surface-card rounded-xl p-6 border border-[#D8D2C6] shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#8A7865] gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={11} className="fill-[#8A7865] text-[#8A7865]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-stone-400 tabular-nums">{t.date}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div>
                <div className="text-[10px] font-mono text-stone-600 bg-surface-ground border border-[#D8D2C6] px-2 py-0.5 rounded inline-block mb-3">
                  Piece: <span className="text-charcoal font-sans font-medium">{t.product}</span>
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-[#EAE5DC]">
                  <div className="w-6 h-6 rounded-md bg-surface-ground border border-[#D8D2C6] text-stone-700 font-medium text-[11px] flex items-center justify-center shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-charcoal text-xs truncate">{t.name}</span>
                    <div className="flex items-center gap-1 text-[11px] text-stone-400 truncate">
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
