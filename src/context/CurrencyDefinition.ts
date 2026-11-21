import { createContext } from 'react';
import type { CurrencyCode } from '../config/currencyConfig';
import type { StoreProduct } from '../config/storeConfig';

export interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencySymbol: string;
  currencyCode: CurrencyCode;
  exchangeRate: number;
  getProductPrice: (product: StoreProduct) => number;
  formatProductPrice: (product: StoreProduct) => string;
  formatAmount: (amountInActiveCurrency: number) => string;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);
