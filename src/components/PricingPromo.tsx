import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatKwanzas } from '../data';
import { TshirtColor, TshirtSize } from '../types';
import { Sparkles, Check, Flame, ArrowRight } from 'lucide-react';

interface PricingPromoProps {
  onQuickOrder: (quantity: number, colors: TshirtColor[], size: TshirtSize) => void;
}

export const PricingPromo: React.FC<PricingPromoProps> = ({ onQuickOrder }) => {
  const { config } = useStore();
  const [selectedQty, setSelectedQty] = useState<number>(3);
  const [selectedSize, setSelectedSize] = useState<TshirtSize>('L');

  const unitPrice = config.unitPrice;
  const promoTrioPrice = config.promoTrioPrice;
  const subtotal = selectedQty * unitPrice;

  let total = subtotal;
  let discount = 0;

  if (config.enablePromoTrio) {
    const packsOfThree = Math.floor(selectedQty / 3);
    const remainder = selectedQty % 3;
    total = (packsOfThree * promoTrioPrice) + (remainder * unitPrice);
    discount = subtotal - total;
  }

  const savingsOnTrio = unitPrice * 3 - promoTrioPrice;

  return (
    <section className="py-16 bg-gradient-to-b from-[#0e1014] to-[#0a0b0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Subtle gold mesh & highlights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-black" />
                <span>Super Promoção Streetwear</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase font-display leading-tight">
                Leva o Trio e Poupa <span className="text-amber-400">{formatKwanzas(savingsOnTrio)}</span>!
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Aproveita a nossa tabela oficial transparente. Quer leves uma peça para experimentar ou o pacote completo com as três cores (Bege, Branca e Preta), garantimos a melhor qualidade de gola a cutar no Lubango.
              </p>

              {/* Price Table Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* 1 T-shirt */}
                <div
                  onClick={() => setSelectedQty(1)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedQty === 1
                      ? 'bg-zinc-800/90 border-amber-400 ring-2 ring-amber-400/30'
                      : 'bg-zinc-900/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs uppercase text-zinc-400 font-bold block">1 T-shirt</span>
                  <span className="text-2xl font-black text-white font-display mt-1 block">
                    {formatKwanzas(unitPrice)}
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-0.5 block">Preço unitário base</span>
                </div>

                {/* 2 T-shirts */}
                <div
                  onClick={() => setSelectedQty(2)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedQty === 2
                      ? 'bg-zinc-800/90 border-amber-400 ring-2 ring-amber-400/30'
                      : 'bg-zinc-900/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs uppercase text-zinc-400 font-bold block">2 T-shirts</span>
                  <span className="text-2xl font-black text-white font-display mt-1 block">
                    {formatKwanzas(unitPrice * 2)}
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-0.5 block">2x {formatKwanzas(unitPrice)}</span>
                </div>

                {/* 3 T-shirts - Highlighted */}
                <div
                  onClick={() => setSelectedQty(3)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
                    selectedQty === 3
                      ? 'bg-amber-400/10 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-zinc-900/80 border-amber-400/40 hover:border-amber-400'
                  }`}
                >
                  <div className="absolute top-2 right-2">
                    <span className="bg-amber-400 text-black font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                      Mais Popular
                    </span>
                  </div>
                  <span className="text-xs uppercase text-amber-300 font-bold block">3 T-shirts (Trio)</span>
                  <span className="text-2xl font-black text-amber-400 font-display mt-1 block">
                    {formatKwanzas(promoTrioPrice)}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold mt-0.5 block">
                    Poupe {formatKwanzas(savingsOnTrio)}!
                  </span>
                </div>

              </div>

            </div>

            {/* Right Interactive Simulator & CTA */}
            <div className="lg:col-span-5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold">
                  Simulador de Pedido Rápido
                </span>
                <span className="text-xs font-bold text-amber-400">{config.openingHours}</span>
              </div>

              {/* Quantity selector */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-2">
                  Quantidade Desejada:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((q) => (
                    <button
                      key={q}
                      onClick={() => setSelectedQty(q)}
                      className={`flex-1 py-2 text-sm font-black rounded-lg border transition-all ${
                        selectedQty === q
                          ? 'bg-amber-400 text-black border-amber-400 shadow'
                          : 'bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-2">
                  Tamanho:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['L', 'XL'] as TshirtSize[]).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-black rounded-lg border transition-all ${
                        selectedSize === sz
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900 text-zinc-300 border-white/10'
                      }`}
                    >
                      Tamanho {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-white/10 space-y-1">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Cálculo:</span>
                  <span>{selectedQty} × {formatKwanzas(unitPrice)} = {formatKwanzas(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-bold">
                    <span>Desconto Pack Especial:</span>
                    <span>-{formatKwanzas(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="text-sm font-bold text-white uppercase">Total a Pagar:</span>
                  <span className="text-3xl font-black text-amber-400 font-display">
                    {formatKwanzas(total)}
                  </span>
                </div>
              </div>

              {/* Instant Action Button */}
              <button
                onClick={() => {
                  const defaultColors: TshirtColor[] = ['bege', 'branca', 'preta'];
                  const chosenColors: TshirtColor[] = [];
                  for (let i = 0; i < selectedQty; i++) {
                    chosenColors.push(defaultColors[i % defaultColors.length]);
                  }
                  onQuickOrder(selectedQty, chosenColors, selectedSize);
                }}
                className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(251,191,36,0.3)] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pedir {selectedQty} T-shirt{selectedQty > 1 ? 's' : ''} Agora ({formatKwanzas(total)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
