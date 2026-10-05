import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ColorsSection } from './components/ColorsSection';
import { PricingPromo } from './components/PricingPromo';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowToBuy } from './components/HowToBuy';
import { SocialSection } from './components/SocialSection';
import { ContactSection } from './components/ContactSection';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OrderModal } from './components/OrderModal';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';

import { CartItem, TshirtColor, TshirtSize, ConfirmedOrder } from './types';
import { createGeneralWhatsAppLink } from './data';

function AppContent() {
  const { config, addOrderRecord } = useStore();

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kutar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kutar_cart', JSON.stringify(cartItems));
    } catch {
      // Storage error fallback
    }
  }, [cartItems]);

  // Modal visibility states
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [modalColor, setModalColor] = useState<TshirtColor>('preta');
  const [modalSize, setModalSize] = useState<TshirtSize>('L');
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [isCartCheckout, setIsCartCheckout] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Cart total count
  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Cart actions
  const handleAddToCart = (color: TshirtColor, size: TshirtSize, quantity: number) => {
    const colorObj = config.productColors.find((c) => c.id === color) || config.productColors[0];
    const existingIndex = cartItems.findIndex(
      (it) => it.color === color && it.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        color,
        colorName: colorObj.name,
        size,
        quantity,
        unitPrice: config.unitPrice,
        image: colorObj.image,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter((it): it is CartItem => it !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Direct buy from product card or hero
  const handleDirectBuy = (color: TshirtColor = 'preta', size: TshirtSize = 'L', quantity: number = 1) => {
    setModalColor(color);
    setModalSize(size);
    setModalQuantity(quantity);
    setIsCartCheckout(false);
    setIsBuyModalOpen(true);
  };

  // Quick Order from Combo Simulator
  const handleQuickComboOrder = (quantity: number, colors: TshirtColor[], size: TshirtSize) => {
    if (quantity === 1) {
      handleDirectBuy(colors[0] || 'preta', size, 1);
    } else {
      const newItems: CartItem[] = [];
      const counts: Record<string, number> = {};
      colors.forEach((c) => {
        counts[c] = (counts[c] || 0) + 1;
      });

      Object.entries(counts).forEach(([colId, qty]) => {
        if (qty > 0) {
          const cObj = config.productColors.find((p) => p.id === colId) || config.productColors[0];
          newItems.push({
            id: `combo-${colId}-${Date.now()}`,
            color: colId as TshirtColor,
            colorName: cObj.name,
            size: size,
            quantity: qty,
            unitPrice: config.unitPrice,
            image: cObj.image,
          });
        }
      });

      setCartItems(newItems);
      setIsCartCheckout(true);
      setIsBuyModalOpen(true);
    }
  };

  // Checkout from cart drawer
  const handleCheckoutFromCart = () => {
    setIsCartCheckout(true);
    setIsBuyModalOpen(true);
  };

  const handleScrollToColors = () => {
    const el = document.getElementById('cores');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderCompleted = (order: ConfirmedOrder) => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#f1f3f5] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBuyModal={() => handleDirectBuy('preta', 'L', 1)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          onOpenBuyModal={() => handleDirectBuy('preta', 'L', 1)}
          onOpenWhatsApp={() => window.open(createGeneralWhatsAppLink(), '_blank')}
          onScrollToColors={handleScrollToColors}
        />

        {/* 3 Colors Showcase with Quality Photos & Dynamic Price */}
        <ColorsSection
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />

        {/* Dynamic Pricing Showcase (Quantity × Price) */}
        <PricingPromo onQuickOrder={handleQuickComboOrder} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* How to Buy Guide */}
        <HowToBuy onOpenBuyModal={() => handleDirectBuy('preta', 'L', 1)} />

        {/* Social Media Section (TikTok @ladislau_ceo) */}
        <SocialSection />

        {/* Testimonials & FAQs */}
        <TestimonialsFaq />

        {/* Contact & 24h Support */}
        <ContactSection onOpenBuyModal={() => handleDirectBuy('preta', 'L', 1)} />
      </main>

      {/* Complete Footer with Admin Access link */}
      <Footer />

      {/* Floating Always-Accessible WhatsApp Button */}
      <FloatingWhatsApp onOpenBuyModal={() => handleDirectBuy('preta', 'L', 1)} />

      {/* Full Purchase Checkout Modal */}
      <OrderModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        initialColor={modalColor}
        initialSize={modalSize}
        initialQuantity={modalQuantity}
        cartItems={isCartCheckout ? cartItems : undefined}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutFromCart}
      />

      {/* Size Guide Modal (L & XL) */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Admin Login Modal (Utilizador: Ladislau, Senha: 200780) */}
      <AdminLoginModal />

      {/* Full-featured Admin Dashboard */}
      <AdminPanel />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
