import React from 'react';
import { COMPANY_INFO } from '../data/catalog';

export function CraftsmanshipStory() {
  return (
    <section id="craftsmanship" className="py-12 sm:py-16 bg-stone-100/80 border-y border-stone-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column: Story Content */}
          <div className="w-full lg:w-7/12 flex flex-col items-start gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-terracotta text-[11px] font-bold uppercase tracking-widest">
              {COMPANY_INFO.name}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 leading-tight">
              Madurai's Trusted Furniture &amp; Easy Chair Hub
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              For over 10+ years, <strong>{COMPANY_INFO.name} ({COMPANY_INFO.brand})</strong> has engineered furniture that stands the test of time. Every relax chair combines high-gauge tubular steel frames, multi-layer powder coating, and high-tensile nylon webbing or seasoned solid hardwood crafted for lasting spinal support and zero sag.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full pt-4 border-t border-stone-200/80">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-terracotta leading-snug">
                  10+
                </div>
                <div className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1">
                  Years Manufacturing
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-terracotta leading-snug">
                  150 kg+
                </div>
                <div className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1">
                  Tested Load
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-terracotta leading-snug">
                  50k+
                </div>
                <div className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1">
                  Happy Homes
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Product Photos */}
          <div className="w-full lg:w-5/12 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-52 sm:h-64 w-full rounded-2xl overflow-hidden bg-white shadow-md border border-stone-200">
                <img
                  src="/products/img_p6_1.jpeg"
                  alt="Volvo Orthopedic Cushion Easy Chair"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-center text-[11px] sm:text-xs font-semibold text-stone-700">
                Volvo Orthopedic Cushion
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-52 sm:h-64 w-full rounded-2xl overflow-hidden bg-white shadow-md border border-stone-200">
                <img
                  src="/products/img_p5_1.jpeg"
                  alt="Wooden Bheem Relax Chair Handcrafted"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-center text-[11px] sm:text-xs font-semibold text-stone-700">
                Solid Teak Wooden Bheem
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
