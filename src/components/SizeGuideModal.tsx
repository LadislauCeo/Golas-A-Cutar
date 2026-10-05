import React from 'react';
import { SIZES } from '../data';
import { X, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Tamanhos Disponíveis: L e XL
            </span>
            <h3 className="text-2xl font-black text-white font-display uppercase mt-0.5">
              Guia de Medidas da T-Shirt
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          As nossas T-shirts contam com modelagem streetwear com gola a cutar firme. Confere as medidas aproximadas em centímetros para escolher o tamanho que melhor se adapta ao teu estilo:
        </p>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-800 text-zinc-200 uppercase font-black">
              <tr>
                <th className="py-3 px-4">Tamanho</th>
                <th className="py-3 px-4">Peito</th>
                <th className="py-3 px-4">Comprimento</th>
                <th className="py-3 px-4">Ombro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {SIZES.map((sz) => (
                <tr key={sz.size} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-black text-amber-400">{sz.label}</td>
                  <td className="py-3 px-4">{sz.chest}</td>
                  <td className="py-3 px-4">{sz.length}</td>
                  <td className="py-3 px-4">{sz.shoulders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Descriptions */}
        <div className="space-y-2">
          {SIZES.map((sz) => (
            <div key={sz.size} className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-xs">
              <span className="font-bold text-white uppercase">{sz.label} ({sz.fit}):</span>
              <p className="text-zinc-400 mt-0.5">{sz.recommended}</p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider"
          >
            Entendi, Voltar à Loja
          </button>
        </div>

      </div>
    </div>
  );
};
