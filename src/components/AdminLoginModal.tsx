import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Lock, X, User, KeyRound, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    loginAdmin,
    setIsAdminPanelOpen,
  } = useStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isAdminModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = loginAdmin(username, password);
    if (success) {
      setIsAdminModalOpen(false);
      setIsAdminPanelOpen(true);
      setUsername('');
      setPassword('');
    } else {
      setError('Utilizador ou senha incorretos. Acesso restrito ao administrador.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-950 border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase font-display">
                Acesso do Administrador
              </h3>
              <p className="text-xs text-zinc-400">
                Painel de Gestão e Edição da Loja
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsAdminModalOpen(false);
              setError(null);
            }}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Utilizador:</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex: Ladislau"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 focus:border-amber-400 text-white text-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Senha de Acesso:</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 focus:border-amber-400 text-white text-sm outline-none transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(251,191,36,0.3)] transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Entrar no Painel</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-white/5 text-center">
          <p className="text-[11px] text-zinc-400">
            Acesso reservado ao proprietário <strong className="text-white">Ladislau</strong>.
          </p>
        </div>

      </div>
    </div>
  );
};
