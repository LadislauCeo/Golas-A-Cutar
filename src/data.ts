import { ProductColor, TshirtColor } from './types';

// Asset images
import blackImg from './assets/images/tshirt_black_1791209517544.jpg';
import whiteImg from './assets/images/tshirt_white_1791209531811.jpg';
import beigeImg from './assets/images/tshirt_beige_1791209543233.jpg';
import heroImg from './assets/images/tshirt_hero_banner_1791209505027.jpg';
import collectionImg from './assets/images/tshirts_collection_1791209558551.jpg';

export const ASSETS = {
  hero: heroImg,
  collection: collectionImg,
  black: blackImg,
  white: whiteImg,
  beige: beigeImg,
};

export const STORE_INFO = {
  name: 'KUTAR STREETWEAR',
  tagline: 'O teu estilo começa aqui.',
  subtext: 'T-shirts de gola a cutar com estilo, qualidade e preço acessível.',
  unitPrice: 6000,
  currency: 'Kz',
  currencyCode: 'AOA',
  whatsappPhone: '924535247',
  whatsappFormatted: '924 535 247',
  whatsappCountryCode: '244',
  fullWhatsAppNumber: '244924535247',
  tiktokHandle: '@ladislau_ceo',
  tiktokUrl: 'https://www.tiktok.com/@ladislau_ceo',
  openingHours: 'Atendimento 24h/24h',
  location: 'Lubango, Huíla - Angola (Entregas rápidas em todo o Lubango)',
};

export const PRODUCT_COLORS: ProductColor[] = [
  {
    id: 'bege',
    name: 'Bege',
    nameEn: 'Sand Beige',
    hex: '#D7C4AF',
    borderHex: '#B9A187',
    description: 'Tom neutro e sofisticado, a tendência absoluta do streetwear moderno. Malha encorpada e toque suave.',
    badge: 'Mais Desejada',
    image: beigeImg,
    stockStatus: 'Em estoque limitado',
  },
  {
    id: 'branca',
    name: 'Branca',
    nameEn: 'Pure White',
    hex: '#F9FAFB',
    borderHex: '#D1D5DB',
    description: 'O clássico indispensável. Branco puro luminoso com gola a cutar firme e canelada reforçada.',
    badge: 'Essencial Urbano',
    image: whiteImg,
    stockStatus: 'Em estoque',
  },
  {
    id: 'preta',
    name: 'Preta',
    nameEn: 'Jet Black',
    hex: '#141416',
    borderHex: '#374151',
    description: 'Preto intenso de alta durabilidade que não desbota. A gola a cutar ajustada confere porte e atitude.',
    badge: 'Mais Vendida',
    image: blackImg,
    stockStatus: 'Alta procura',
  },
];

export const SIZES = [
  {
    size: 'L' as const,
    label: 'Tamanho L',
    chest: '108 - 114 cm',
    length: '74 cm',
    shoulders: '48 cm',
    fit: 'Caimento Regular / Confortável',
    recommended: 'Para quem busca um caimento limpo e moderno.',
  },
  {
    size: 'XL' as const,
    label: 'Tamanho XL',
    chest: '116 - 122 cm',
    length: '78 cm',
    shoulders: '52 cm',
    fit: 'Caimento Oversized Streetwear',
    recommended: 'Para quem prefere visual streetwear amplo e despojado.',
  },
];

/**
 * Pricing calculator adhering to:
 * 1 T-shirt = 6.000 Kz
 * 2 T-shirts = 12.000 Kz
 * 3 T-shirts = 16.000 Kz (Poupe 2.000 Kz no Pack Trio!)
 * Multiples of 3 enjoy 16.000 Kz combo pricing.
 */
export function calculateOrderPrice(quantity: number): {
  subtotal: number;
  discount: number;
  total: number;
  discountText?: string;
} {
  const basePricePerItem = STORE_INFO.unitPrice; // 6000
  const subtotal = quantity * basePricePerItem;

  const packsOfThree = Math.floor(quantity / 3);
  const remainder = quantity % 3;

  const total = (packsOfThree * 16000) + (remainder * basePricePerItem);
  const discount = subtotal - total;

  let discountText = undefined;
  if (packsOfThree > 0) {
    discountText = `Desconto Especial Aplicado: -${discount.toLocaleString('pt-AO')} Kz (${packsOfThree}x Combo Trio de 16.000 Kz)`;
  }

  return { subtotal, discount, total, discountText };
}

export function formatKwanzas(value: number): string {
  return `${value.toLocaleString('pt-AO')} Kz`;
}

/**
 * Builds direct WhatsApp URL with pre-filled message
 */
