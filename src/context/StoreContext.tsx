import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORE_INFO, PRODUCT_COLORS } from '../data';
import { ProductColor, ConfirmedOrder, TshirtColor } from '../types';

export interface AdminStoreConfig {
  name: string;
  tagline: string;
  subtext: string;
  unitPrice: number;
  promoTrioPrice: number;
  enablePromoTrio: boolean;
  whatsappPhone: string;
  whatsappFormatted: string;
  fullWhatsAppNumber: string;
  tiktokHandle: string;
  tiktokUrl: string;
  openingHours: string;
  location: string;
  tickerText: string;
  lubangoNeighborhoods: string[];
  productColors: ProductColor[];
}

export interface AdminOrderRecord extends ConfirmedOrder {
  status: 'Pendente' | 'Confirmado' | 'A caminho' | 'Entregue' | 'Cancelado';
  adminNotes?: string;
}

interface StoreContextType {
  config: AdminStoreConfig;
  updateConfig: (partial: Partial<AdminStoreConfig>) => void;
  resetConfig: () => void;
  orders: AdminOrderRecord[];
  addOrderRecord: (order: ConfirmedOrder) => void;
  updateOrderStatus: (orderId: string, status: AdminOrderRecord['status']) => void;
  deleteOrderRecord: (orderId: string) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;
}

const DEFAULT_NEIGHBORHOODS = [
  'Lubango - Bairro Comercial (Centro)',
  'Lubango - Ferrovia / Estação',
  'Lubango - Hélder Neto',
  'Lubango - Mitcha',
  'Lubango - Lucrécia',
  'Lubango - Lage',
  'Lubango - João de Almeida',
  'Lubango - Nambambe',
  'Lubango - Senhora do Monte / Mapunda',
  'Lubango - Camama / Cristo Rei',
  'Lubango - Outro Bairro / Ponto de Encontro',
];

const DEFAULT_CONFIG: AdminStoreConfig = {
  name: STORE_INFO.name,
  tagline: STORE_INFO.tagline,
  subtext: STORE_INFO.subtext,
  unitPrice: STORE_INFO.unitPrice,
  promoTrioPrice: 16000,
  enablePromoTrio: true,
  whatsappPhone: STORE_INFO.whatsappPhone,
  whatsappFormatted: STORE_INFO.whatsappFormatted,
  fullWhatsAppNumber: STORE_INFO.fullWhatsAppNumber,
  tiktokHandle: STORE_INFO.tiktokHandle,
  tiktokUrl: STORE_INFO.tiktokUrl,
  openingHours: STORE_INFO.openingHours,
  location: STORE_INFO.location,
  tickerText: '🔥 T-SHIRTS DE GOLA A CUTAR (6.000 KZ) • ENTREGAS RÁPIDAS NO LUBANGO • 100% ALGODÃO',
  lubangoNeighborhoods: DEFAULT_NEIGHBORHOODS,
  productColors: PRODUCT_COLORS,
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store configurations persisted
  const [config, setConfig] = useState<AdminStoreConfig>(() => {
    try {
      const saved = localStorage.getItem('kutar_store_config_v2');
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  // Orders history persisted
  const [orders, setOrders] = useState<AdminOrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kutar_orders_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('kutar_admin_logged') === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('kutar_store_config_v2', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('kutar_orders_history', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const updateConfig = (partial: Partial<AdminStoreConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem('kutar_store_config_v2');
    } catch {
      // ignore
    }
  };

  const addOrderRecord = (order: ConfirmedOrder) => {
    const newRecord: AdminOrderRecord = {
      ...order,
      status: 'Pendente',
    };
    setOrders((prev) => [newRecord, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: AdminOrderRecord['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
  };

  const deleteOrderRecord = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
  };

  const loginAdmin = (user: string, pass: string): boolean => {
    // Specific credentials requested by user:
    // Utilizador: Ladislau
    // Senha: 200780
    if (user.trim() === 'Ladislau' && pass.trim() === '200780') {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem('kutar_admin_logged', 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdminPanelOpen(false);
    try {
      sessionStorage.removeItem('kutar_admin_logged');
    } catch {
      // ignore
    }
  };

  return (
    <StoreContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        orders,
        addOrderRecord,
        updateOrderStatus,
        deleteOrderRecord,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
