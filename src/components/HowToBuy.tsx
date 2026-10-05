import React from 'react';
import { Palette, CheckSquare, MapPin, MessageSquare, ArrowRight } from 'lucide-react';

interface HowToBuyProps {
  onOpenBuyModal: () => void;
}

export const HowToBuy: React.FC<HowToBuyProps> = ({ onOpenBuyModal }) => {
  const steps = [
    {
      num: '01',
      title: 'Escolhe a Cor e Tamanho',
      desc: 'Seleciona entre as 3 cores disponíveis: Bege, Branca ou Preta, e o tamanho ideal (L ou XL).',
      icon: <Palette className="w-6 h-6 text-amber-400" />,
    },
    {
      num: '02',
      title: 'Define a Quantidade',
      desc: 'O valor calcula-se automaticamente: 1 por 6.000 Kz, 2 por 12.000 Kz, ou 3 por apenas 16.000 Kz no pack.',
      icon: <CheckSquare className="w-6 h-6 text-amber-400" />,
    },
    {
      num: '03',
      title: 'Informa os Dados de Entrega',
      desc: 'Indica o teu nome, número de telefone e o bairro onde desejas receber com entrega rápida no Lubango.',
      icon: <MapPin className="w-6 h-6 text-amber-400" />,
    },
    {
      num: '04',
      title: 'Confirmação e WhatsApp',
      desc: 'O teu pedido é registrado e abre imediatamente no WhatsApp da loja para agendamento da entrega rápida.',
      icon: <MessageSquare className="w-6 h-6 text-amber-400" />,
    },
  ];

  return (
    <section id="como-comprar" className="py-20 bg-[#0e1014] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            Simples, Rápido e Seguro
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            Como Fazer o Teu Pedido
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Em menos de 1 minuto o teu pedido está pronto. Não precisas de cartão complicado — compras no site e confirmas no WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center group-hover:bg-amber-400/10 group-hover:border-amber-400 transition-colors">
                    {st.icon}
                  </div>
                  <span className="text-3xl font-black text-zinc-700 font-display group-hover:text-amber-400/40 transition-colors">
                    {st.num}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white uppercase font-display mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-amber-400">
                <span>Passo {i + 1} de 4</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenBuyModal}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(251,191,36,0.35)] transition-all transform hover:-translate-y-0.5"
          >
            <span>Fazer Pedido Agora • 6.000 Kz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
