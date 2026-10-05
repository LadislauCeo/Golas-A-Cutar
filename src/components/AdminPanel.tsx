import React, { useState } from 'react';
import { useStore, AdminStoreConfig, AdminOrderRecord } from '../context/StoreContext';
import { formatKwanzas } from '../data';
import {
  Sliders,
  ShoppingBag,
  DollarSign,
  Phone,
  Video,
  MapPin,
  Check,
  X,
  Trash2,
  RotateCcw,
  LogOut,
  ExternalLink,
  MessageCircle,
  Eye,
  Plus,
  Palette,
  AlertCircle,
  Clock,
  Sparkles,
  Save,
  CheckCircle2
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    config,
    updateConfig,
    resetConfig,
    orders,
    updateOrderStatus,
    deleteOrderRecord,
    logoutAdmin,
    isAdminPanelOpen,
    setIsAdminPanelOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'prices' | 'texts' | 'contact' | 'colors' | 'orders' | 'bairros'>('prices');
  const [formState, setFormState] = useState<AdminStoreConfig>(config);
  const [saveToast, setSaveToast] = useState(false);
  const [newBairroInput, setNewBairroInput] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Keep local form in sync if external config updates
  React.useEffect(() => {
    setFormState(config);
  }, [config]);

  if (!isAdminPanelOpen) return null;

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateConfig(formState);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Tem a certeza que deseja restaurar as configurações originais da loja?')) {
      resetConfig();
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
  };

  const handleAddBairro = () => {
    if (!newBairroInput.trim()) return;
    const formatted = newBairroInput.startsWith('Lubango -')
      ? newBairroInput.trim()
      : `Lubango - ${newBairroInput.trim()}`;

    if (!formState.lubangoNeighborhoods.includes(formatted)) {
      const updated = [...formState.lubangoNeighborhoods, formatted];
      setFormState({ ...formState, lubangoNeighborhoods: updated });
      updateConfig({ lubangoNeighborhoods: updated });
    }
    setNewBairroInput('');
  };

  const handleRemoveBairro = (bairro: string) => {
    const updated = formState.lubangoNeighborhoods.filter((b) => b !== bairro);
    setFormState({ ...formState, lubangoNeighborhoods: updated });
    updateConfig({ lubangoNeighborhoods: updated });
  };

  const handleColorUpdate = (colorId: string, field: string, value: string) => {
    const updatedColors = formState.productColors.map((col) => {
      if (col.id === colorId) {
        return { ...col, [field]: value };
      }
      return col;
    });
    setFormState({ ...formState, productColors: updatedColors });
  };

  const filteredOrders = orders.filter((ord) => {
    if (orderFilter === 'all') return true;
    return ord.status === orderFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex flex-col">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-black font-extrabold px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>Alterações salvas com sucesso! A loja foi atualizada.</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-zinc-950 border-b border-white/10 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black">
            KT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white uppercase font-display">
                Painel do Administrador
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-bold uppercase">
                Ladislau
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Personalização completa e gestão da loja de T-shirts no Lubango
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleSaveAll()}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase rounded-xl flex items-center gap-1.5 shadow-lg transition-transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </button>

          <button
            onClick={() => setIsAdminPanelOpen(false)}
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase rounded-xl flex items-center gap-1.5 transition-colors border border-white/10"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Loja</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 transition-colors"
            title="Terminar Sessão"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-zinc-900 border-b border-white/5 px-4 sm:px-8 overflow-x-auto flex gap-2 py-2">
        <button
          onClick={() => setActiveTab('prices')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'prices'
              ? 'bg-amber-400 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Preços & Promoções</span>
        </button>

        <button
          onClick={() => setActiveTab('texts')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'texts'
              ? 'bg-amber-400 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Textos & Banner</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'contact'
              ? 'bg-amber-400 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp & TikTok</span>
        </button>

        <button
          onClick={() => setActiveTab('colors')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'colors'
              ? 'bg-amber-400 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Cores & Estoque</span>
        </button>

        <button
          onClick={() => setActiveTab('bairros')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'bairros'
              ? 'bg-amber-400 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Bairros do Lubango</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'orders'
              ? 'bg-amber-400 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Encomendas Recebidas ({orders.length})</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-20">
        
        {/* TAB 1: PREÇOS & PROMOÇÕES */}
        {activeTab === 'prices' && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-5">
              <h3 className="text-lg font-black text-white uppercase font-display flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-400" />
                <span>Preço Unitário da T-Shirt</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Preço por T-shirt (em Kwanzas):
                  </label>
                  <input
                    type="number"
                    value={formState.unitPrice}
                    onChange={(e) =>
                      setFormState({ ...formState, unitPrice: Number(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white font-bold text-lg outline-none focus:border-amber-400"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Atualmente: {formatKwanzas(formState.unitPrice)}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Preço do Combo Trio (3 T-shirts):
                  </label>
                  <input
                    type="number"
                    value={formState.promoTrioPrice}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        promoTrioPrice: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white font-bold text-lg outline-none focus:border-amber-400"
                  />
                  <p className="text-[11px] text-emerald-400 mt-1">
                    Economia de {formatKwanzas(formState.unitPrice * 3 - formState.promoTrioPrice)} para o cliente.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enablePromo"
                  checked={formState.enablePromoTrio}
                  onChange={(e) =>
                    setFormState({ ...formState, enablePromoTrio: e.target.checked })
                  }
                  className="w-4 h-4 accent-amber-400 rounded"
                />
                <label htmlFor="enablePromo" className="text-xs font-bold text-zinc-200 cursor-pointer">
                  Ativar Promoção Especial do Pack de 3 T-shirts (desconto no cálculo automático)
                </label>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-white uppercase">Exemplo de Cálculo na Loja:</h4>
              <ul className="text-xs text-zinc-300 space-y-1.5">
                <li>• 1 T-shirt = <strong>{formatKwanzas(formState.unitPrice)}</strong></li>
                <li>• 2 T-shirts = <strong>{formatKwanzas(formState.unitPrice * 2)}</strong></li>
                <li>• 3 T-shirts = <strong>{formatKwanzas(formState.promoTrioPrice)}</strong></li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: TEXTOS & BANNER */}
        {activeTab === 'texts' && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-lg font-black text-white uppercase font-display flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <span>Textos do Banner Principal e Loja</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Nome da Loja:
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Frase Principal (Título do Hero):
                </label>
                <input
                  type="text"
                  value={formState.tagline}
                  onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Subtexto do Banner:
                </label>
                <textarea
                  rows={2}
                  value={formState.subtext}
                  onChange={(e) => setFormState({ ...formState, subtext: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Barra de Notícias Superior (Ticker):
                </label>
                <input
                  type="text"
                  value={formState.tickerText}
                  onChange={(e) => setFormState({ ...formState, tickerText: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Localização / Cobertura:
                </label>
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Horário de Atendimento:
                </label>
                <input
                  type="text"
                  value={formState.openingHours}
                  onChange={(e) => setFormState({ ...formState, openingHours: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACTO (WHATSAPP & TIKTOK) */}
        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-lg font-black text-white uppercase font-display flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Contacto WhatsApp da Loja</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Número de Telefone WhatsApp (sem espaços):
                </label>
                <input
                  type="text"
                  value={formState.whatsappPhone}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    setFormState({
                      ...formState,
                      whatsappPhone: clean,
                      fullWhatsAppNumber: clean.startsWith('244') ? clean : `244${clean}`,
                    });
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Número Exibido no Site (Formatado):
                </label>
                <input
                  type="text"
                  value={formState.whatsappFormatted}
                  onChange={(e) =>
                    setFormState({ ...formState, whatsappFormatted: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-lg font-black text-white uppercase font-display flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-400" />
                <span>Rede Social: TikTok</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Nome de Utilizador TikTok (ex: @ladislau_ceo):
                </label>
                <input
                  type="text"
                  value={formState.tiktokHandle}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      tiktokHandle: e.target.value,
                      tiktokUrl: `https://www.tiktok.com/${e.target.value.startsWith('@') ? e.target.value : `@${e.target.value}`}`,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Link Direto do TikTok:
                </label>
                <input
                  type="text"
                  value={formState.tiktokUrl}
                  onChange={(e) => setFormState({ ...formState, tiktokUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CORES & ESTOQUE */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white uppercase font-display flex items-center gap-2">
                    <Palette className="w-5 h-5 text-amber-400" />
                    <span>Gestão das 3 Cores e Estoque</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Modifica badges, estado do estoque e descrições para cada cor.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formState.productColors.map((color) => (
                  <div
                    key={color.id}
                    className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <h4 className="text-base font-black text-white uppercase font-display">
                          {color.name}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-amber-400">{formatKwanzas(formState.unitPrice)}</span>
                    </div>

                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900">
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                        Estado do Estoque:
                      </label>
                      <select
                        value={color.stockStatus}
                        onChange={(e) =>
                          handleColorUpdate(color.id, 'stockStatus', e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                      >
                        <option value="Em estoque">Em estoque</option>
                        <option value="Em estoque limitado">Em estoque limitado</option>
                        <option value="Alta procura">Alta procura</option>
                        <option value="Últimas unidades">Últimas unidades</option>
                        <option value="Esgotado temporariamente">Esgotado temporariamente</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                        Badge em Destaque:
                      </label>
                      <input
                        type="text"
                        value={color.badge}
                        onChange={(e) =>
                          handleColorUpdate(color.id, 'badge', e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                        Descrição Breve:
                      </label>
                      <textarea
                        rows={2}
                        value={color.description}
                        onChange={(e) =>
                          handleColorUpdate(color.id, 'description', e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BAIRROS DO LUBANGO */}
        {activeTab === 'bairros' && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-5">
              <div>
                <h3 className="text-lg font-black text-white uppercase font-display flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>Bairros do Lubango para Entrega Rápida</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Estes bairros aparecem na lista de seleção no checkout do cliente.
                </p>
              </div>

              {/* Add New Bairro */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBairroInput}
                  onChange={(e) => setNewBairroInput(e.target.value)}
                  placeholder="Nome do novo bairro (ex: Bairro Comercial / Mitcha)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddBairro();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddBairro}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </div>

              {/* List */}
              <div className="space-y-2">
                {formState.lubangoNeighborhoods.map((bairro, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between group"
                  >
                    <span className="text-xs font-semibold text-zinc-200">{bairro}</span>
                    <button
                      onClick={() => handleRemoveBairro(bairro)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                      title="Remover bairro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ENCOMENDAS RECEBIDAS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-white uppercase font-display flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <span>Histórico de Encomendas Recebidas ({orders.length})</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Todas as encomendas efetuadas no site aparecem aqui para acompanhamento e envio de estafeta.
                  </p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Filtrar por:</span>
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className="px-3 py-1.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white outline-none"
                  >
                    <option value="all">Todas ({orders.length})</option>
                    <option value="Pendente">Pendentes</option>
                    <option value="Confirmado">Confirmadas</option>
                    <option value="A caminho">A caminho</option>
                    <option value="Entregue">Entregues</option>
                    <option value="Cancelado">Canceladas</option>
                  </select>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="py-16 text-center text-zinc-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-zinc-700" />
                  <p className="text-sm font-semibold">Nenhuma encomenda registrada ainda.</p>
                  <p className="text-xs text-zinc-600">
                    Assim que um cliente fizer um pedido no site ou WhatsApp, aparecerá nesta lista.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((ord) => {
                    const cleanPhone = ord.phone.replace(/\D/g, '');
                    const waCustomerLink = `https://wa.me/244${cleanPhone}?text=${encodeURIComponent(
                      `Olá ${ord.customerName}! Aqui é o Ladislau da KUTAR STREETWEAR a respeito da tua encomenda ${ord.orderNumber}.`
                    )}`;

                    return (
                      <div
                        key={ord.orderId}
                        className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4 transition-all hover:border-amber-400/40"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-amber-400 font-display">
                              {ord.orderNumber}
                            </span>
                            <span className="text-xs text-zinc-400 font-mono">{ord.date}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Status changer */}
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                updateOrderStatus(
                                  ord.orderId,
                                  e.target.value as AdminOrderRecord['status']
                                )
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold outline-none border ${
                                ord.status === 'Entregue'
                                  ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400'
                                  : ord.status === 'A caminho'
                                  ? 'bg-sky-950 border-sky-500/50 text-sky-400'
                                  : ord.status === 'Confirmado'
                                  ? 'bg-amber-950 border-amber-500/50 text-amber-400'
                                  : ord.status === 'Cancelado'
                                  ? 'bg-rose-950 border-rose-500/50 text-rose-400'
                                  : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                              }`}
                            >
                              <option value="Pendente">Pendente</option>
                              <option value="Confirmado">Confirmado</option>
                              <option value="A caminho">A caminho (Estafeta)</option>
                              <option value="Entregue">Entregue ✓</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>

                            <button
                              onClick={() => deleteOrderRecord(ord.orderId)}
                              className="p-1.5 text-zinc-500 hover:text-rose-400"
                              title="Apagar registro"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Customer & Address Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-zinc-500 uppercase block font-bold">Cliente:</span>
                            <span className="text-white font-bold text-sm">{ord.customerName}</span>
                          </div>

                          <div>
                            <span className="text-zinc-500 uppercase block font-bold">Telefone:</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-amber-400 font-bold">{ord.phone}</span>
                              <a
                                href={waCustomerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          </div>

                          <div>
                            <span className="text-zinc-500 uppercase block font-bold">Local no Lubango:</span>
                            <span className="text-zinc-300">{ord.address}</span>
                          </div>
                        </div>

                        {/* Items & Total */}
                        <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="space-y-1">
                            {ord.items.map((it, i) => (
                              <div key={i} className="text-zinc-300">
                                • T-shirt Gola a Cutar ({it.colorName} - Tam. {it.size}) × <strong>{it.quantity} un.</strong>
                              </div>
                            ))}
                          </div>

                          <div className="text-right">
                            <span className="text-zinc-400 text-[11px] block">Total a Receber:</span>
                            <span className="text-xl font-black text-amber-400 font-display">
                              {formatKwanzas(ord.total)}
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Global Save / Reset Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSaveAll()}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase rounded-xl flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Todas as Alterações</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-semibold text-xs uppercase rounded-xl flex items-center gap-2 border border-white/10"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restaurar Padrões de Fábrica</span>
            </button>
          </div>

          <span className="text-xs text-zinc-500">
            Sessão autenticada como <strong>Ladislau</strong>
          </span>
        </div>

      </main>
    </div>
  );
};
