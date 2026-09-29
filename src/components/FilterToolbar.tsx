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
    <div className="filter-toolbar bg-white rounded-2xl shadow-sm border border-stone-200/80 p-4 mb-8">
      {/* Category Pills */}
      <div className="category-pills-container overflow-x-auto scrollbar-none pb-2 mb-4">
        <div className="category-pills flex items-center gap-2 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-pill flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-terracotta text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/70'
                }`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span
                  className={`pill-count text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="filter-controls-row flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Instant Search Bar */}
        <div className="search-bar-wrap relative w-full md:flex-1">
          <Search size={16} className="search-icon absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name (e.g. Sambuthatha, Rainbow, Volvo, Bheem, SS Table)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              onClick={() => onSearchChange('')}
              title="Clear Search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort & Filter Toggles */}
        <div className="filter-actions-wrap flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* In Stock Toggle */}
          <button
            type="button"
            className={`stock-toggle-btn flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none ${
              inStockOnly
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600/20'
                : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
            }`}
            onClick={() => onInStockToggle(!inStockOnly)}
          >
            <div
              className={`stock-checkbox w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                inStockOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
              }`}
            >
              {inStockOnly && <Check size={11} strokeWidth={3} />}
            </div>
            <span>In Stock Only</span>
          </button>

          {/* Sort Selector */}
          <div className="sort-select-wrap relative">
            <SlidersHorizontal size={14} className="sort-icon absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select pl-8 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta cursor-pointer transition-all"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
