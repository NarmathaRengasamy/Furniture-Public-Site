import React, { useState, useEffect } from 'react';
import { X, Star, Check, Sparkles, Box, Truck, Heart, Play, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSaveWishlist: (product: Product) => void;
  isWishlisted?: boolean;
}

export function ProductModal({
  product,
  onClose,
  onSaveWishlist,
  isWishlisted = false,
}: ProductModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);

  useEffect(() => {
    setSelectedImageIdx(0);
    setSelectedColorIdx(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [product, onClose]);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/products/img_p2_1.jpeg'];

  const currentImage = images[selectedImageIdx] || images[0];
  const selectedColor = product.colors?.[selectedColorIdx];

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="modal-container relative bg-white rounded-3xl shadow-2xl border border-stone-200/80 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors z-20"
          onClick={onClose}
          title="Close (Esc)"
        >
          <X size={18} />
        </button>

        <div className="modal-grid grid md:grid-cols-12 gap-8">
          {/* Left Column: Image Gallery & Video Demo */}
          <div className="modal-gallery md:col-span-6 flex flex-col gap-4">
            <div className="gallery-main-image-wrap relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={currentImage}
                alt={`${product.title} - View ${selectedImageIdx + 1}`}
                className="gallery-main-image w-full h-full object-cover transition-all"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  if (images[1]) e.currentTarget.src = images[1];
                }}
              />
              {product.badge && (
                <div className="modal-image-badge absolute top-3 left-3 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles size={13} />
                  <span>{product.badge}</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="gallery-thumbnails flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`gallery-thumb w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIdx === idx ? 'border-terracotta scale-105 shadow-sm' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImageIdx(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {product.videoDemoUrl && (
              <a
                href={product.videoDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary modal-video-cta w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <Play size={16} fill="#DC2626" color="#DC2626" />
                <span>Watch Product Live Demo on YouTube</span>
              </a>
            )}

            <div className="modal-shipping-card p-4 rounded-2xl bg-stone-50 border border-stone-200/70 flex flex-col gap-1">
              <div className="modal-shipping-title flex items-center gap-2 font-semibold text-stone-800 text-xs sm:text-sm">
                <Truck size={16} color="var(--accent-terracotta)" />
                <span>Madurai Factory Direct Dispatch</span>
              </div>
              <p className="modal-shipping-text text-xs text-stone-500 leading-relaxed">
                {product.shippingInfo || 'Safe transport dispatch across all districts of Tamil Nadu and major Indian cities.'}
              </p>
            </div>
          </div>

          {/* Right Column: Full Specifications & Actions */}
          <div className="modal-info md:col-span-6 flex flex-col gap-4">
            <div className="modal-category-tag text-xs font-semibold text-terracotta uppercase tracking-wider">
              {product.category} • {product.room}
            </div>

            <h2 className="modal-title text-2xl sm:text-3xl font-serif text-stone-900 leading-tight">
              {product.title}
            </h2>
            {product.subtitle && (
              <p className="modal-subtitle text-xs sm:text-sm text-stone-500 font-medium">
                {product.subtitle}
              </p>
            )}

            <div className="modal-rating-row flex items-center gap-2 text-xs text-stone-600">
              <div className="modal-stars flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <span className="modal-review-text">
                <strong>{product.rating?.toFixed(1) || '4.8'}</strong> / 5.0 ({product.reviewCount || 45} Reviews)
              </span>
            </div>

            <div className="modal-price-row flex items-baseline gap-3 py-1">
              <span className="modal-price text-2xl sm:text-3xl font-bold text-stone-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="modal-orig-price text-sm line-through text-stone-400">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="modal-save-pill text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            <p className="modal-description text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Swatch Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="swatch-selector-section py-2 border-t border-stone-100">
                <div className="swatch-selector-label text-xs font-medium text-stone-700 mb-2 flex items-center gap-1.5">
                  <span>Color Option:</span>
                  <strong className="text-stone-900">{selectedColor?.name || 'Selected'}</strong>
                </div>
                <div className="swatches-list flex flex-wrap gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      className={`swatch-option-btn w-7 h-7 rounded-full p-0.5 border-2 transition-all ${
                        selectedColorIdx === idx ? 'border-stone-900 scale-110 shadow-sm' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedColorIdx(idx)}
                      title={color.name}
                    >
                      <div className="swatch-color-inner w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Card */}
            <div className="specs-card p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
              <div className="specs-title flex items-center gap-1.5 font-semibold text-stone-900 mb-3">
                <Box size={15} />
                <span>Dimensions &amp; Materials</span>
              </div>
              <div className="specs-grid grid grid-cols-2 gap-2 text-stone-600">
                <div className="spec-item"><span className="text-stone-400">Width:</span> {product.dimensions?.width || 'Standard'}</div>
                <div className="spec-item"><span className="text-stone-400">Depth:</span> {product.dimensions?.depth || 'Standard'}</div>
                <div className="spec-item"><span className="text-stone-400">Height:</span> {product.dimensions?.height || 'Standard'}</div>
                <div className="spec-item"><span className="text-stone-400">Weight:</span> {product.dimensions?.weight || 'Standard'}</div>
              </div>

              {product.materials && product.materials.length > 0 && (
                <div className="mt-3 pt-3 border-t border-stone-200/60">
                  <span className="text-stone-400 block mb-1">Materials:</span>
                  <div className="materials-badges flex flex-wrap gap-1">
                    {product.materials.map((mat, idx) => (
                      <span key={idx} className="material-tag px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-700 font-medium text-[11px]">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features Checklist */}
            {product.features && product.features.length > 0 && (
              <div className="features-section">
                <div className="text-xs font-semibold text-stone-900 mb-2">Key Highlights</div>
                <ul className="features-list space-y-1.5">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="feature-item flex items-start gap-2 text-xs text-stone-600">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="modal-actions-row flex items-center gap-3 pt-2">
              <a
                href={`tel:${COMPANY_INFO.phoneNumber}`}
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-md"
              >
                <Phone size={16} />
                <span>Call Showroom (+91 98421 39565)</span>
              </a>
              <button
                className={`btn-secondary p-3 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted ? 'border-terracotta bg-terracotta/10 text-terracotta' : 'border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
                onClick={() => onSaveWishlist(product)}
                title="Save to Favorites"
              >
                <Heart
                  size={18}
                  color={isWishlisted ? 'var(--accent-terracotta)' : 'currentColor'}
                  fill={isWishlisted ? 'var(--accent-terracotta)' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
