import React from 'react';
import { Search, X, SlidersHorizontal, Check } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';

interface FilterToolbarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchTerm: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onInStockToggle: (checked: boolean) => void;
}

export function FilterToolbar({
  activeCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockToggle,
}: FilterToolbarProps) {
  return (
    <div className="bg-surface-card rounded-xl border border-[#D8D2C6] p-4 mb-8 shadow-2xs">
      {/* Category Tabs */}
      <div className="overflow-x-auto scrollbar-none pb-2 mb-3">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-charcoal text-surface-card shadow-2xs'
                    : 'text-stone-600 hover:text-charcoal hover:bg-[#EAE5DC]'
                }`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between pt-2 border-t border-[#EAE5DC]">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search collection..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-surface-ground border border-[#D8D2C6] rounded-lg text-xs text-charcoal placeholder-stone-400 focus:outline-none focus:bg-surface-card focus:border-bronze transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            type="button"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer select-none ${
              inStockOnly
                ? 'border-charcoal bg-charcoal text-surface-card'
                : 'border-[#D8D2C6] bg-surface-ground text-stone-700 hover:bg-[#EAE5DC]'
            }`}
            onClick={() => onInStockToggle(!inStockOnly)}
          >
            <div
              className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                inStockOnly
                  ? 'bg-surface-card border-surface-card text-charcoal'
                  : 'bg-surface-card border-[#D0C9BE]'
              }`}
            >
              {inStockOnly && <Check size={10} strokeWidth={3} />}
            </div>
            <span>In stock only</span>
          </button>

          <div className="relative flex items-center">
            <SlidersHorizontal size={13} className="absolute left-3 text-stone-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="pl-8 pr-8 py-2 bg-surface-ground border border-[#D8D2C6] rounded-lg text-xs text-charcoal font-medium focus:outline-none focus:border-bronze transition-colors cursor-pointer appearance-none"
            >
              <option value="featured">Featured first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
