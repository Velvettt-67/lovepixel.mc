import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CURRENCY_CONFIG, formatCurrencyAmount, type CurrencyCode } from '../config/currencyConfig';
import type { StoreProduct } from '../config/storeConfig';
import { CurrencyContext } from './CurrencyDefinition';

const CURRENCY_STORAGE_KEY = 'pixel_mc_currency_v1';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (stored === 'USD' || stored === 'INR') {
        return stored;
      }
    } catch {
      // storage unavailable
    }
    return CURRENCY_CONFIG.defaultCurrency;
  });

  const setCurrency = useCallback((newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
    } catch {
      // ignore storage error
    }
  }, []);

  // Update localStorage when currency changes
  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    } catch {
      // ignore
    }
  }, [currency]);

  const currencySymbol = useMemo(() => CURRENCY_CONFIG.currencies[currency].symbol, [currency]);

  const getProductPrice = useCallback(
    (product: StoreProduct): number => {
      if (currency === 'INR') {
        if (typeof product.priceINR === 'number') {
          return product.priceINR;
        }
        return Math.round(product.priceUSD * CURRENCY_CONFIG.exchangeRateINRPerUSD);
      }
      return product.priceUSD ?? product.price;
    },
    [currency]
  );

  const formatProductPrice = useCallback(
    (product: StoreProduct): string => {
      const price = getProductPrice(product);
      return formatCurrencyAmount(price, currency);
    },
    [currency, getProductPrice]
  );

  const formatAmount = useCallback(
    (amountInActiveCurrency: number): string => {
      return formatCurrencyAmount(amountInActiveCurrency, currency);
    },
    [currency]
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      currencySymbol,
      currencyCode: currency,
      exchangeRate: CURRENCY_CONFIG.exchangeRateINRPerUSD,
      getProductPrice,
      formatProductPrice,
      formatAmount,
    }),
    [currency, setCurrency, currencySymbol, getProductPrice, formatProductPrice, formatAmount]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};
