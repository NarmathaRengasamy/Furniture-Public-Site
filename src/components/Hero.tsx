import React from 'react';
import { ArrowDown, Sparkles, FileDown, Play, Truck, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';
import { Product } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onSelectProduct: (product: Product) => void;
  featuredHeroProduct?: Product;
}

export function Hero({
  onExploreClick,
  onSelectProduct,
  featuredHeroProduct,
}: HeroProps) {
  const heroImage = featuredHeroProduct?.images?.[0] || '/products/img_p6_1.jpeg';
  const fallbackImage = featuredHeroProduct?.images?.[1] || '/products/page_6.png';

  return (
    <section id="hero" className="relative bg-[#FAF8F5] py-8 sm:py-12 border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={12} className="text-amber-600" />
              <span>RLX INDIA • DIRECT FACTORY CATALOGUE 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
              Engineered For <em className="italic font-normal text-terracotta">Ultimate</em> Spine Ease &amp; Daily Rest
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Discover Madurai's trusted Easy &amp; Relax Chair collection by <strong>{COMPANY_INFO.name}</strong>. From classic <em>Sambuthatha</em> and multi-angle <em>Rainbow</em> to orthopedic <em>Volvo Cushions</em> and <em>Wooden Bheem Recliners</em>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                id="tour-explore-chairs"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={onExploreClick}
              >
                <span>Explore Chairs</span>
                <ArrowDown size={15} />
              </button>
              <a
                id="tour-pdf-catalogue"
                href={COMPANY_INFO.pdfCatalogueUrl}
                download="RLX_India_Easy_Chair_Catalogue_2026.pdf"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-medium border border-stone-300 bg-white hover:bg-stone-50 transition-all text-stone-800"
              >
                <FileDown size={15} />
                <span>PDF Catalogue</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-stone-200/80 w-full text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Factory Direct Rates</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Truck size={13} className="text-terracotta" />
                <span>Madurai Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck size={13} className="text-amber-600" />
                <span>10+ Years Trust</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-white rounded-3xl p-3.5 sm:p-4 shadow-lg border border-stone-200 transition-all hover:shadow-xl">
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-stone-100 border border-stone-100 flex items-center justify-center">
                <img
                  src={heroImage}
                  alt={featuredHeroProduct?.title || 'RLX India Relax Chair'}
                  className="w-full h-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-terracotta shadow-xs flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Bestseller</span>
                </div>
              </div>

              {featuredHeroProduct && (
                <div className="pt-3 px-1 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-stone-900 text-sm sm:text-base truncate">
                      {featuredHeroProduct.title}
                    </h3>
                    <p className="text-xs text-stone-500 truncate">
                      {featuredHeroProduct.subtitle}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-stone-900">
                      ₹{featuredHeroProduct.price.toLocaleString('en-IN')}
                    </div>
                    <button
                      type="button"
                      className="mt-1 text-xs font-semibold text-terracotta hover:underline cursor-pointer"
                      onClick={() => onSelectProduct(featuredHeroProduct)}
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
