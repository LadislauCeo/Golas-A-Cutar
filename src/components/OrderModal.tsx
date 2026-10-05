import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { formatKwanzas, createWhatsAppOrderLink } from '../data';
import { TshirtColor, TshirtSize, CartItem, ConfirmedOrder } from '../types';
import { X, Check, Sparkles, MessageCircle, MapPin, Phone, User, ShoppingBag, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialColor?: TshirtColor;
  initialSize?: TshirtSize;
  initialQuantity?: number;
  cartItems?: CartItem[];
  onOrderCompleted?: (order: ConfirmedOrder) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialColor = 'preta',
  initialSize = 'L',
  initialQuantity = 1,
  cartItems,
  onOrderCompleted,
}) => {
  const { config, addOrderRecord } = useStore();

  // Form states
  const [selectedColor, setSelectedColor] = useState<TshirtColor>(initialColor);
  const [selectedSize, setSelectedSize] = useState<TshirtSize>(initialSize);
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cityArea, setCityArea] = useState(
    config.lubangoNeighborhoods[0] || 'Lubango - Bairro Comercial (Centro)'
  );
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  // Sync initial color/size when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialColor) setSelectedColor(initialColor);
      if (initialSize) setSelectedSize(initialSize);
      if (initialQuantity) setQuantity(initialQuantity);
      setErrors({});
      setConfirmedOrder(null);
    }
  }, [isOpen, initialColor, initialSize, initialQuantity]);

  if (!isOpen) return null;

  // Price calculation
  const isMultiCart = cartItems && cartItems.length > 0;
  const effectiveTotalItems = isMultiCart
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : quantity;

  const unitPrice = config.unitPrice;
  const promoTrioPrice = config.promoTrioPrice;
  const subtotal = effectiveTotalItems * unitPrice;

  let total = subtotal;
  let discount = 0;
  let discountText = undefined;

  if (config.enablePromoTrio) {
    const packsOfThree = Math.floor(effectiveTotalItems / 3);
    const remainder = effectiveTotalItems % 3;
    total = (packsOfThree * promoTrioPrice) + (remainder * unitPrice);
    discount = subtotal - total;
    if (packsOfThree > 0) {
      discountText = `Desconto Especial Aplicado: -${formatKwanzas(discount)} (${packsOfThree}x Combo Trio)`;
    }
  }

  const selectedColorData =
    config.productColors.find((c) => c.id === selectedColor) || config.productColors[0];

  const handleQuantityChange = (delta: number) => {
    const newQty = Math.max(1, Math.min(20, quantity + delta));
    setQuantity(newQty);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) {
      newErrors.customerName = 'Por favor, informa o teu nome.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Por favor, informa o teu número de telefone.';
    } else if (phone.replace(/\D/g, '').length < 9) {
      newErrors.phone = 'Número de telefone inválido (mínimo 9 dígitos).';
    }
    if (!address.trim()) {
      newErrors.address = 'Informa o endereço, bairro ou ponto de referência para entrega.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `KT-${randomNum}`;
    const orderDate = new Date().toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const finalItems: CartItem[] = isMultiCart
      ? cartItems
      : [
          {
            id: `item-${Date.now()}`,
            color: selectedColor,
            colorName: selectedColorData.name,
            size: selectedSize,
            quantity: quantity,
            unitPrice: unitPrice,
            image: selectedColorData.image,
          },
        ];

    const waItems = finalItems.map((it) => ({
      colorName: it.colorName,
      size: it.size,
      quantity: it.quantity,
    }));

    const fullAddress = `${address} (${cityArea})${notes ? ` - Obs: ${notes}` : ''}`;

    const waLink = createWhatsAppOrderLink({
      customerName,
      phone,
      address: fullAddress,
      items: waItems,
      total: total,
      orderNumber,
    });

    const newOrder: ConfirmedOrder = {
      orderId: `ord_${Date.now()}`,
      orderNumber,
      date: orderDate,
      items: finalItems,
      customerName,
      phone,
      address: fullAddress,
      cityArea,
      subtotal: subtotal,
      discount: discount,
      total: total,
      whatsappUrl: waLink,
    };

    // Save to admin orders list
    addOrderRecord(newOrder);

    setTimeout(() => {
      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      if (onOrderCompleted) {
        onOrderCompleted(newOrder);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-black">
              KT
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase font-display">
                {confirmedOrder ? 'Pedido Confirmado com Sucesso!' : 'Finalizar Compra da T-Shirt'}
              </h3>
              <p className="text-xs text-zinc-400">
                {confirmedOrder
                  ? 'Agradecemos a tua preferência! Envia a confirmação pelo WhatsApp.'
                  : 'Preço: 6.000 Kz cada • Atendimento 24h/24h'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/5"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {confirmedOrder ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 animate-pulse">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                  Encomenda Gerada com Êxito
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
                  Nº {confirmedOrder.orderNumber}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">Data: {confirmedOrder.date}</p>
              </div>

              {/* Order Summary Box */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase text-zinc-400">Cliente</span>
                  <span className="text-sm font-black text-white">{confirmedOrder.customerName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase text-zinc-400">Telefone</span>
                  <span className="text-sm font-bold text-amber-400">{confirmedOrder.phone}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase text-zinc-400">Entrega</span>
                  <span className="text-xs text-zinc-200 text-right max-w-[240px] truncate">
                    {confirmedOrder.address}
                  </span>
                </div>

                <div className="pt-1 space-y-2">
                  <span className="text-xs font-bold uppercase text-zinc-400 block">Itens:</span>
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-zinc-300">
                      <span>
                        • T-shirt Gola a Cutar ({item.colorName} - Tam. {item.size}) × {item.quantity}
                      </span>
                      <span className="font-bold">{formatKwanzas(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {confirmedOrder.discount > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold pt-2 border-t border-white/10">
                    <span>Desconto Pack Especial:</span>
                    <span>-{formatKwanzas(confirmedOrder.discount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-base font-black text-white uppercase font-display">
                    Total a Pagar
                  </span>
                  <span className="text-2xl font-black text-amber-400 font-display">
                    {formatKwanzas(confirmedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <div className="space-y-3">
                <a
                  href={confirmedOrder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(37,211,102,0.4)] transition-all transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Enviar Pedido pelo WhatsApp (924 535 247)</span>
                </a>

                <p className="text-xs text-zinc-400">
                  Clica no botão verde acima para enviar os dados da tua encomenda diretamente para a nossa equipa no WhatsApp e agendar a entrega agora mesmo.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setConfirmedOrder(null);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs uppercase"
                >
                  Fechar Janela
                </button>
              </div>
            </div>
          ) : (
            /* PURCHASE FORM (STEPS 1 TO 7) */
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              
              {/* Product preview and Color / Size selection (unless already in cart) */}
              {!isMultiCart && (
                <div className="space-y-5 p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-white/10">
                  
                  {/* Step 1: Escolher a Cor */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-black">
                          1
                        </span>
                        <span>Escolher a Cor:</span>
                      </label>
                      <span className="text-xs font-bold text-white capitalize">
                        Selecionada: {selectedColorData.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {config.productColors.map((c) => {
                        const isSelected = selectedColor === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedColor(c.id as TshirtColor)}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all relative ${
                              isSelected
                                ? 'bg-zinc-800 border-amber-400 ring-2 ring-amber-400/30'
                                : 'bg-zinc-900 border-white/10 hover:border-white/20'
                            }`}
                          >
                            <span
                              className="w-7 h-7 rounded-full border-2 shadow-inner shrink-0"
                              style={{ backgroundColor: c.hex, borderColor: c.borderHex }}
                            />
                            <span className="text-xs font-bold text-white uppercase">{c.name}</span>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size selection (L and XL) */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-black">
                        *
                      </span>
                      <span>Escolher o Tamanho:</span>
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      {(['L', 'XL'] as TshirtSize[]).map((sz) => {
                        const isSelected = selectedSize === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedSize(sz)}
                            className={`py-3 px-4 rounded-xl border font-black text-sm uppercase transition-all flex items-center justify-center gap-2 ${
                              isSelected
                                ? 'bg-amber-400 text-black border-amber-400 shadow'
                                : 'bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            <span>Tamanho {sz}</span>
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Escolher a Quantidade */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-black">
                          2
                        </span>
                        <span>Escolher a Quantidade:</span>
                      </label>
                      <span className="text-xs text-zinc-400">
                        Preço unitário: 6.000 Kz
                      </span>
                    </div>

                    <div className="flex items-center gap-4 bg-zinc-900 p-2.5 rounded-xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(-1)}
                        className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-black text-lg flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-black text-white font-display">
                          {quantity}
                        </span>
                        <span className="text-[11px] text-zinc-400 block">
                          T-shirt{quantity > 1 ? 's' : ''} de Gola a Cutar
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-lg flex items-center justify-center transition-colors shadow"
                      >
                        +
                      </button>
                    </div>

                    {/* Quick quantity shortcuts */}
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(1)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border ${quantity === 1 ? 'bg-zinc-800 border-amber-400 text-amber-400' : 'bg-zinc-950 border-white/5 text-zinc-400'}`}
                      >
                        1 un. (6.000 Kz)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuantity(2)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border ${quantity === 2 ? 'bg-zinc-800 border-amber-400 text-amber-400' : 'bg-zinc-950 border-white/5 text-zinc-400'}`}
                      >
                        2 un. (12.000 Kz)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuantity(3)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border ${quantity === 3 ? 'bg-amber-400/20 border-amber-400 text-amber-400' : 'bg-zinc-950 border-white/5 text-zinc-400'}`}
                      >
                        ★ 3 un. (16.000 Kz)
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* Multi-item cart list if checkout from Cart */}
              {isMultiCart && (
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
                  <span className="text-xs font-black uppercase text-amber-400 block">
                    Itens no Carrinho ({cartItems.length}):
                  </span>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs text-zinc-300 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt={item.colorName} className="w-8 h-8 rounded object-cover" />
                        <span>{item.colorName} ({item.size}) × {item.quantity}</span>
                      </div>
                      <span className="font-bold text-white">{formatKwanzas(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3, 4, 5: Customer Details */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-black">
                    3
                  </span>
                  <span>Dados para Entrega:</span>
                </span>

                {/* 3. Informar o nome */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Teu Nome Completo:</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Cláudio António"
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border ${
                      errors.customerName ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'
                    } text-white text-sm outline-none transition-colors`}
                  />
                  {errors.customerName && (
                    <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.customerName}</p>
                  )}
                </div>

                {/* 4. Informar o número de telefone */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Número de Telefone / WhatsApp:</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 924 535 247"
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border ${
                        errors.phone ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'
                      } text-white text-sm outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.phone}</p>
                  )}
                </div>

                {/* 5. Informar a localização / endereço para entrega */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Endereço / Localização para Entrega no Lubango:</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex: Bairro Comercial, Rua Dr. António Agostinho Neto"
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border ${
                      errors.address ? 'border-rose-500' : 'border-white/10 focus:border-amber-400'
                    } text-white text-sm outline-none transition-colors`}
                  />
                  {errors.address && (
                    <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.address}</p>
                  )}
                </div>

                {/* Quick Area / Bairro Selector do Lubango */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                    Bairro / Zona do Lubango (Entregas Rápidas):
                  </label>
                  <select
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 text-xs outline-none"
                  >
                    {config.lubangoNeighborhoods.map((bairro, idx) => (
                      <option key={idx} value={bairro}>
                        {bairro}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Observações opcionais */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                    Instruções ou Observações (Opcional):
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Ligar ao chegar, entregar no período da tarde"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              {/* Step 6: Ver o total automaticamente */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/15 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                  Resumo e Cálculo Automático:
                </span>
                
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Cálculo Base ({effectiveTotalItems} × {formatKwanzas(unitPrice)}):</span>
                  <span>{formatKwanzas(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-black">
                    <span>{discountText || 'Desconto Pack Especial:'}</span>
                    <span>-{formatKwanzas(discount)}</span>
                  </div>
                )}

                <div className="flex items-baseline justify-between pt-3 border-t border-white/10">
                  <div>
                    <span className="text-xs text-zinc-400 uppercase block font-semibold">Total a Pagar:</span>
                    <span className="text-[11px] text-zinc-500">Pagamento no ato da entrega no Lubango</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400 font-display">
                      {formatKwanzas(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 7: Confirmar o Pedido */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(251,191,36,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processando...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Confirmar Pedido ({formatKwanzas(total)})</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Compra 100% Segura</span>
                  </div>
                  <span>•</span>
                  <span>Atendimento: {config.whatsappFormatted}</span>
                </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
