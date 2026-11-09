import React from 'react';
import { ArrowDown, FileDown, ArrowUpRight } from 'lucide-react';
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
  const heroImage =
    featuredHeroProduct?.images?.[0] ||
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80';
  const fallbackImage =
    featuredHeroProduct?.images?.[1] ||
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80';

  return (
    <section id="hero" className="relative bg-surface-ground py-16 sm:py-20 border-b border-[#D8D2C6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Headline and Context */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-[#D8D2C6] text-xs font-mono text-stone-600 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span>Atelier edition · 2026 collection</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-charcoal leading-[1.1] tracking-tight">
              Furniture shaped by timber, proportion, and quiet utility
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Solid European oak dining tables, contoured lounge chairs, and architectural desks handcrafted in our Bengaluru workshop using sustainably harvested hardwoods and generational joinery.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                id="tour-explore-chairs"
                className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                onClick={onExploreClick}
              >
                <span>Explore collection</span>
                <ArrowDown size={14} />
              </button>

              <a
                id="tour-pdf-catalogue"
                href={COMPANY_INFO.pdfCatalogueUrl}
                download="haven_craft_furniture_catalogue_2026.pdf"
                className="btn-secondary inline-flex items-center gap-2 px-4 py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                <FileDown size={14} className="text-stone-500" />
                <span>Catalogue PDF</span>
              </a>
            </div>

            {/* Atelier Technical Provenance Strip */}
            <div className="pt-4 border-t border-[#D8D2C6] w-full grid grid-cols-3 gap-4 text-stone-600">
              <div className="flex flex-col">
                <span className="text-xs font-mono text-stone-400">Provenance</span>
                <span className="text-xs font-medium text-charcoal mt-0.5">Kiln-dried hardwoods</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-stone-400">Joinery</span>
                <span className="text-xs font-medium text-charcoal mt-0.5">Mortise &amp; tenon</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-stone-400">Surface</span>
                <span className="text-xs font-medium text-charcoal mt-0.5">Zero-VOC hardwax</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Specimen */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-surface-card rounded-2xl p-4 border border-[#D8D2C6] shadow-2xs">
              <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-stone-100 border border-[#D8D2C6]">
                <img
                  src={heroImage}
                  alt={featuredHeroProduct?.title || 'Haven & Craft Furniture'}
                  className="w-full h-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <div className="absolute top-3 left-3 bg-surface-card/95 backdrop-blur-xs px-3 py-1 rounded-md text-xs font-medium text-charcoal border border-[#D8D2C6] shadow-2xs">
                  Quarter-sawn white oak · Textured bouclé
                </div>
              </div>

              {featuredHeroProduct && (
                <div className="pt-4 px-1 pb-1 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-medium text-charcoal text-sm truncate">
                      {featuredHeroProduct.title}
                    </h3>
                    <p className="text-xs text-stone-500 truncate mt-0.5">
                      {featuredHeroProduct.subtitle}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-charcoal tabular-nums">
                      ₹{featuredHeroProduct.price.toLocaleString('en-IN')}
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-medium text-bronze hover:text-charcoal transition-colors cursor-pointer mt-0.5"
                      onClick={() => onSelectProduct(featuredHeroProduct)}
                    >
                      <span>Inspect</span>
                      <ArrowUpRight size={12} />
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
