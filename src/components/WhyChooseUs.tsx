import React from 'react';
import { FEATURES, STORE_INFO } from '../data';
import { Sparkles, ShieldCheck, Tag, Clock, Layers, Truck, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-400" />,
  Tag: <Tag className="w-6 h-6 text-amber-400" />,
  Clock: <Clock className="w-6 h-6 text-amber-400" />,
  Layers: <Layers className="w-6 h-6 text-amber-400" />,
  Truck: <Truck className="w-6 h-6 text-amber-400" />,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="sobre-nos" className="py-20 bg-[#0b0c0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            Diferenciais de Excelência
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            Porquê Escolher as Nossas T-shirts?
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Combinamos a essência da moda urbana com materiais nobres. Cada detalhe da gola ao acabamento foi desenhado para durar e impressionar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/40 transition-all duration-300 hover:bg-zinc-900/90 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-zinc-800/90 group-hover:border-amber-400/50">
                {iconMap[feat.icon]}
              </div>

              <h3 className="text-xl font-black text-white uppercase font-display mb-2 group-hover:text-amber-400 transition-colors">
                {feat.title}
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* 24h Banner Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-zinc-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
                Disponibilidade Total
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white font-display uppercase">
                Atendimento 24h/24h pelo WhatsApp
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Faz a tua encomenda a qualquer momento do dia ou da noite com resposta rápida no {STORE_INFO.whatsappFormatted}.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${STORE_INFO.fullWhatsAppNumber}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento 24h/24h da KUTAR sobre as T-shirts de gola a cutar.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm uppercase tracking-wider transition-colors shrink-0 shadow-lg"
          >
            Falar com Atendimento 24h
          </a>
        </div>

      </div>
    </section>
  );
};
