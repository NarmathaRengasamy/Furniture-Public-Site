import React from 'react';

export function CraftsmanshipStory() {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-surface-contrast border-y border-[#D8D2C6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Story Content */}
          <div className="w-full lg:w-7/12 flex flex-col items-start gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-[#D8D2C6] text-xs font-mono text-stone-600 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span>Atelier philosophy · Craft discipline</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal leading-tight">
              Shaped by hand, calibrated by architectural discipline
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Every dining table, lounge chair, platform bed, and workspace desk begins with sustainably harvested hardwoods, seasoned in computerized kilns to an optimal 8–10% moisture level to eliminate warping. We eschew hidden sheet goods and quick-assembly brackets in favor of generational mortise-and-tenon joinery and botanical hardwax oils that allow the timber to breathe and patina gracefully over decades.
            </p>

            {/* Atelier Metric Pillars */}
            <div className="grid grid-cols-3 gap-3 w-full pt-4 border-t border-[#D8D2C6]">
              <div className="p-4 rounded-xl bg-surface-card border border-[#D8D2C6] shadow-2xs flex flex-col justify-center">
                <div className="text-2xl font-serif text-charcoal tabular-nums">
                  10+
                </div>
                <div className="text-xs font-mono text-stone-500 mt-1">
                  Years of craft
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-card border border-[#D8D2C6] shadow-2xs flex flex-col justify-center">
                <div className="text-2xl font-serif text-charcoal tabular-nums">
                  100%
                </div>
                <div className="text-xs font-mono text-stone-500 mt-1">
                  Kiln-dried timber
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-card border border-[#D8D2C6] shadow-2xs flex flex-col justify-center">
                <div className="text-2xl font-serif text-charcoal tabular-nums">
                  5-year
                </div>
                <div className="text-xs font-mono text-stone-500 mt-1">
                  Frame warranty
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Editorial Workshop / Product Photographs */}
          <div className="w-full lg:w-5/12 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-60 sm:h-72 w-full rounded-xl overflow-hidden bg-surface-card shadow-2xs border border-[#D8D2C6]">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
                  alt="Nordic Deep-Seat Upholstered Sofa"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono text-stone-500">
                Figure 01: European oak plinth &amp; bouclé weave
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-60 sm:h-72 w-full rounded-xl overflow-hidden bg-surface-card shadow-2xs border border-[#D8D2C6]">
                <img
                  src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80"
                  alt="Artisan Solid Oak Dining Table"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono text-stone-500">
                Figure 02: Hand-rubbed hardwax oil finish
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
