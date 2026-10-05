import React, { useState } from 'react';
import { TESTIMONIALS, FAQS, STORE_INFO } from '../data';
import { Star, ChevronDown, MessageCircle, ShieldCheck, Check } from 'lucide-react';

export const TestimonialsFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0a0b0e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-2">
              Opinião de Quem Já Comprou
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-display uppercase">
              Avaliações dos Clientes no Lubango
            </h3>
            <p className="text-zinc-400 text-sm mt-2">
              Clientes no Lubango satisfeitos com a firmeza da gola a cutar e a entrega rápida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{t.name}</span>
                    <span className="text-zinc-400 block text-[11px]">{t.location}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {t.verified}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-2">
              Tira Todas as Tuas Dúvidas
            </span>
            <h3 className="text-3xl font-black text-white font-display uppercase">
              Perguntas Frequentes
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ml-3 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help box */}
          <div className="mt-10 p-6 rounded-2xl bg-zinc-900 border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-sm font-bold text-white block">Ficaste com alguma outra questão?</span>
              <span className="text-xs text-zinc-400 block">Nosso atendimento 24h/24h responde prontamente.</span>
            </div>
            <a
              href={`https://wa.me/${STORE_INFO.fullWhatsAppNumber}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre as T-shirts de gola a cutar.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase flex items-center gap-2 hover:bg-[#20ba5a] transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
