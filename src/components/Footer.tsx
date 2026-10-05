import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatKwanzas } from '../data';
import { Phone, MessageCircle, Clock, ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { config, isAdminLoggedIn, setIsAdminModalOpen, setIsAdminPanelOpen } = useStore();

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <footer className="bg-black text-zinc-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Store Name & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-black font-black flex items-center justify-center text-lg rounded-md">
                KT
              </div>
              <span className="text-xl font-black text-white tracking-tight uppercase font-display">
                {config.name}
              </span>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              Especializada exclusivamente em <strong className="text-white">T-shirts de gola a cutar</strong>. Moda urbana com corte moderno, 100% algodão e atitude streetwear.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-amber-400 text-xs font-bold">
              <span>Preço Único Oficial:</span>
              <span className="text-white font-black text-sm">{formatKwanzas(config.unitPrice)}</span>
            </div>
          </div>

          {/* Column 2: Produto & Especificações */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-widest font-display">
              T-shirts de Gola a Cutar
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-zinc-300">• Preço: <strong className="text-amber-400">{formatKwanzas(config.unitPrice)}</strong> por unidade</li>
              <li className="text-zinc-300">• Cores Disponíveis: Bege, Branca e Preta</li>
              <li className="text-zinc-300">• Tamanhos Disponíveis: L e XL</li>
              <li className="text-zinc-300">• Composição: 100% Algodão Premium</li>
              {config.enablePromoTrio && (
                <li className="text-zinc-300">• Pack Trio: 3 por apenas <strong className="text-emerald-400">{formatKwanzas(config.promoTrioPrice)}</strong></li>
              )}
            </ul>
          </div>

          {/* Column 3: Atendimento 24h & Contactos */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-widest font-display">
              {config.openingHours}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>{config.openingHours}</span>
              </div>
              
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Contacto: <strong className="text-white">{config.whatsappFormatted}</strong></span>
              </div>

              <div className="flex items-center gap-2 text-zinc-300">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <a
                  href={`https://wa.me/${config.fullWhatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-zinc-300 hover:text-white"
                >
                  WhatsApp: {config.whatsappFormatted}
                </a>
              </div>

              <p className="text-[11px] text-zinc-400 pt-1">
                Estamos localizados no Lubango! Entregas rápidas em toda a cidade (Comercial, Ferrovia, Mitcha, Lucrécia, Lage, João de Almeida, Hélder Neto).
              </p>
            </div>
          </div>

          {/* Column 4: Redes Sociais & TikTok */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-widest font-display">
              Redes Sociais
            </h4>
            <p className="text-xs text-zinc-400">
              Segue as nossas novidades, drops e dicas no TikTok oficial:
            </p>
            
            <a
              href={config.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs transition-colors"
            >
              <svg className="w-4 h-4 fill-current text-rose-500" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.42-.42.76-.91 1-1.45V11.2a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-2.63z" />
              </svg>
              <span>TikTok: {config.tiktokHandle}</span>
            </a>

            <div className="pt-2 text-[11px] text-zinc-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Compra Garantida & Qualidade Comprovada</span>
            </div>

            {/* Admin Access Button in Footer */}
            <div className="pt-2">
              <button
                onClick={handleAdminClick}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 hover:text-amber-400 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Painel Administrador (Ladislau)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Store Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {currentYear} <strong>{config.name}</strong>. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span>T-shirts de gola a cutar</span>
            <span>•</span>
            <span>Preço: {formatKwanzas(config.unitPrice)}</span>
            <span>•</span>
            <span>Contacto: {config.whatsappFormatted}</span>
            <span>•</span>
            <span>TikTok: {config.tiktokHandle}</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{config.openingHours}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
