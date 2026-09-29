import React, { useState } from 'react';
import { Building2, Phone, Truck, Calculator, CheckCircle, Sparkles, PhoneCall, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

interface WholesaleSectionProps {
  onShowToast?: (message: string) => void;
}

export function WholesaleSection({ onShowToast }: WholesaleSectionProps) {
  const [productType, setProductType] = useState<string>('Easy Chairs (Sambuthatha / Rainbow / Volvo)');
  const [quantity, setQuantity] = useState<number>(10);
  const [city, setCity] = useState<string>('');
  const [buyerType, setBuyerType] = useState<string>('Retail Store / Dealer');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Approximate base unit price for calculator
  const unitPriceMap: Record<string, number> = {
    'Easy Chairs (Sambuthatha / Rainbow / Volvo)': 2950,
    'SS Panthi Dining Tables': 7800,
    'Plastic Chairs (Pack of 4)': 2800,
    'Wooden Bheem Relax Chairs': 5200,
    'Executive Office Chairs': 5800,
    'Traditional Swings': 11000,
  };

  const basePrice = unitPriceMap[productType] || 2950;
  const discountPercent = quantity >= 50 ? 25 : quantity >= 20 ? 18 : quantity >= 10 ? 12 : 5;
  const discountedUnit = Math.round(basePrice * (1 - discountPercent / 100));
  const totalEstimate = discountedUnit * quantity;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onShowToast) {
      onShowToast(`Bulk quote estimated for ${quantity} units! Call ${COMPANY_INFO.phone} to lock rate.`);
    }
  };

  return (
    <section id="wholesale" className="wholesale-section py-16 bg-stone-900 text-stone-100 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="wholesale-grid grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Value Prop */}
          <div className="wholesale-info lg:col-span-6 flex flex-col gap-5">
            <div className="section-tag inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Building2 size={14} />
              <span>Direct Factory Wholesale &amp; Institutional Supply</span>
            </div>

            <h2 className="section-heading text-3xl sm:text-4xl font-serif text-white leading-tight">
              Wholesale Supply for Dealers, Marriage Halls &amp; Caterers
            </h2>

            <p className="wholesale-desc text-stone-300 text-sm sm:text-base leading-relaxed">
              Partner directly with <strong>{COMPANY_INFO.name} ({COMPANY_INFO.brand})</strong> in Madurai. We manufacture and supply heavy-duty relax chairs, banquet stainless steel tables, stackable chairs, and swings in bulk with direct lorry transport dispatch across South India.
            </p>

            <div className="wholesale-perks flex flex-col gap-4 pt-2">
              <div className="wholesale-perk-item flex items-start gap-3.5">
                <div className="wholesale-perk-icon p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Tiered Factory Wholesale Pricing</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Unbeatable bulk slab discounts starting from just 10 units.</p>
                </div>
              </div>

              <div className="wholesale-perk-item flex items-start gap-3.5">
                <div className="wholesale-perk-icon p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <Truck size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Doorstep Lorry Transport Delivery</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Reliable freight dispatches to all Tamil Nadu districts, Karnataka &amp; Kerala.</p>
                </div>
              </div>

              <div className="wholesale-perk-item flex items-start gap-3.5">
                <div className="wholesale-perk-icon p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Custom Color &amp; Cushion Options</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Custom upholstery patterns, branding, and frame coatings for large institutional orders.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Instant Bulk Quote Estimator */}
          <div className="wholesale-calculator-card lg:col-span-6 bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
            <div className="calculator-header flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <div className="flex items-center gap-2">
                <Calculator size={20} className="text-terracotta" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Instant Bulk Quote Estimator
                </h3>
              </div>
              <span className="calculator-badge text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                {discountPercent}% Bulk Discount
              </span>
            </div>

            <form onSubmit={handleInquirySubmit} className="calculator-form space-y-4">
              <div className="form-group">
                <label className="form-label block text-xs font-semibold text-stone-700 mb-1.5">I am purchasing for:</label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value)}
                  className="form-input w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                >
                  <option value="Retail Furniture Store / Dealer">Furniture Store / Reseller</option>
                  <option value="Marriage / Banquet Hall & Catering">Marriage / Banquet Hall &amp; Catering</option>
                  <option value="Hotel / Resort / Farmhouse">Hotel / Resort / Farmhouse</option>
                  <option value="Hospital / Care Home">Hospital / Elderly Care Center</option>
                  <option value="Direct Consumer (Multi-Piece Home Order)">Large Family / Multiple Home Units</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label block text-xs font-semibold text-stone-700 mb-1.5">Product of Interest:</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="form-input w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                >
                  <option value="Easy Chairs (Sambuthatha / Rainbow / Volvo)">Easy &amp; Relax Chairs (Tubular)</option>
                  <option value="SS Panthi Dining Tables">Stainless Steel Panthi Dining Tables</option>
                  <option value="Plastic Chairs (Pack of 4)">Virgin Plastic Arm Chairs</option>
                  <option value="Wooden Bheem Relax Chairs">Solid Teak Wooden Bheem Recliners</option>
                  <option value="Executive Office Chairs">Executive High-Back Office Chairs</option>
                  <option value="Traditional Swings">Solid Teak Balcony Swings (Oonjal)</option>
                </select>
              </div>

              <div className="form-group">
                <div className="flex justify-between items-center mb-1">
                  <label className="form-label text-xs font-semibold text-stone-700">Estimated Quantity:</label>
                  <span className="font-bold text-terracotta text-sm">{quantity} Units</span>
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
                  className="calculator-range w-full accent-terracotta cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>5 Units (Trial)</span>
                  <span>25 Units (Dealer)</span>
                  <span>100+ Units (Banquet)</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label block text-xs font-semibold text-stone-700 mb-1.5">Delivery City / District:</label>
                <input
                  type="text"
                  placeholder="e.g. Madurai, Chennai, Coimbatore, Salem..."
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setSubmitted(false);
                  }}
                  className="form-input w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  required
                />
              </div>

              {/* Estimate Summary Box */}
              <div className="quote-summary-box p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
                <div className="quote-row flex justify-between">
                  <span className="text-stone-500">Approx. Wholesale Price/Unit:</span>
                  <strong className="text-stone-800">₹{discountedUnit.toLocaleString('en-IN')}</strong>
                </div>
                <div className="quote-row flex justify-between">
                  <span className="text-stone-500">Slab Discount:</span>
                  <span className="text-emerald-700 font-bold">{discountPercent}% OFF</span>
                </div>
                <div className="quote-divider border-t border-stone-200 my-1"></div>
                <div className="quote-row total flex justify-between items-baseline pt-1">
                  <span className="font-semibold text-stone-800">Estimated Total:</span>
                  <span className="quote-total-price text-lg sm:text-xl font-bold text-terracotta">
                    ₹{totalEstimate.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {submitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-xs sm:text-sm">
                    <Check size={16} />
                    <span>Estimate Calculated (₹{totalEstimate.toLocaleString('en-IN')})</span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Call our Madurai factory wholesale team directly to lock this special bulk price.
                  </p>
                  <a
                    href={`tel:${COMPANY_INFO.phoneNumber}`}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-md"
                  >
                    <PhoneCall size={16} />
                    <span>Call Factory Wholesale Desk (+91 98421 39565)</span>
                  </a>
                </div>
              ) : (
                <div className="flex gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-md"
                  >
                    <Calculator size={16} />
                    <span>Calculate &amp; Confirm Quote</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phoneNumber}`}
                    className="btn-secondary px-4 py-3 rounded-xl flex items-center justify-center"
                    title="Call Wholesale Desk"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              )}

              <div className="text-center text-[11px] text-stone-400 pt-1">
                Madurai Factory Wholesale Desk: <strong>+91 98421 39565</strong> (Mon - Sat: 9:30 AM to 7:00 PM)
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
