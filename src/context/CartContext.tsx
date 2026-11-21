import React, { useState, useEffect } from 'react';
import type { StoreProduct } from '../config/storeConfig';
import { CartContext, type CartItem } from './CartContextDefinition';
import { useCurrency } from './useCurrency';

const CART_STORAGE_KEY = 'pixel_mc_cart_v1';
const USERNAME_STORAGE_KEY = 'pixel_mc_username_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [minecraftUsername, setMinecraftUsernameState] = useState<string>(() => {
    try {
      return localStorage.getItem(USERNAME_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [cart]);

  const setMinecraftUsername = (name: string) => {
    const cleaned = name.trim();
    setMinecraftUsernameState(cleaned);
    try {
      localStorage.setItem(USERNAME_STORAGE_KEY, cleaned);
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const addToCart = (product: StoreProduct, quantity = 1, isGift = false, recipient = '') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.isGift === isGift && item.recipientUsername === recipient
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, isGift, recipientUsername: recipient }];
      }
    });

    showToast(`Added ${product.name} to cart.`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const { getProductPrice } = useCurrency();

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.isPriceConfigured ? getProductPrice(item.product) : 0;
    return sum + price * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        minecraftUsername,
        setMinecraftUsername,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
