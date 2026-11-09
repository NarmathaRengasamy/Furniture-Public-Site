import React, { useState, useEffect, useRef } from 'react';
import { FileText, Armchair, PhoneCall, Menu, X, Heart, Phone, Compass } from 'lucide-react';
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

  const navItems: NavSectionItem[] = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'spotlight', label: 'Signature', href: '#spotlight' },
    { id: 'catalog', label: 'Collection', href: '#catalog' },
    { id: 'craftsmanship', label: 'Craftsmanship', href: '#craftsmanship' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      if (isClickScrolling.current) return;

      const scrollY = window.scrollY;

      if (scrollY < 240) {
        setActiveTab('hero');
        return;
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveTab('faq');
        return;
      }

      const sectionIds = ['faq', 'reviews', 'craftsmanship', 'catalog', 'spotlight', 'hero'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 120) {
            setActiveTab(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavClick = (item: NavSectionItem) => {
    setActiveTab(item.id);

    isClickScrolling.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);

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
      <div className="bg-surface-contrast text-stone-700 text-xs py-2 px-4 border-b border-[#D8D2C6]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze shrink-0" />
            <span className="text-[11px] sm:text-xs truncate text-stone-700">
              <strong className="text-charcoal font-medium">{COMPANY_INFO.name}</strong> — Handcrafted solid timber furniture and bespoke interiors
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-stone-500 shrink-0 font-mono">
            <span>Bengaluru studio</span>
            <span className="opacity-40">/</span>
            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="inline-flex items-center gap-1.5 text-charcoal hover:text-bronze font-medium transition-colors font-sans"
            >
              <PhoneCall size={12} className="text-stone-500" />
              <span className="tabular-nums">{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 bg-surface-ground/95 backdrop-blur-md transition-colors duration-200 border-b ${
          scrolled ? 'border-[#D0C9BD] shadow-2xs py-2' : 'border-[#D8D2C6] py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group shrink-0"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-surface-card border border-[#D8D2C6] text-charcoal flex items-center justify-center shrink-0 shadow-2xs">
              <Armchair size={16} strokeWidth={1.75} />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-serif text-lg font-medium text-charcoal tracking-tight leading-none">
                {COMPANY_INFO.brand}
              </span>
              <span className="text-[10px] font-mono text-stone-500 leading-none mt-1">
                Atelier · Est. 2016
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center shrink-0">
            <ul className="flex items-center gap-1 bg-[#E1DBD0] p-1 rounded-xl border border-[#D5CFC3]">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id} className="shrink-0">
                    <a
                      href={item.href}
                      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs transition-colors duration-150 cursor-pointer leading-none ${
                        isActive
                          ? 'bg-surface-card text-charcoal font-medium shadow-2xs border border-[#D8D2C6]'
                          : 'text-stone-600 hover:text-charcoal font-normal'
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
                className="relative p-2 rounded-lg text-bronze hover:bg-surface-card transition-colors cursor-pointer shrink-0 border border-transparent hover:border-[#D8D2C6]"
                onClick={onOpenWishlist}
                title="Saved Items"
              >
                <Heart size={16} fill="currentColor" />
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 text-[10px] font-semibold bg-bronze text-surface-card rounded-full px-1">
                  {wishlistCount}
                </span>
              </button>
            )}

            <a
              href={COMPANY_INFO.pdfCatalogueUrl}
              download="haven_craft_furniture_catalogue_2026.pdf"
              className="btn-secondary hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0"
              title="Download 2026 PDF Catalogue"
            >
              <FileText size={13} className="text-stone-500 shrink-0" />
              <span>Catalogue PDF</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneNumber}`}
              className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0"
              title={`Call Studio Desk (${COMPANY_INFO.phone})`}
            >
              <Phone size={13} className="shrink-0" />
              <span className="hidden sm:inline">Call studio</span>
            </a>

            <button
              type="button"
              onClick={onStartTour}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-card border border-[#D8D2C6] text-stone-700 hover:bg-[#EAE5DC] transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-2xs"
              title="Start Interactive Guided Tour"
            >
              <Compass size={13} className="text-stone-500 shrink-0" />
              <span>Guide</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg border border-[#D8D2C6] text-stone-700 hover:bg-surface-card transition-colors cursor-pointer shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-card border-b border-[#D8D2C6] px-4 pt-2 pb-4 shadow-sm animate-fadeIn">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-[#EAE5DC] text-charcoal font-medium'
                          : 'text-stone-700 hover:bg-[#F2ECE1]'
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
              <li className="pt-2 flex flex-col gap-2 border-t border-[#D8D2C6] mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartTour?.();
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#D8D2C6] text-stone-800 text-xs font-medium hover:bg-[#EAE5DC]"
                >
                  <Compass size={13} className="text-stone-500" />
                  <span>Start guide</span>
                </button>
                <a
                  href={COMPANY_INFO.pdfCatalogueUrl}
                  download="haven_craft_furniture_catalogue_2026.pdf"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#D8D2C6] text-xs font-medium text-stone-800"
                >
                  <FileText size={14} />
                  <span>Download catalogue PDF</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phoneNumber}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-charcoal text-surface-card text-xs font-medium"
                >
                  <Phone size={14} />
                  <span>Call studio ({COMPANY_INFO.phone})</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
