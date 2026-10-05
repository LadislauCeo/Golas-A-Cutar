import React from 'react';
import { useStore } from '../context/StoreContext';
import { ASSETS, formatKwanzas } from '../data';
import { TshirtColor } from '../types';
import { Sparkles, MessageCircle, ShieldCheck, Check, ArrowRight, Flame } from 'lucide-react';

interface HeroBannerProps {
  onOpenBuyModal: (preselectedColor?: TshirtColor) => void;
  onOpenWhatsApp: () => void;
  onScrollToColors: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenBuyModal,
  onOpenWhatsApp,
  onScrollToColors,
}) => {
  const { config } = useStore();

  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-zinc-700/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Urban Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-wider uppercase shadow-inner">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>COLEÇÃO STREETWEAR VIRGENS • ALTA QUALIDADE</span>
            </div>

            {/* Main Phrase Requested by User */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-display leading-[1.05]">
              {config.tagline}
            </h1>

            {/* Subtext Requested by User */}
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {config.subtext}
            </p>

            {/* Price Highlight Block Requested */}
            <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-sm max-w-lg mx-auto lg:mx-0 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-400/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-zinc-400 block font-semibold">
                    Preço Oficial
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-4xl sm:text-5xl font-black text-amber-400 font-display tracking-tight">
                      {formatKwanzas(config.unitPrice)}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">/ cada T-shirt</span>
                  </div>
                </div>

                {/* Combo promotion */}
                {config.enablePromoTrio && (
                  <div className="text-right">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-1 rounded-md">
                      Promoção Trio: 3 por {formatKwanzas(config.promoTrioPrice)}
                    </span>
                    <span className="block text-[11px] text-zinc-400 mt-1">
                      (Poupe {formatKwanzas(config.unitPrice * 3 - config.promoTrioPrice)} no pack)
                    </span>
                  </div>
                )}
              </div>

              {/* Badges bar */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-zinc-300">
                <div className="flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>100% Algodão</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gola Reforçada</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tamanhos L e XL</span>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 max-w-lg mx-auto lg:mx-0">
              {/* Comprar agora Button */}
              <button
                onClick={() => onOpenBuyModal()}
                className="flex-1 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(251,191,36,0.35)] hover:shadow-[0_8px_30px_rgba(251,191,36,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5" />
                <span>Comprar agora</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* Comprar pelo WhatsApp */}
              <button
                onClick={onOpenWhatsApp}
                className="flex-1 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.45)] transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comprar pelo WhatsApp</span>
              </button>
            </div>

            {/* Support Highlight Requested: Atendimento 24h/24h */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <strong className="text-white uppercase tracking-wider">{config.openingHours}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Garantia de Qualidade & Entregas Rápidas no Lubango</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back Card Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-950 p-2 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                
                {/* Main Hero Product Photo */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 group">
                  <img
                    src={ASSETS.hero}
                    alt={`${config.name} - T-shirt de gola a cutar`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase rounded-md tracking-wider">
                      Gola a Cutar Alta
                    </span>
                    <span className="px-3 py-1 bg-amber-400 text-black text-[11px] font-black uppercase rounded-md tracking-wider shadow">
                      {formatKwanzas(config.unitPrice)}
                    </span>
                  </div>

                  {/* Bottom Info Floating Sheet */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">
                        {config.productColors.length} Cores Disponíveis
                      </span>
                      <button
                        onClick={onScrollToColors}
                        className="text-xs text-amber-400 hover:underline font-bold"
                      >
                        Ver todas →
                      </button>
                    </div>

                    {/* Color Swatches Clickable */}
                    <div className="flex items-center justify-between gap-2">
                      {config.productColors.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => onOpenBuyModal(col.id)}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-amber-400 flex items-center justify-center gap-1.5 transition-all text-xs font-bold text-white group/btn"
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/50 shadow-sm shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span className="truncate">{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Floating Accent Card (Bottom Left) */}
              <div className="absolute -bottom-6 -left-6 bg-zinc-900/95 border border-white/15 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-black text-lg">
                  L/XL
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Tamanhos L e XL</span>
                  <span className="text-[11px] text-zinc-400 block">Estoque limitado no Lubango</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
