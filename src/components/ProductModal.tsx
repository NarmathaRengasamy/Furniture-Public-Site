import React, { useState, useEffect } from 'react';
import { X, Star, Check, Box, Truck, Heart, Play, Phone } from 'lucide-react';
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

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'];

  const currentImage = images[selectedImageIdx] || images[0];
  const selectedColor = product.colors?.[selectedColorIdx];

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="modal-container relative bg-surface-card rounded-2xl shadow-xl border border-[#D8D2C6] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn absolute top-5 right-5 w-8 h-8 rounded-lg bg-surface-ground hover:bg-[#E2DDD2] text-stone-700 flex items-center justify-center transition-colors z-20 cursor-pointer"
          onClick={onClose}
          title="Close (Esc)"
        >
          <X size={16} />
        </button>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-[#D8D2C6]">
              <img
                src={currentImage}
                alt={`${product.title} - View ${selectedImageIdx + 1}`}
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  if (images[1]) e.currentTarget.src = images[1];
                }}
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-surface-card/95 backdrop-blur-xs text-charcoal text-xs font-medium px-2.5 py-1 rounded border border-[#D8D2C6] shadow-2xs">
                  {product.badge}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-colors cursor-pointer ${
                      selectedImageIdx === idx ? 'border-charcoal' : 'border-[#D8D2C6] opacity-70 hover:opacity-100'
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
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-surface-ground hover:bg-[#E2DDD2] text-charcoal border border-[#D8D2C6] transition-colors"
              >
                <Play size={13} className="text-stone-600" />
                <span>Watch joinery and timber video</span>
              </a>
            )}

            <div className="p-4 rounded-xl bg-surface-ground border border-[#D8D2C6] flex flex-col gap-1">
              <div className="flex items-center gap-2 font-medium text-charcoal text-xs">
                <Truck size={14} className="text-stone-600" />
                <span>Insured white-glove delivery</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                {product.shippingInfo || 'Carefully packed and insured across major Indian cities.'}
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Specifications */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="text-xs font-mono text-stone-500">
              Atelier specification · {product.category}
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal leading-tight">
              {product.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.subtitle}
            </p>

            {/* Price & Rating */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D2C6]">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif text-charcoal tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs line-through text-stone-400 tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-stone-700 text-xs font-medium">
                <Star size={12} className="fill-[#8A7865] text-[#8A7865]" />
                <span className="tabular-nums">{product.rating?.toFixed(1) || '4.9'}</span>
                <span className="text-stone-400 font-normal">({product.reviewCount || 50} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {product.description}
            </p>

            {/* Finishes */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="text-xs font-medium text-charcoal mb-2">
                  Finish: <span className="text-stone-600 font-normal">{selectedColor?.name}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      className={`w-6 h-6 rounded-full border-2 transition-colors cursor-pointer ${
                        selectedColorIdx === idx ? 'border-charcoal ring-1 ring-charcoal' : 'border-[#D8D2C6]'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColorIdx(idx)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Architectural Specifications Table */}
            <div className="p-4 rounded-xl bg-surface-ground border border-[#D8D2C6] text-xs">
              <div className="flex items-center gap-2 font-medium text-charcoal mb-3">
                <Box size={13} className="text-stone-600" />
                <span>Dimensions &amp; materials</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-stone-600 font-mono text-xs">
                <div><span className="text-stone-400 font-sans">Width:</span> {product.dimensions?.width || 'Standard'}</div>
                <div><span className="text-stone-400 font-sans">Depth:</span> {product.dimensions?.depth || 'Standard'}</div>
                <div><span className="text-stone-400 font-sans">Height:</span> {product.dimensions?.height || 'Standard'}</div>
                <div><span className="text-stone-400 font-sans">Weight:</span> {product.dimensions?.weight || 'Standard'}</div>
              </div>

              {product.materials && product.materials.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#D0C9BD]">
                  <span className="text-stone-400 block mb-1.5 text-xs">Material composition:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.materials.map((mat, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded bg-surface-card text-stone-700 text-xs font-normal border border-[#D8D2C6]">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <div className="text-xs font-medium text-charcoal mb-2">Key highlights</div>
                <ul className="space-y-1.5">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <Check size={13} className="text-stone-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`tel:${COMPANY_INFO.phoneNumber}`}
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs sm:text-sm font-medium"
              >
                <Phone size={14} />
                <span>Call studio desk ({COMPANY_INFO.phone})</span>
              </a>
              <button
                className={`p-3 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted ? 'border-[#D4BABA] bg-[#F4ECEC] text-[#783232]' : 'border-[#D8D2C6] text-stone-700 hover:bg-surface-ground'
                }`}
                onClick={() => onSaveWishlist(product)}
                title="Save to favorites"
              >
                <Heart
                  size={16}
                  color={isWishlisted ? '#783232' : 'currentColor'}
                  fill={isWishlisted ? '#783232' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
