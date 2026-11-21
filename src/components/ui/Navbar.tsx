import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { PixelLogo } from './PixelLogo';
import { useCart } from '../../context/useCart';
import { usePageTransition } from '../../context/usePageTransition';
import { CopyIpButton } from './CopyIpButton';
import { AudioControl } from './AudioControl';
import { McChest } from './MinecraftIcons';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { triggerHomeReturn } = usePageTransition();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Game Modes', path: '/#game-modes' },
    { label: 'Store', path: '/store' },
    { label: 'Community', path: '/community' },
    { label: 'Rules', path: '/rules' },
    { label: 'Support', path: '/support' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.replace('/', '');
    }
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path === '/' && location.pathname === '/' && !location.hash) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (path.startsWith('/#') && location.pathname === '/') {
      const id = path.replace('/', '');
      const target = document.querySelector(id);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target as HTMLElement, { offset: -90, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    triggerHomeReturn();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 py-3.5 sm:py-4 transition-all duration-300 ease-out ${
        scrolled
          ? 'bg-slate-950/35 backdrop-blur-md border-b border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
          : 'bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Returns to homepage top with smooth upward transition */}
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label="Love Pixel Home"
            title="Return to Love Pixel Home"
            className="flex items-center group cursor-pointer"
          >
            <PixelLogo
              size="md"
              showTagline={false}
              className="group-hover:drop-shadow-[0_0_16px_rgba(85,255,85,0.4)] transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/50 border border-slate-700/40 backdrop-blur-md hover:border-slate-600/50 transition-colors">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-minecraft tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? 'bg-emerald-950/80 text-[#55ff55] border border-emerald-500/50 shadow-[0_0_12px_rgba(85,255,85,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Audio, Quick IP & Cart */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Minecraft XP Orb Audio Control */}
            <AudioControl />

            {/* Quick Copy IP Button for Desktop */}
            <div className="hidden xl:block">
              <CopyIpButton variant="compact" />
            </div>

            {/* Cart Icon Link with Minecraft Chest motif */}
            <Link
              to="/cart"
              onClick={handleLinkClick}
              aria-label="View Shopping Cart"
              className="relative p-2 rounded-xl mc-button text-slate-300 hover:text-[#55ff55] transition-all duration-200 flex items-center justify-center cursor-pointer"
            >
              <McChest size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#55ff55] text-[10px] font-minecraft font-bold text-slate-950 shadow-[0_0_10px_rgba(85,255,85,0.8)]">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl mx-4 mt-2.5 p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-minecraft tracking-wider uppercase transition-all ${
                    active
                      ? 'bg-emerald-950/60 text-[#55ff55] border border-emerald-500/40'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <CopyIpButton variant="hero" className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
};