export function createWhatsAppOrderLink(params: {
  customerName?: string;
  phone?: string;
  address?: string;
  items: Array<{ colorName: string; size: string; quantity: number }>;
  total: number;
  orderNumber?: string;
}): string {
  const phone = STORE_INFO.fullWhatsAppNumber;
  let text = `👋 *Olá KUTAR STREETWEAR!*\n`;
  text += `Gostaria de confirmar uma encomenda de *T-shirts de Gola a Cutar*:\n\n`;

  if (params.orderNumber) {
    text += `🔖 *Nº do Pedido:* ${params.orderNumber}\n`;
  }

  text += `📦 *ITENS DA ENCOMENDA:*\n`;
  params.items.forEach((item, idx) => {
    text += `${idx + 1}. T-shirt Gola a Cutar - Cor: *${item.colorName}* | Tamanho: *${item.size}* | Qtd: *${item.quantity} un.*\n`;
  });

  text += `\n💰 *VALOR TOTAL:* *${formatKwanzas(params.total)}*\n`;

  if (params.customerName) {
    text += `\n👤 *Nome:* ${params.customerName}\n`;
  }
  if (params.phone) {
    text += `📱 *Telefone do Cliente:* ${params.phone}\n`;
  }
  if (params.address) {
    text += `📍 *Endereço / Localização para Entrega:* ${params.address}\n`;
  }

  text += `\n⚡ Por favor, confirmem a disponibilidade e o horário de entrega. Obrigado!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function createGeneralWhatsAppLink(customMessage?: string): string {
  const phone = STORE_INFO.fullWhatsAppNumber;
  const message = customMessage || `Olá KUTAR STREETWEAR! Gostaria de saber mais informações sobre as T-shirts de gola a cutar por 6.000 Kz e os tamanhos disponíveis.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const FEATURES = [
  {
    title: 'Gola a Cutar Perfeita',
    description: 'Gola redonda fechada e firme com canelado encorpado que não alarga nem deforma após as lavagens.',
    icon: 'Sparkles',
  },
  {
    title: '100% Algodão Premium',
    description: 'Tecido respirável e de toque macio, ideal para o clima angolano com durabilidade de alto nível.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Preço Justo: 6.000 Kz',
    description: 'Alta costura streetwear virgem sem intermediários caros. Qualidade de grife com preço acessível.',
    icon: 'Tag',
  },
  {
    title: 'Atendimento 24h/24h',
    description: 'Nossa equipa de atendimento está disponível 24 horas por dia no WhatsApp para esclarecer e agendar entregas.',
    icon: 'Clock',
  },
  {
    title: 'Tamanhos L e XL',
    description: 'Modelagem moderna feita para quem gosta de bom corte e caimento com presença urbana.',
    icon: 'Layers',
  },
  {
    title: 'Entregas Rápidas no Lubango',
    description: 'Estamos localizados no Lubango! Entregamos diretamente na tua residência, trabalho ou ponto de encontro no Lubango com máxima rapidez e comodidade.',
    icon: 'Truck',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Edmilson Santos',
    location: 'Bairro Comercial, Lubango',
    comment: 'A gola a cutar é realmente o que prometem: bem ajustada e grossa! O tecido é pesado e tem caimento de luxo. Comprei as 3 cores.',
    rating: 5,
    verified: 'Compra verificada',
  },
  {
    name: 'Yara Monteiro',
    location: 'Mitcha, Lubango',
    comment: 'Chegou super rápido no mesmo dia aqui no Lubango. Pedi pelo WhatsApp e o atendimento às 23h foi impecável. Recomendo muito!',
    rating: 5,
    verified: 'Compra verificada',
  },
  {
    name: 'Mateus Silva',
    location: 'Lucrécia / Lage, Lubango',
    comment: 'Pelo preço de 6.000 Kz a qualidade é incomparável. T-shirt virgem excelente para o dia-a-dia e para saídas.',
    rating: 5,
    verified: 'Compra verificada',
  },
];

export const FAQS = [
  {
    question: 'O que significa T-shirt de gola a cutar?',
    answer: 'A "gola a cutar" (ou gola fechada/snug crewneck) é a gola mais alta e ajustada rente ao pescoço com canelado grosso. É o corte favorito do streetwear mundial por conferir um visual elegante, encorpado e moderno que não fica caído.',
  },
  {
    question: 'Quais são as cores e tamanhos disponíveis?',
    answer: 'Temos disponíveis as três cores mais procuradas do streetwear: Bege, Branca e Preta. Os tamanhos disponíveis em estoque são L e XL.',
  },
  {
    question: 'Qual é o valor e existe desconto para mais unidades?',
    answer: 'O preço unitário é de 6.000 Kz. Temos uma super promoção: na compra de 3 T-shirts o valor fica por apenas 16.000 Kz (poupas 2.000 Kz!).',
  },
  {
    question: 'Como funciona a entrega no Lubango?',
    answer: 'Fazemos entregas rápidas em todos os bairros do Lubango (Bairro Comercial, Ferrovia, Hélder Neto, Mitcha, Lucrécia, Nambambe, Lage, João de Almeida, Senhora do Monte, etc.) através de estafeta direto no mesmo dia. Também despachamos para outros pontos sob consulta.',
  },
  {
    question: 'O atendimento é realmente 24 horas?',
    answer: 'Sim! Nosso canal de WhatsApp no número 924 535 247 funciona 24 horas por dia, 7 dias por semana para receber o teu pedido a qualquer hora.',
  },
];
