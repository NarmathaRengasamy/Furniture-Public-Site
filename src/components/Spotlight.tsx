import React, { useState } from 'react';
import { Sparkles, Play, CheckCircle2, Phone, Eye } from 'lucide-react';
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
    <section id="spotlight" className="py-12 sm:py-16 bg-stone-900 text-stone-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/25">
            <Sparkles size={13} />
            <span>Signature Flagship Series</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-2 leading-tight">
            Engineered for Lifelong Ergonomic Ease
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Handcrafted with heavy-gauge steel alloy, weather-resistant nylon webbing, and orthopedic cushioning.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {spotlightItems.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-terracotta text-white shadow-lg scale-105'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700/60'
                }`}
                onClick={() => setActiveTab(idx)}
              >
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isActive ? 'bg-black/25 text-white' : 'bg-stone-700 text-stone-400'}`}>
                  {item.badge || `0${idx + 1}`}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Spotlight Showcase Card */}
        <div className="max-w-4xl mx-auto bg-stone-800/90 rounded-3xl border border-stone-700/80 p-5 sm:p-8 shadow-2xl">
          <div className="grid md:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Contained Image Preview */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-stone-950 border border-stone-700/60 flex items-center justify-center p-2">
                <img
                  src={activeProduct.images?.[0] || '/products/img_p2_1.jpeg'}
                  alt={activeProduct.title}
                  className="w-full h-full object-contain"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    if (activeProduct.images?.[1]) e.currentTarget.src = activeProduct.images[1];
                  }}
                />
                {activeProduct.badge && (
                  <div className="absolute top-3 left-3 bg-terracotta text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    {activeProduct.badge}
                  </div>
                )}
              </div>

              {activeProduct.videoDemoUrl && (
                <a
                  href={activeProduct.videoDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-semibold transition-all"
                  title="Watch Live YouTube Demo"
                >
                  <Play size={13} fill="#EF4444" className="text-red-500" />
                  <span>Watch YouTube Live Recline Demo</span>
                </a>
              )}
            </div>

            {/* Right Column: Content Details */}
            <div className="md:col-span-7 flex flex-col gap-3">
              <div className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                {activeProduct.category} • {activeProduct.room}
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-white">{activeProduct.title}</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
                {activeProduct.description}
              </p>

              <div className="flex items-baseline gap-3 py-1">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  ₹{activeProduct.price.toLocaleString('en-IN')}
                </span>
                {activeProduct.originalPrice && (
                  <>
                    <span className="text-xs line-through text-stone-400">
                      ₹{activeProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                      Save ₹{(activeProduct.originalPrice - activeProduct.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 py-1">
                {activeProduct.features?.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-stone-300">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Swatches */}
              {activeProduct.colors && activeProduct.colors.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-stone-400">Finishes:</span>
                  <div className="flex gap-1.5 items-center">
                    {activeProduct.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="text-xs text-stone-400 ml-1">
                      ({activeProduct.colors.length} options)
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="btn-primary flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md cursor-pointer"
                  onClick={() => onSelectProduct(activeProduct)}
                >
                  <Eye size={14} />
                  <span>Inspect Model</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneNumber}`}
                  className="btn-secondary flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-700 hover:bg-stone-600 text-white border-stone-600"
                >
                  <Phone size={13} />
                  <span>Call Showroom</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
