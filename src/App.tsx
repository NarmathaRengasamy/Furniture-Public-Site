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
      const saved = localStorage.getItem('rlx_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
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
      showToast(`Removed "${product.title}" from saved list`);
    } else {
      updated = [...wishlist, product];
      showToast(`Saved "${product.title}" to your favorites!`);
    }
    setWishlist(updated);
    try {
      localStorage.setItem('rlx_wishlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('rlx_wishlist');
    showToast('Saved list cleared');
  };

  // Hero Featured signature item (Easy Chair Cushion Volvo)
  const heroFeaturedProduct = useMemo(() => {
    return allProducts.find((p) => p.title.includes('Volvo')) || allProducts[0];
  }, [allProducts]);

  return (
    <div className="app-layout min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 font-sans selection:bg-terracotta/20 selection:text-terracotta">
      {/* Perfox AI Assistant Widget */}
      <PerfoxEmbed />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />

      {/* Luxury Sticky Navbar */}
      <Navbar onStartTour={startTour}
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
      <section id="catalog" className="py-12 sm:py-16 bg-white border-t border-stone-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <span>Direct Factory Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 mb-2 leading-tight">
              RLX India Relax Chairs &amp; Furniture
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Explore authentic factory-direct models with video demos, live offers, and direct delivery from Madurai.
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
          <div className="catalog-stats-row flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-stone-600 mb-6 px-1">
            <div>
              Showing <span className="catalog-count-highlight font-bold text-stone-900">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'model' : 'models'}
              {activeCategory !== 'All' && (
                <span> in <strong className="text-stone-900">{activeCategory}</strong></span>
              )}
              {searchTerm && (
                <span> matching "<strong className="text-stone-900">{searchTerm}</strong>"</span>
              )}
            </div>

            {(activeCategory !== 'All' || searchTerm || inStockOnly) && (
              <button
                className="btn-secondary btn-reset-filters text-xs px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 transition-colors"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchTerm('');
                  setInStockOnly(false);
                  setSortBy('featured');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="catalog-empty py-16 px-4 text-center rounded-3xl bg-stone-50 border border-stone-200/80 max-w-lg mx-auto">
              <Layers size={44} className="text-terracotta mx-auto mb-4" />
              <h3 className="text-lg font-bold text-stone-900 mb-2">No matching models found</h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-5">
                Try searching for "Sambuthatha", "Rainbow", "Volvo", "Bheem", or "Dining".
              </p>
              <button
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchTerm('');
                  setInStockOnly(false);
                }}
              >
                Show All Models ({allProducts.length})
              </button>
            </div>
          ) : (
            <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          className="modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn"
          onClick={() => setWishlistOpen(false)}
        >
          <div
            className="wishlist-drawer w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="wishlist-drawer-header flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Heart size={20} fill="var(--accent-terracotta)" color="var(--accent-terracotta)" />
                <h3 className="text-base font-bold text-stone-900">Saved Favorites ({wishlist.length})</h3>
              </div>
              <button
                className="modal-close-btn w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                onClick={() => setWishlistOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="wishlist-drawer-body flex-1 overflow-y-auto py-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 px-4 text-stone-500">
                  <Heart size={36} className="text-stone-300 mx-auto mb-3" />
                  <p className="text-sm">You have not saved any models yet.</p>
                  <button
                    className="btn-primary mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                    onClick={() => {
                      setWishlistOpen(false);
                      const catalogEl = document.getElementById('catalog');
                      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse Catalogue
                  </button>
                </div>
              ) : (
                <div className="wishlist-items-list space-y-3">
                  {wishlist.map((item) => (
                    <div
                      key={item.id || item._id}
                      className="wishlist-item-card flex gap-3 p-3 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                    >
                      <img
                        src={item.images?.[0] || '/products/img_p2_1.jpeg'}
                        alt={item.title}
                        className="wishlist-item-img w-16 h-16 rounded-xl object-cover cursor-pointer shrink-0 border border-stone-200"
                        onClick={() => {
                          setSelectedProduct(item);
                          setWishlistOpen(false);
                        }}
                      />
                      <div className="wishlist-item-info flex flex-col justify-between flex-1 min-w-0">
                        <h4
                          className="wishlist-item-title text-xs font-semibold text-stone-900 truncate cursor-pointer hover:text-terracotta"
                          onClick={() => {
                            setSelectedProduct(item);
                            setWishlistOpen(false);
                          }}
                        >
                          {item.title}
                        </h4>
                        <div className="wishlist-item-price text-xs font-bold text-stone-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            className="btn-primary flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                            onClick={() => {
                              setSelectedProduct(item);
                              setWishlistOpen(false);
                            }}
                          >
                            <Eye size={11} />
                            <span>View</span>
                          </button>
                          <button
                            className="btn-secondary flex items-center gap-1 p-1 rounded-lg border border-stone-200 text-stone-500 hover:text-red-500 text-[11px]"
                            onClick={() => handleToggleWishlist(item)}
                            title="Remove"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="wishlist-drawer-footer pt-4 border-t border-stone-100">
                <button
                  className="btn-secondary w-full justify-center text-xs py-2.5 text-stone-600 hover:text-red-600 rounded-xl border border-stone-200"
                  onClick={handleClearWishlist}
                >
                  Clear All Favorites
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
