import React from 'react';
import { useStore } from '../context/StoreContext';
import { CartItem } from '../types';
import { formatKwanzas } from '../data';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const { config } = useStore();

  if (!isOpen) return null;

  const totalQuantity = items.reduce((acc, it) => acc + it.quantity, 0);

  const unitPrice = config.unitPrice;
  const promoTrioPrice = config.promoTrioPrice;
  const subtotal = totalQuantity * unitPrice;

  let total = subtotal;
  let discount = 0;

  if (config.enablePromoTrio) {
    const packsOfThree = Math.floor(totalQuantity / 3);
    const remainder = totalQuantity % 3;
    total = (packsOfThree * promoTrioPrice) + (remainder * unitPrice);
    discount = subtotal - total;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-zinc-950 border-l border-white/10 h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-white uppercase font-display">
              Carrinho de Compras
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold">
              {totalQuantity}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white uppercase">O teu carrinho está vazio</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Escolhe as tuas T-shirts de gola a cutar favoritas por {formatKwanzas(config.unitPrice)} cada.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase rounded-xl"
              >
                Ver T-shirts
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 flex gap-3 items-center group"
              >
                <img
                  src={item.image}
                  alt={item.colorName}
                  className="w-16 h-16 rounded-xl object-cover bg-zinc-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white uppercase truncate">
                    T-shirt {item.colorName}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span>Tam. <strong className="text-white">{item.size}</strong></span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{formatKwanzas(item.unitPrice)}</span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-zinc-500 hover:text-rose-400 transition-colors"
                  title="Remover item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Automatic Calculation */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-zinc-900/90 space-y-4">
            
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal ({totalQuantity} T-shirt{totalQuantity > 1 ? 's' : ''}):</span>
                <span>{formatKwanzas(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Desconto Especial Pack:</span>
                  <span>-{formatKwanzas(discount)}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-white">
                <span className="text-sm font-bold uppercase font-display">Total Automático:</span>
                <span className="text-2xl font-black text-amber-400 font-display">
                  {formatKwanzas(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(251,191,36,0.3)] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Finalizar Compra ({formatKwanzas(total)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-zinc-400">
              {config.openingHours} • Entregas rápidas no Lubango
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
