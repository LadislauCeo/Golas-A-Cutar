import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatKwanzas } from '../data';
import { ShoppingBag, Phone, Menu, X, MessageCircle, Clock, Sparkles, Shield, Lock } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBuyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenBuyModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { config, isAdminLoggedIn, setIsAdminModalOpen, setIsAdminPanelOpen } = useStore();

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black py-1.5 px-4 text-xs font-bold tracking-wider uppercase overflow-hidden shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>{config.tickerText}</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-xs">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {config.openingHours}
            </span>
            <a
              href={`https://wa.me/${config.fullWhatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              WhatsApp: {config.whatsappFormatted}
            </a>

            {/* Subtle Admin Quick Link in top bar */}
            <button
              onClick={handleAdminClick}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/15 hover:bg-black/30 text-black text-[11px] font-extrabold transition-colors"
              title="Acesso do Administrador (Ladislau)"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Painel Admin ✓' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#0d0e12]/95 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-white text-black font-black flex items-center justify-center text-xl tracking-tighter rounded-md transform group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              KT
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-none font-display">
                {config.name}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-400 block mt-1">
                STREETWEAR • {formatKwanzas(config.unitPrice)}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-zinc-300">
            <a href="#inicio" className="hover:text-white hover:text-amber-400 transition-colors">
              Início
            </a>
            <a href="#tshirts" className="hover:text-white hover:text-amber-400 transition-colors">
              T-shirts
            </a>
            <a href="#cores" className="hover:text-white hover:text-amber-400 transition-colors">
              Cores
            </a>
            <a href="#como-comprar" className="hover:text-white hover:text-amber-400 transition-colors">
              Como comprar
            </a>
            <a href="#sobre-nos" className="hover:text-white hover:text-amber-400 transition-colors">
              Sobre nós
            </a>
            <a href="#contacto" className="hover:text-white hover:text-amber-400 transition-colors">
              Contacto
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* 24h Live Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>24h/24h Online</span>
            </div>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition-colors"
              aria-label="Ver Carrinho de Compras"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Buy Now Primary CTA */}
            <button
              onClick={onOpenBuyModal}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(251,191,36,0.25)] hover:shadow-[0_4px_25px_rgba(251,191,36,0.4)] active:scale-95"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              Comprar agora
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white lg:hidden"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0e12] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs text-zinc-400">Atendimento 24h/24h</span>
              <span className="text-xs font-bold text-amber-400">
                T-Shirts: {formatKwanzas(config.unitPrice)}
              </span>
            </div>
            <nav className="flex flex-col space-y-3 font-medium text-base">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-zinc-200 hover:text-amber-400"
              >
                Início
              </a>
              <a
                href="#tshirts"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-zinc-200 hover:text-amber-400"
              >
                T-shirts
              </a>
              <a
                href="#cores"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-zinc-200 hover:text-amber-400"
              >
                Cores (Bege, Branca, Preta)
              </a>
              <a
                href="#como-comprar"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-zinc-200 hover:text-amber-400"
              >
                Como comprar
              </a>
              <a
                href="#sobre-nos"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-zinc-200 hover:text-amber-400"
              >
                Sobre nós
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-zinc-200 hover:text-amber-400"
              >
                Contacto
              </a>
            </nav>
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBuyModal();
                }}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                Comprar agora • {formatKwanzas(config.unitPrice)}
              </button>
              
              <a
                href={`https://wa.me/${config.fullWhatsAppNumber}?text=${encodeURIComponent(`Olá! Gostaria de comprar T-shirts de gola a cutar por ${formatKwanzas(config.unitPrice)}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Comprar pelo WhatsApp
              </a>

              {/* Mobile Admin Link */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAdminClick();
                }}
                className="w-full py-2.5 bg-zinc-900 border border-white/10 hover:border-amber-400/50 text-zinc-300 text-xs font-bold rounded-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Painel do Administrador (Ladislau)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
