import { useDemoTour } from './hooks/useDemoTour';
import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { Spotlight } from './components/Spotlight';
import { FilterToolbar } from './components/FilterToolbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CraftsmanshipStory } from './components/CraftsmanshipStory';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PerfoxEmbed } from './components/PerfoxEmbed';
import { PRODUCTS_DATA } from './data/catalog';
import { Product } from './types';
import { Layers, Heart, X, Trash2, Eye } from 'lucide-react';

export function App() {
  const { startTour } = useDemoTour();
  const allProducts: Product[] = PRODUCTS_DATA;

  // Filter & Search State
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Modal & Wishlist State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('furniture_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Pure Client-side Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category Filter
    if (activeCategory && activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search Term Filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter((p) => {
        return (
          p.title?.toLowerCase().includes(query) ||
          p.subtitle?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query) ||
          p.materials?.some((m) => m.toLowerCase().includes(query)) ||
          p.features?.some((f) => f.toLowerCase().includes(query))
        );
      });
    }

    // In Stock Filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // 'featured' default: featured first, then new arrivals
      result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        if (a.isNewArrival && !b.isNewArrival) return -1;
        if (!a.isNewArrival && b.isNewArrival) return 1;
        return 0;
      });
    }

    return result;
  }, [allProducts, activeCategory, searchTerm, sortBy, inStockOnly]);

  // Wishlist Toggle Handler
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => (item.id || item._id) === (product.id || product._id));
    let updated: Product[];
    if (exists) {
      updated = wishlist.filter((item) => (item.id || item._id) !== (product.id || product._id));
      showToast(`Removed from saved pieces`);
    } else {
      updated = [...wishlist, product];
      showToast(`Saved to favorites`);
    }
    setWishlist(updated);
    try {
      localStorage.setItem('furniture_wishlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('furniture_wishlist');
    showToast('Saved list cleared');
  };

  // Hero Featured signature item
  const heroFeaturedProduct = useMemo(() => {
    return allProducts.find((p) => p.isFeatured) || allProducts[0];
  }, [allProducts]);

  return (
    <div className="app-layout min-h-screen flex flex-col bg-surface-ground text-charcoal font-sans">
      {/* Perfox AI Assistant Widget */}
      <PerfoxEmbed />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />

      {/* Sticky Header */}
      <Navbar
        onStartTour={startTour}
        wishlistCount={wishlist.length}
        activeCategory={activeCategory}
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          const catalogEl = document.getElementById('catalog');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        featuredHeroProduct={heroFeaturedProduct}
        onSelectProduct={setSelectedProduct}
        onExploreClick={() => {
          const catalogEl = document.getElementById('catalog');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Trust Pillars */}
      <Pillars />

      {/* Signature Bestsellers Spotlight */}
      <Spotlight
        products={allProducts}
        onSelectProduct={setSelectedProduct}
      />

      {/* Main Interactive Catalog Showcase */}
      <section id="catalog" className="py-16 sm:py-20 bg-[#F4F0E8] border-b border-[#D8D2C6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-[#D8D2C6] text-xs font-mono text-stone-600 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span>Atelier repertory · 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal mb-2 leading-tight">
              Furniture for considered living spaces
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Solid European oak dining tables, contoured armchairs, platform beds, and architectural desks handcrafted with honest joinery.
            </p>
          </div>

          {/* Filtering & Search Toolbar */}
          <FilterToolbar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            inStockOnly={inStockOnly}
            onInStockToggle={setInStockOnly}
          />

          {/* Results Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 mb-6 px-1">
            <div className="font-mono text-xs">
              Showing <span className="font-medium text-charcoal tabular-nums">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'piece' : 'pieces'}
              {activeCategory !== 'All' && (
                <span> in <strong className="text-charcoal font-medium">{activeCategory}</strong></span>
              )}
              {searchTerm && (
                <span> matching "<strong className="text-charcoal font-medium">{searchTerm}</strong>"</span>
              )}
            </div>

            {(activeCategory !== 'All' || searchTerm || inStockOnly) && (
              <button
                className="btn-secondary text-xs px-2.5 py-1 rounded-md"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchTerm('');
                  setInStockOnly(false);
                  setSortBy('featured');
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 px-4 text-center rounded-xl bg-surface-card border border-[#D8D2C6] max-w-md mx-auto">
              <Layers size={32} className="text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-medium text-charcoal mb-1">No matching pieces found</h3>
              <p className="text-xs text-stone-500 mb-4">
                Try searching for "Armchair", "Dining Table", "Desk", or "Bed".
              </p>
              <button
                className="btn-primary text-xs px-4 py-2 rounded-lg font-medium"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchTerm('');
                  setInStockOnly(false);
                }}
              >
                View all pieces ({allProducts.length})
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id || product._id}
                  product={product}
                  onSelect={setSelectedProduct}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.some(
                    (item) => (item.id || item._id) === (product.id || product._id)
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Craftsmanship & Brand Story Section */}
      <CraftsmanshipStory />

      {/* Customer Testimonials & Ratings */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Product Details Full Inspection Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSaveWishlist={handleToggleWishlist}
          isWishlisted={wishlist.some(
            (item) => (item.id || item._id) === (selectedProduct.id || selectedProduct._id)
          )}
        />
      )}

      {/* Wishlist Drawer Modal */}
      {wishlistOpen && (
        <div
          className="modal-backdrop fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => setWishlistOpen(false)}
        >
          <div
            className="w-full max-w-md bg-surface-card h-full shadow-xl flex flex-col p-6 animate-slideLeft border-l border-[#D8D2C6]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE5DC]">
              <div className="flex items-center gap-2">
                <Heart size={16} fill="#634F42" color="#634F42" />
                <h3 className="text-sm font-semibold text-charcoal">Saved favorites ({wishlist.length})</h3>
              </div>
              <button
                className="w-7 h-7 rounded-md bg-surface-ground hover:bg-[#E2DDD2] text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
                onClick={() => setWishlistOpen(false)}
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 px-4 text-stone-500">
                  <Heart size={32} className="text-stone-300 mx-auto mb-2.5" />
                  <p className="text-xs">You have not saved any pieces yet.</p>
                  <button
                    className="btn-primary mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium"
                    onClick={() => {
                      setWishlistOpen(false);
                      const catalogEl = document.getElementById('catalog');
                      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse collection
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlist.map((item) => (
                    <div
                      key={item.id || item._id}
                      className="flex gap-3 p-3 rounded-xl border border-[#D8D2C6] bg-surface-ground/60 hover:bg-surface-ground transition-colors"
                    >
                      <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'}
                        alt={item.title}
                        className="w-14 h-14 rounded-lg object-cover cursor-pointer shrink-0 border border-[#D8D2C6]"
                        onClick={() => {
                          setSelectedProduct(item);
                          setWishlistOpen(false);
                        }}
                      />
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <h4
                          className="text-xs font-medium text-charcoal truncate cursor-pointer hover:text-stone-600"
                          onClick={() => {
                            setSelectedProduct(item);
                            setWishlistOpen(false);
                          }}
                        >
                          {item.title}
                        </h4>
                        <div className="text-xs font-medium text-charcoal tabular-nums">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            className="btn-primary flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium"
                            onClick={() => {
                              setSelectedProduct(item);
                              setWishlistOpen(false);
                            }}
                          >
                            <Eye size={10} />
                            <span>View</span>
                          </button>
                          <button
                            className="btn-secondary flex items-center gap-1 p-1 rounded text-stone-500 hover:text-[#783232] text-[11px]"
                            onClick={() => handleToggleWishlist(item)}
                            title="Remove"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="pt-4 border-t border-[#EAE5DC]">
                <button
                  className="btn-secondary w-full justify-center text-xs py-2 text-stone-600 hover:text-[#783232] rounded-lg"
                  onClick={handleClearWishlist}
                >
                  Clear all favorites
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
