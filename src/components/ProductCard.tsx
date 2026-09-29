import React from 'react';
import { Star, Eye, ArrowUpRight, Play, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onSelect,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const mainImage = product.images?.[0] || '/products/img_p2_1.jpeg';

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <div
      className="product-card group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
      onClick={() => onSelect(product)}
    >
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-stone-100 flex items-center justify-center p-2">
        <img
          src={mainImage}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            if (product.images?.[1]) {
              e.currentTarget.src = product.images[1];
            }
          }}
        />

        {/* Single Primary Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {!product.inStock ? (
            <span className="bg-stone-800 text-stone-200 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              Custom Order
            </span>
          ) : product.badge ? (
            <span className="bg-terracotta text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </span>
          ) : product.isNewArrival ? (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              New 2026
            </span>
          ) : null}
        </div>

        {/* Floating actions */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {product.videoDemoUrl && (
            <a
              href={product.videoDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-sm transition-transform hover:scale-110"
              title="Watch Live YouTube Demo"
            >
              <Play size={11} fill="#FFFFFF" className="translate-x-0.5" />
            </a>
          )}
          <button
            type="button"
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-red-50 text-red-500'
                : 'bg-white/90 text-stone-700 hover:bg-white hover:text-terracotta'
            }`}
            title={isWishlisted ? 'Remove from Saved' : 'Save to Favorites'}
            onClick={handleWishlist}
          >
            <Heart
              size={13}
              fill={isWishlisted ? 'var(--accent-terracotta)' : 'none'}
              color={isWishlisted ? 'var(--accent-terracotta)' : 'currentColor'}
            />
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-white/90 text-stone-700 hover:bg-white hover:text-terracotta flex items-center justify-center shadow-sm transition-transform hover:scale-110 cursor-pointer"
            title="Inspect Details"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
          >
            <Eye size={13} />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span className="font-medium truncate max-w-42.5">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>{product.rating?.toFixed(1) || '4.8'}</span>
            <span className="text-stone-400 font-normal text-[11px]">({product.reviewCount || 45})</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-stone-900 group-hover:text-terracotta transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2 leading-relaxed">
          {product.subtitle || product.description}
        </p>

        {/* Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-stone-100">
            {product.colors.slice(0, 4).map((color, idx) => (
              <span
                key={idx}
                className="w-3 h-3 rounded-full border border-stone-200 shadow-2xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="ml-auto text-[10px] text-stone-400 font-medium">
              {product.colors.length} Finishes
            </span>
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-stone-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs line-through text-stone-400">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] text-emerald-600 font-semibold">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 group-hover:bg-terracotta group-hover:text-white text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
          >
            <span>Inspect</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
