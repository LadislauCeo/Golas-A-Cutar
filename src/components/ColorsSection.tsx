import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatKwanzas, createWhatsAppOrderLink } from '../data';
import { TshirtColor, TshirtSize, ProductColor } from '../types';
import { ShoppingBag, Sparkles, MessageCircle, Check, Eye, Maximize2, X } from 'lucide-react';

interface ColorsSectionProps {
  onAddToCart: (color: TshirtColor, size: TshirtSize, quantity: number) => void;
  onDirectBuy: (color: TshirtColor, size: TshirtSize, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ColorsSection: React.FC<ColorsSectionProps> = ({
  onAddToCart,
  onDirectBuy,
  onOpenSizeGuide,
}) => {
  const { config } = useStore();

  // Local size selections per card
  const [selectedSizes, setSelectedSizes] = useState<Record<string, TshirtSize>>({
    bege: 'L',
    branca: 'L',
    preta: 'L',
  });

  // Modal zoom image preview
  const [zoomedColor, setZoomedColor] = useState<ProductColor | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSizeChange = (color: string, size: TshirtSize) => {
    setSelectedSizes((prev) => ({ ...prev, [color]: size }));
  };

  const handleAddWithFeedback = (color: TshirtColor) => {
    const size = selectedSizes[color] || 'L';
    onAddToCart(color, size, 1);
    const colorObj = config.productColors.find((c) => c.id === color);
    setToastMessage(`✓ T-shirt ${colorObj?.name} (Tamanho ${size}) adicionada ao carrinho!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section id="cores" className="py-20 bg-[#0e1014] relative">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black font-extrabold text-sm px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            Cores Disponíveis
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            Escolhe a Tua Cor Favorita
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Todas as peças contam com a icônica <strong className="text-white">gola a cutar</strong>, confeccionadas em malha encorpada 100% algodão de alta gramatura.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold text-zinc-400">
            <span>Preço Oficial: <strong className="text-amber-400">{formatKwanzas(config.unitPrice)}</strong></span>
            <span>•</span>
            <button
              onClick={onOpenSizeGuide}
              className="text-zinc-300 underline hover:text-amber-400 transition-colors"
            >
              Consultar Guia de Tamanhos (L e XL)
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div id="tshirts" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.productColors.map((product) => {
            const currentSize = selectedSizes[product.id] || 'L';

            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-zinc-900/90 border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              >
                {/* Big Quality Image Container */}
                <div className="relative aspect-[4/4] sm:aspect-[4/4.2] overflow-hidden bg-black/40">
                  <img
                    src={product.image}
                    alt={`T-shirt de gola a cutar cor ${product.name} - ${formatKwanzas(config.unitPrice)}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setZoomedColor(product)}
                  />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase rounded-md tracking-wider">
                      {product.badge}
                    </span>
                  </div>

                  {/* Stock status indicator */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold rounded-md flex items-center gap-1.5 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {product.stockStatus}
                    </span>
                  </div>

                  {/* Zoom button */}
                  <button
                    onClick={() => setZoomedColor(product)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 opacity-90 hover:opacity-100 transition-opacity"
                    title="Ampliar foto e ver detalhes da gola"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  
                  {/* Title, Color Swatch & Price */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-5 h-5 rounded-full border-2 shadow-sm shrink-0"
                          style={{
                            backgroundColor: product.hex,
                            borderColor: product.borderHex,
                          }}
                        />
                        <h3 className="text-2xl font-black text-white uppercase font-display">
                          {product.name}
                        </h3>
                      </div>

                      {/* Highlighted Price */}
                      <div className="text-right">
                        <span className="text-2xl font-black text-amber-400 font-display">
                          {formatKwanzas(config.unitPrice)}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Size Selector (L and XL) */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-2">
                      <span>Escolher Tamanho:</span>
                      <button
                        onClick={onOpenSizeGuide}
                        className="text-[11px] text-amber-400 hover:underline"
                      >
                        Tabela de Medidas
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {(['L', 'XL'] as TshirtSize[]).map((sizeOption) => {
                        const isSelected = currentSize === sizeOption;
                        return (
                          <button
                            key={sizeOption}
                            type="button"
                            onClick={() => handleSizeChange(product.id, sizeOption)}
                            className={`py-2 px-3 rounded-xl text-xs font-black tracking-wider transition-all flex items-center justify-center gap-2 border ${
                              isSelected
                                ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                                : 'bg-zinc-800/80 text-zinc-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            <span>TAMANHO {sizeOption}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Highlighted Features Pills */}
                  <div className="py-2.5 px-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-[11px] text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>Gola a cutar firme (não afrouxa)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>100% Algodão penteado de alta densidade</span>
                    </div>
                  </div>

                  {/* Highlighted Call-to-Actions */}
                  <div className="space-y-2 pt-1">
                    {/* Botão destacado "Comprar agora" */}
                    <button
                      onClick={() => onDirectBuy(product.id as TshirtColor, currentSize, 1)}
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_25px_rgba(251,191,36,0.5)] active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Comprar agora • {formatKwanzas(config.unitPrice)}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Add to Cart */}
                      <button
                        onClick={() => handleAddWithFeedback(product.id as TshirtColor)}
                        className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-white/10"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                        <span>Adicionar</span>
                      </button>

                      {/* WhatsApp Direct */}
                      <a
                        href={createWhatsAppOrderLink({
                          items: [
                            {
                              colorName: product.name,
                              size: currentSize,
                              quantity: 1,
                            },
                          ],
                          total: config.unitPrice,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Zoom Details */}
      {zoomedColor && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <button
              onClick={() => setZoomedColor(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-[4/3] bg-black">
              <img
                src={zoomedColor.image}
                alt={zoomedColor.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-black text-white font-display uppercase">
                    T-shirt Gola a Cutar - {zoomedColor.name}
                  </h4>
                  <p className="text-sm text-zinc-400 mt-1">{zoomedColor.description}</p>
                </div>
                <span className="text-2xl font-black text-amber-400 font-display">
                  6.000 Kz
                </span>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    const colorId = zoomedColor.id;
                    const size = selectedSizes[colorId];
                    setZoomedColor(null);
                    onDirectBuy(colorId, size, 1);
                  }}
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-sm rounded-xl"
                >
                  Comprar agora
                </button>
                <button
                  onClick={() => setZoomedColor(null)}
                  className="px-6 py-3 bg-zinc-800 text-white font-bold text-sm rounded-xl hover:bg-zinc-700"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
