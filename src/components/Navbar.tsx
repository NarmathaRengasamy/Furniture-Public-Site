import React, { useState, useEffect, useRef } from 'react';
import { FileText, Armchair, PhoneCall, Menu, X, Heart, Phone, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

export interface NavSectionItem {
  id: string;
  label: string;
  href: string;
}

interface NavbarProps {
  onStartTour?: () => void;
  wishlistCount?: number;
  onCategorySelect?: (category: string) => void;
  activeCategory?: string;
  onOpenWishlist: () => void;
}

export function Navbar({
  onStartTour,
  wishlistCount = 0,
  onOpenWishlist,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('hero');
  const isClickScrolling = useRef<boolean>(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The 6 distinct sections of the page in top-to-bottom order
  const navItems: NavSectionItem[] = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'spotlight', label: 'Signature', href: '#spotlight' },
    { id: 'catalog', label: 'Catalogue', href: '#catalog' },
    { id: 'craftsmanship', label: 'Craftsmanship', href: '#craftsmanship' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollSpy to highlight the appropriate section as the user scrolls
  useEffect(() => {
    const handleScrollSpy = () => {
      if (isClickScrolling.current) return;

      const scrollY = window.scrollY;

      // 1. Top of page is always 'Home' (Hero)
      if (scrollY < 260) {
        setActiveTab('hero');
        return;
      }

      // 2. Near bottom of page is always 'FAQ'
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveTab('faq');
        return;
      }

      // 3. Check each section bounding rect from bottom to top
      const sectionIds = ['faq', 'reviews', 'craftsmanship', 'catalog', 'spotlight', 'hero'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Element is in focus when its top has reached the upper viewport area
          if (rect.top <= 220 && rect.bottom >= 140) {
            setActiveTab(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavClick = (item: NavSectionItem) => {
    setActiveTab(item.id);

    isClickScrolling.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 900);

    if (item.id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetEl = document.querySelector(item.href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Banner */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs truncate">
              <strong className="text-white">{COMPANY_INFO.name}</strong> • Madurai Direct Factory Furniture • Ready Stock 2026
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone-400 shrink-0">
            <span>Direct Showroom Desk</span>
            <span className="opacity-40">/</span>
            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              <PhoneCall size={12} />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Sticky Header */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
          scrolled ? 'border-stone-200 shadow-sm py-2' : 'border-stone-200/80 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4 flex-nowrap">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group shrink-0"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-600/20 text-terracotta flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs shrink-0">
              <Armchair size={19} strokeWidth={2} />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-serif text-lg sm:text-xl font-bold text-stone-900 tracking-wider leading-none whitespace-nowrap">
                {COMPANY_INFO.brand}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-stone-500 font-bold uppercase mt-0.5 whitespace-nowrap">
                DHYANALINGA ENTERPRISES • MADURAI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links: The 6 Sections */}
          <nav className="hidden lg:flex items-center justify-center shrink-0">
            <ul className="flex items-center gap-0.5 bg-stone-100/90 p-1 rounded-full border border-stone-200/80 shadow-2xs">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id} className="shrink-0">
                    <a
                      href={item.href}
                      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer leading-none ${
                        isActive
                          ? 'bg-terracotta text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {wishlistCount > 0 && (
              <button
                type="button"
                className="relative p-2 rounded-xl text-terracotta hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
                onClick={onOpenWishlist}
                title="Saved Items"
              >
                <Heart size={18} fill="currentColor" />
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 text-[10px] font-bold bg-terracotta text-white rounded-full px-1 shadow-xs">
                  {wishlistCount}
                </span>
              </button>
            )}

            <a
              href={COMPANY_INFO.pdfCatalogueUrl}
              download="RLX_India_Easy_Chair_Catalogue_2026.pdf"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
              title="Download April 2026 PDF Catalogue"
            >
              <FileText size={13} className="text-terracotta shrink-0" />
              <span className="whitespace-nowrap">PDF Catalogue</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-terracotta hover:bg-terracotta-hover text-white shadow-xs transition-colors whitespace-nowrap shrink-0"
              title="Call Showroom Directly (+91 98421 39565)"
            >
              <Phone size={13} className="shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">Call Showroom</span>
            </a>

            <button
              type="button"
              onClick={onStartTour}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/30 text-amber-900 hover:bg-amber-600 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-2xs whitespace-nowrap shrink-0 group"
              title="Start Guided Tour"
            >
              <span className="whitespace-nowrap">Guided Tour</span>
              <Sparkles size={12} className="text-amber-600 group-hover:text-white shrink-0" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 py-3 px-4 shadow-xl animate-fadeIn">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`block py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-terracotta text-white font-bold'
                          : 'text-stone-800 hover:bg-stone-100 hover:text-terracotta'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-2 flex flex-col gap-2 border-t border-stone-100 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartTour?.();
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-600/30 text-amber-900 text-xs font-semibold"
                >
                  <Sparkles size={13} className="text-amber-600" />
                  <span>Start Guided Tour</span>
                </button>
                <a
                  href={COMPANY_INFO.pdfCatalogueUrl}
                  download="RLX_India_Easy_Chair_Catalogue_2026.pdf"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800"
                >
                  <FileText size={14} />
                  <span>Download PDF Catalogue</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phoneNumber}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-terracotta text-white text-xs font-semibold"
                >
                  <Phone size={14} />
                  <span>Call Showroom ({COMPANY_INFO.phone})</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
