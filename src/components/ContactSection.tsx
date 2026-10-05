import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatKwanzas } from '../data';
import { Phone, MessageCircle, Clock, MapPin, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  onOpenBuyModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBuyModal }) => {
  const { config } = useStore();

  const buyWhatsAppUrl = `https://wa.me/${config.fullWhatsAppNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de comprar T-shirts de gola a cutar por ${formatKwanzas(config.unitPrice)}. Quais as cores disponíveis para entrega hoje no Lubango?`
  )}`;

  const supportWhatsAppUrl = `https://wa.me/${config.fullWhatsAppNumber}?text=${encodeURIComponent(
    `Olá equipa de ${config.openingHours} da ${config.name}! Gostaria de tirar algumas dúvidas sobre as T-shirts de gola a cutar e entregas no Lubango.`
  )}`;

  return (
    <section id="contacto" className="py-20 bg-[#090a0c] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant 24H Highlight Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="uppercase">{config.openingHours} DISPONÍVEL</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-display tracking-tight leading-none">
            Estamos Sempre Online
          </h2>
          
          <p className="mt-4 text-zinc-300 text-base sm:text-lg">
            Precisas de encomendar agora, verificar tamanhos ou agendar entrega rápida no Lubango? Fala connosco a qualquer hora pelo WhatsApp ou telefone.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: WhatsApp Contact */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>

              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block mb-1">
                WhatsApp Oficial
              </span>
              
              <h3 className="text-3xl font-black text-white font-display">
                {config.whatsappFormatted}
              </h3>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Canal prioritário para pedidos rápidos, envio de comprovativos e agendamento de entregas imediatas no Lubango.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-2.5">
              {/* Botão bem visível: "Comprar pelo WhatsApp" */}
              <a
                href={buyWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Comprar pelo WhatsApp</span>
              </a>

              {/* Botão bem visível: "Falar com atendimento" */}
              <a
                href={supportWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Falar com atendimento</span>
              </a>
            </div>
          </div>

          {/* Card 2: Horário 24h & Entregas */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6">
                <Clock className="w-7 h-7" />
              </div>

              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-1">
                Disponibilidade
              </span>
              
              <h3 className="text-2xl font-black text-white font-display uppercase">
                {config.openingHours}
              </h3>

              <div className="mt-4 space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Segunda a Domingo: 24 Horas / Dia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Entregas rápidas diárias no Lubango (Huíla)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Envios para outros pontos sob consulta</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={onOpenBuyModal}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(251,191,36,0.3)] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Comprar no Site Agora ({formatKwanzas(config.unitPrice)})</span>
              </button>
            </div>
          </div>

          {/* Card 3: Redes & Localização */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-white mb-6">
                <MapPin className="w-7 h-7 text-amber-400" />
              </div>

              <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 block mb-1">
                Localização & Redes
              </span>
              
              <h3 className="text-2xl font-black text-white font-display">
                Lubango, Huíla
              </h3>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Estamos localizados exclusivamente no Lubango! Entregas rápidas ao domicílio no Bairro Comercial, Ferrovia, Mitcha, Lucrécia, Lage, João de Almeida, Hélder Neto e arredores.
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-semibold">TikTok Oficial:</span>
                <span className="text-white font-mono font-bold">{config.tiktokHandle}</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href={config.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Ver TikTok {config.tiktokHandle}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
