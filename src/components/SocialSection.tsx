import React from 'react';
import { useStore } from '../context/StoreContext';
import { Video, Flame, ExternalLink, Heart } from 'lucide-react';

export const SocialSection: React.FC = () => {
  const { config } = useStore();

  return (
    <section className="py-20 bg-[#0d0e12] border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <Video className="w-3.5 h-3.5 text-rose-400" />
                <span>Comunidade Urbana & Streetwear</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight leading-tight">
                Siga-nos nas Redes Sociais
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Acompanha os bastidores, dicas de looks streetwear, reviews reais de caimento da gola a cutar e novidades exclusivas da nossa coleção no TikTok.
              </p>

              {/* Creator Handle Highlight */}
              <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#fe2c55] to-[#25f4ee] p-[2px] shrink-0">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-black text-white text-sm">
                    KT
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                    Conta Oficial no TikTok
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white font-display">
                    {config.tiktokHandle}
                  </span>
                </div>
              </div>

              {/* Explicit Button Requested: "Seguir no TikTok" */}
              <div className="pt-2">
                <a
                  href={config.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black text-sm uppercase tracking-wider shadow-[0_6px_25px_rgba(255,255,255,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.42-.42.76-.91 1-1.45V11.2a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-2.63z" />
                  </svg>
                  <span>Seguir no TikTok</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                </a>
              </div>

            </div>

            {/* Right Card Mockup */}
            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto bg-black border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-xs font-bold text-white tracking-wide">TikTok Showcase</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">{config.tiktokHandle}</span>
                </div>

                <div className="aspect-[4/3] rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden relative flex items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <Flame className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
                    <h4 className="text-base font-black text-white uppercase font-display">
                      Tendências & Caimento
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Vê como a gola a cutar assenta no corpo em movimento nos vídeos do {config.tiktokHandle}.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1 text-white font-bold">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    Comunidade Streetwear
                  </span>
                  <a
                    href={config.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Ver Vídeos →
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
