import React, { useState, useEffect } from 'react';
import { FileText, Armchair, PhoneCall, Menu, X, Heart, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

interface NavItem {
  label: string;
  category?: string;
  href: string;
}

interface NavbarProps {
  wishlistCount?: number;
  onCategorySelect: (category: string) => void;
  activeCategory: string;
  onOpenWishlist: () => void;
}

export function Navbar({
  wishlistCount = 0,
  onCategorySelect,
  activeCategory,
  onOpenWishlist,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'All Models', category: 'All', href: '#catalog' },
    { label: 'Easy Chairs', category: 'Easy Chairs', href: '#catalog' },
    { label: 'Wooden', category: 'Wooden Chairs', href: '#catalog' },
    { label: 'Signature Series', href: '#spotlight' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.category) {
      onCategorySelect(item.category);
    }
    const targetEl = document.querySelector(item.href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Banner */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="text-[11px] sm:text-xs">
              <strong className="text-white">{COMPANY_INFO.name}</strong> • Madurai Direct Factory Furniture • Ready Stock 2026
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone-400">
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
          scrolled ? 'border-stone-200 shadow-sm py-2.5' : 'border-stone-200/80 py-3.5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group shrink-0"
            onClick={(e) => {
              e.preventDefault();
              onCategorySelect('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-600/20 text-terracotta flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <Armchair size={20} strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold text-stone-900 tracking-wider leading-none">
                {COMPANY_INFO.brand}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-stone-500 font-bold uppercase mt-0.5">
                DHYANALINGA ENTERPRISES • MADURAI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-full border border-stone-200/80">
              {navItems.map((item, idx) => {
                const isActive = item.category ? activeCategory === item.category : false;
                return (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-terracotta text-white shadow-xs'
                          : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
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
          <div className="flex items-center gap-2 sm:gap-3">
            {wishlistCount > 0 && (
              <button
                type="button"
                className="relative p-2 rounded-xl text-terracotta hover:bg-stone-100 transition-colors cursor-pointer"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors"
              title="Download April 2026 PDF Catalogue"
            >
              <FileText size={13} className="text-terracotta" />
              <span>PDF Catalogue</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-terracotta hover:bg-terracotta-hover text-white shadow-xs transition-colors"
              title="Call Showroom Directly (+91 98421 39565)"
            >
              <Phone size={13} />
              <span className="hidden sm:inline">Call Showroom</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 py-3 px-4 shadow-xl">
            <ul className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="block py-2 px-3 rounded-lg text-xs font-semibold text-stone-800 hover:bg-stone-100 hover:text-terracotta transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 flex flex-col gap-2 border-t border-stone-100 mt-2">
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
