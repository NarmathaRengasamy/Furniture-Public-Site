import React, { useState } from 'react';
import { Building2, Phone, Truck, Calculator, CheckCircle, Palette, PhoneCall, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

interface WholesaleSectionProps {
  onShowToast?: (message: string) => void;
}

export function WholesaleSection({ onShowToast }: WholesaleSectionProps) {
  const [productType, setProductType] = useState<string>('Mid-Century Velvet Lounge Armchairs');
  const [quantity, setQuantity] = useState<number>(10);
  const [city, setCity] = useState<string>('');
  const [buyerType, setBuyerType] = useState<string>('Interior Designer / Studio');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Approximate base unit price for calculator
  const unitPriceMap: Record<string, number> = {
    'Mid-Century Velvet Lounge Armchairs': 14500,
    'Nordic 3-Seater Upholstered Sofas': 34000,
    'Solid Walnut Coffee Tables': 10500,
    'Artisan Solid Oak Dining Tables': 29500,
    'Curved Dining Chairs (Pair)': 9800,
    'Ergonomic High-Back Office Chairs': 12000,
    'Haven Queen Platform Beds': 36000,
  };

  const basePrice = unitPriceMap[productType] || 14500;
  const discountPercent = quantity >= 50 ? 25 : quantity >= 20 ? 18 : quantity >= 10 ? 12 : 5;
  const discountedUnit = Math.round(basePrice * (1 - discountPercent / 100));
  const totalEstimate = discountedUnit * quantity;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(`Trade estimate calculated for ${quantity} units. Call ${COMPANY_INFO.phone} to lock rate.`);
    }
  };

  return (
    <section id="wholesale" className="py-16 sm:py-24 bg-surface-contrast text-charcoal border-t border-[#D8D2C6] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-[#D8D2C6] text-[11px] font-mono text-stone-600 shadow-2xs self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span>Trade program</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal leading-tight">
              Trade pricing for designers, hospitality and corporate projects
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Partner directly with <strong>{COMPANY_INFO.name} ({COMPANY_INFO.brand})</strong>. We supply solid wood dining collections, lounge seating, and desks with dedicated trade account management, tailored swatches, and nationwide insured logistics.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-surface-card border border-[#D8D2C6] text-bronze shrink-0 mt-0.5">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-sm">Tiered trade discounts</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Competitive bulk slab pricing starting from 10 units.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-surface-card border border-[#D8D2C6] text-bronze shrink-0 mt-0.5">
                  <Truck size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-sm">Insured freight &amp; in-room setup</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Scheduled deliveries with transit insurance across major metro regions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-surface-card border border-[#D8D2C6] text-bronze shrink-0 mt-0.5">
                  <Palette size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-sm">Custom finish &amp; textile options</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Custom stains and performance textiles for hospitality projects.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Instant Bulk Quote Estimator */}
          <div className="lg:col-span-6 bg-surface-card text-charcoal rounded-2xl p-6 sm:p-8 shadow-2xs border border-[#D8D2C6]">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#EAE5DC] mb-4">
              <div className="flex items-center gap-2">
                <Calculator size={18} className="text-bronze" />
                <h3 className="text-base font-semibold text-charcoal">
                  Instant trade quote estimator
                </h3>
              </div>
              <span className="text-xs font-semibold text-bronze bg-surface-ground border border-[#D8D2C6] px-2.5 py-0.5 rounded-md tabular-nums">
                {discountPercent}% trade discount
              </span>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Purchasing for:</label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D8D2C6] text-xs sm:text-sm bg-surface-ground focus:outline-none focus:border-bronze"
                >
                  <option value="Interior Designer / Studio">Interior Designer / Architecture Studio</option>
                  <option value="Hospitality (Hotel / Resort / Cafe)">Hospitality (Hotel / Resort / Cafe)</option>
                  <option value="Corporate Office Workspace">Corporate Office Workspace</option>
                  <option value="Residential Development">Real Estate / Model Home Staging</option>
                  <option value="Multi-Room Home Order">Multi-Room Residential Homeowner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Product collection:</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D8D2C6] text-xs sm:text-sm bg-surface-ground focus:outline-none focus:border-bronze"
                >
                  <option value="Mid-Century Velvet Lounge Armchairs">Mid-Century Velvet Lounge Armchairs</option>
                  <option value="Nordic 3-Seater Upholstered Sofas">Nordic 3-Seater Upholstered Sofas</option>
                  <option value="Solid Walnut Coffee Tables">Solid Walnut Coffee Tables</option>
                  <option value="Artisan Solid Oak Dining Tables">Artisan Solid Oak Dining Tables</option>
                  <option value="Curved Dining Chairs (Pair)">Curved Dining Chairs (Pair)</option>
                  <option value="Ergonomic High-Back Office Chairs">Ergonomic High-Back Office Chairs</option>
                  <option value="Haven Queen Platform Beds">Haven Queen Platform Beds</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-stone-700">Estimated quantity:</label>
                  <span className="font-semibold text-charcoal text-sm tabular-nums">{quantity} units</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value));
                    setSubmitted(false);
                  }}
                  className="w-full accent-charcoal cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                  <span>5 units (Sample)</span>
                  <span>25 units (Commercial)</span>
                  <span>100+ units (Enterprise)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Destination city:</label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru, Mumbai, Delhi, Hyderabad..."
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setSubmitted(false);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-[#D8D2C6] text-xs sm:text-sm bg-surface-ground focus:outline-none focus:border-bronze"
                  required
                />
              </div>

              {/* Estimate Summary Box */}
              <div className="p-4 rounded-xl bg-surface-ground border border-[#D8D2C6] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-600">Estimated trade price / unit:</span>
                  <strong className="text-charcoal tabular-nums">₹{discountedUnit.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Volume discount:</span>
                  <span className="text-bronze font-medium tabular-nums">{discountPercent}% OFF</span>
                </div>
                <div className="border-t border-[#D8D2C6] my-1"></div>
                <div className="flex justify-between items-baseline pt-0.5">
                  <span className="font-medium text-charcoal">Estimated total:</span>
                  <span className="text-lg font-semibold text-charcoal tabular-nums">
                    ₹{totalEstimate.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {submitted ? (
                <div className="p-4 rounded-xl bg-surface-ground border border-[#D8D2C6] text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-charcoal font-medium text-xs sm:text-sm">
                    <Check size={15} className="text-bronze" />
                    <span>Quote calculated (₹{totalEstimate.toLocaleString('en-IN')})</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Call our trade consultants directly to confirm specifications and lead times.
                  </p>
                  <a
                    href={`tel:${COMPANY_INFO.phoneNumber}`}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-medium"
                  >
                    <PhoneCall size={14} />
                    <span>Call trade desk ({COMPANY_INFO.phone})</span>
                  </a>
                </div>
              ) : (
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-medium"
                  >
                    <Calculator size={15} />
                    <span>Calculate quote</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phoneNumber}`}
                    className="btn-secondary px-3 py-2 rounded-lg flex items-center justify-center"
                    title="Call trade desk"
                  >
                    <Phone size={15} />
                  </a>
                </div>
              )}

              <div className="text-center text-[11px] text-stone-400 pt-0.5">
                Studio trade desk: <strong>{COMPANY_INFO.phone}</strong> ({COMPANY_INFO.operatingHours})
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
