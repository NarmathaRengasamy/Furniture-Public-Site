import React, { useState } from 'react';
import { Play, Eye, Phone, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';
import { Product } from '../types';

interface SpotlightProps {
  products?: Product[];
  onSelectProduct: (product: Product) => void;
}

export function Spotlight({ products = [], onSelectProduct }: SpotlightProps) {
  const spotlightItems = products.filter((p) => p.isFeatured).slice(0, 4);
  const [activeTab, setActiveTab] = useState<number>(0);

  const activeProduct = spotlightItems[activeTab] || spotlightItems[0];
  if (!activeProduct) return null;

  return (
    <section id="spotlight" className="py-16 sm:py-24 bg-surface-contrast relative overflow-hidden border-b border-[#D8D2C6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-[#D8D2C6] text-[11px] font-mono text-stone-600 mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span>Atelier study · Signature designs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal mb-3 leading-tight">
            Architectural form and honest materials
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            A closer study of four defining pieces, proportioned for spatial balance, honest joinery, and daily resilience.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {spotlightItems.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-charcoal text-surface-card border-charcoal shadow-2xs'
                    : 'bg-surface-card text-stone-600 hover:text-charcoal hover:bg-[#EAE5DC] border-[#D8D2C6]'
                }`}
                onClick={() => setActiveTab(idx)}
              >
                <span className="font-mono text-[10px] text-stone-400">
                  0{idx + 1}
                </span>
                <span className="truncate max-w-36 sm:max-w-none">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Specimen Card */}
        <div className="max-w-4xl mx-auto bg-surface-card rounded-2xl border border-[#D8D2C6] p-6 sm:p-8 shadow-xs">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Image Preview */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-stone-100 border border-[#D8D2C6]">
                <img
                  src={activeProduct.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    if (activeProduct.images?.[1]) e.currentTarget.src = activeProduct.images[1];
                  }}
                />
                <div className="absolute top-3 left-3 bg-surface-card/90 backdrop-blur-xs text-charcoal text-[10px] font-mono px-2 py-0.5 rounded border border-[#D8D2C6] shadow-2xs">
                  Specimen #{activeProduct.id?.replace('prod-', '') || '01'}
                </div>
              </div>

              {activeProduct.videoDemoUrl && (
                <a
                  href={activeProduct.videoDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-surface-ground hover:bg-[#E2DDD2] text-charcoal border border-[#D8D2C6] text-xs font-medium transition-colors"
                >
                  <Play size={12} className="text-stone-500" />
                  <span>Watch timber detail video</span>
                </a>
              )}
            </div>

            {/* Right Column: Architectural Content Details */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <div className="text-[11px] font-mono text-stone-500">
                {activeProduct.category} · {activeProduct.room}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-charcoal leading-snug">
                {activeProduct.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeProduct.description}
              </p>

              {/* Architectural Specimen Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-surface-ground border border-[#D8D2C6] text-xs">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block">Materials</span>
                  <span className="text-charcoal font-medium truncate block">
                    {activeProduct.materials?.[0] || 'Kiln-Dried Hardwood'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block">Joinery</span>
                  <span className="text-charcoal font-medium truncate block">
                    Mortise &amp; Tenon
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block">Dimensions</span>
                  <span className="text-charcoal font-medium tabular-nums truncate block">
                    {activeProduct.dimensions?.width} × {activeProduct.dimensions?.depth}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block">Finishes</span>
                  <span className="text-charcoal font-medium truncate block">
                    {activeProduct.colors?.length || 3} Studio Options
                  </span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-serif text-charcoal tabular-nums">
                  ₹{activeProduct.price.toLocaleString('en-IN')}
                </span>
                {activeProduct.originalPrice && activeProduct.originalPrice > activeProduct.price && (
                  <span className="text-xs line-through text-stone-400 tabular-nums">
                    ₹{activeProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[10px] text-stone-500 ml-auto font-mono">
                  Direct workshop
                </span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  onClick={() => onSelectProduct(activeProduct)}
                >
                  <Eye size={13} />
                  <span>Inspect piece</span>
                  <ArrowUpRight size={12} />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneNumber}`}
                  className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                >
                  <Phone size={13} className="text-stone-500" />
                  <span>Contact workshop</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
