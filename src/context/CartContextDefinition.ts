import { createContext } from 'react';
import type { StoreProduct } from '../config/storeConfig';

export interface CartItem {
  product: StoreProduct;
  quantity: number;
  recipientUsername?: string; // if gifting
  isGift?: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  minecraftUsername: string;
  setMinecraftUsername: (name: string) => void;
  addToCart: (product: StoreProduct, quantity?: number, isGift?: boolean, recipient?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
