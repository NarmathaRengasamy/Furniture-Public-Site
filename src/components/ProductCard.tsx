import React from 'react';
import { Star, Heart, ArrowUpRight } from 'lucide-react';
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
  const mainImage =
    product.images?.[0] ||
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80';

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    } 
  };

  // Format short dimensions tag
  const dimTag = product.dimensions?.width && product.dimensions?.depth
    ? `${product.dimensions.width.split(' ')[0]} × ${product.dimensions.depth.split(' ')[0]} cm`
    : null;

  return (
    <div
      className="product-card group bg-surface-card rounded-xl overflow-hidden border border-[#D8D2C6] shadow-2xs hover:border-stone-400 transition-colors duration-150 flex flex-col cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-4/3 overflow-hidden bg-stone-100 flex items-center justify-center">
        <img
          src={mainImage}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            if (product.images?.[1]) {
              e.currentTarget.src = product.images[1];
            }
          }}
        />

        {/* Status Chip */}
        <div className="absolute top-3 left-3 z-10">
          {!product.inStock ? (
            <span className="bg-charcoal/85 backdrop-blur-xs text-surface-card text-xs font-mono px-2 py-0.5 rounded border border-white/10">
              Made to order
            </span>
          ) : product.badge ? (
            <span className="bg-surface-card/95 backdrop-blur-xs text-charcoal text-xs font-medium px-2 py-0.5 rounded border border-[#D8D2C6] shadow-2xs">
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`absolute top-3 right-3 w-7 h-7 rounded-md flex items-center justify-center border transition-colors cursor-pointer z-10 ${
            isWishlisted
              ? 'bg-[#F4ECEC] border-[#D4BABA] text-[#783232]'
              : 'bg-surface-card/90 backdrop-blur-xs border-[#D8D2C6] text-stone-600 hover:text-charcoal shadow-2xs'
          }`}
          title={isWishlisted ? 'Remove from saved' : 'Save to favorites'}
          onClick={handleWishlist}
        >
          <Heart
            size={13}
            fill={isWishlisted ? '#783232' : 'none'}
            color={isWishlisted ? '#783232' : 'currentColor'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category & Architectural Dimension Tag */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
          <span className="font-mono text-xs text-stone-500 truncate max-w-36">
            {product.category}
          </span>
          {dimTag ? (
            <span className="font-mono text-xs text-stone-500 tabular-nums">
              [{dimTag}]
            </span>
          ) : (
            <div className="flex items-center gap-1 text-stone-600 font-medium text-xs">
              <Star size={11} className="fill-[#8A7865] text-[#8A7865]" />
              <span className="tabular-nums">{product.rating?.toFixed(1) || '4.8'}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-charcoal group-hover:text-stone-700 transition-colors line-clamp-1">
          {product.title}
        </h3>

        {/* Subtitle / Wood & Fabric Spec */}
        <p className="text-xs text-stone-500 mt-1 line-clamp-1 leading-relaxed">
          {product.materials?.[0] ? `${product.materials[0]} · ` : ''}{product.subtitle}
        </p>

        {/* Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#EAE5DC]">
            {product.colors.slice(0, 4).map((color, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-[#D0C9BE] shadow-2xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="ml-auto text-xs font-mono text-stone-400 tabular-nums">
              {product.colors.length} finishes
            </span>
          </div>
        )}

        {/* Pricing & Inspect Link */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-charcoal tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs line-through text-stone-400 tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 group-hover:text-bronze transition-colors">
            <span>Inspect</span>
            <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}
