import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatKwanzas } from '../data';
import { MessageCircle, X, Sparkles, Clock } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenBuyModal: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenBuyModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { config } = useStore();

  const buyWhatsAppUrl = `https://wa.me/${config.fullWhatsAppNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de comprar T-shirts de gola a cutar por ${formatKwanzas(config.unitPrice)} no WhatsApp.`
  )}`;

  const supportWhatsAppUrl = `https://wa.me/${config.fullWhatsAppNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de falar com o ${config.openingHours} da ${config.name}.`
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Popover Bubble Menu */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-3xl bg-zinc-950 border border-white/20 p-5 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {config.openingHours}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-white font-display uppercase">
              Olá! Como podemos ajudar?
            </h4>
            <p className="text-xs text-zinc-400">
              Estamos online no WhatsApp ({config.whatsappFormatted}) para receber o teu pedido ou tirar dúvidas no Lubango.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            {/* Quick buy */}
            <a
              href={buyWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Comprar pelo WhatsApp</span>
            </a>

            {/* Support */}
            <a
              href={supportWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Falar com atendimento 24h</span>
            </a>

            {/* Buy on site */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBuyModal();
              }}
              className="w-full py-2 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-black font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fazer Pedido no Site ({formatKwanzas(config.unitPrice)})</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 px-4 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-wider shadow-[0_6px_25px_rgba(37,211,102,0.4)] transition-all transform hover:scale-105 active:scale-95"
        aria-label="Abrir WhatsApp da Loja"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp 24h • {config.whatsappFormatted}</span>
      </button>

    </div>
  );
};
