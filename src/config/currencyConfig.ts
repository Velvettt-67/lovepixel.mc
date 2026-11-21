export type CurrencyCode = 'USD' | 'INR';

export interface CurrencyConfig {
  defaultCurrency: CurrencyCode;
  exchangeRateINRPerUSD: number; // Configurable exchange rate: ~₹95 per US dollar
  currencies: Record<
    CurrencyCode,
    {
      code: CurrencyCode;
      symbol: string;
      name: string;
      locale: string;
    }
  >;
}

export const CURRENCY_CONFIG: CurrencyConfig = {
  defaultCurrency: 'USD',
  exchangeRateINRPerUSD: 95,
  currencies: {
    USD: {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
      locale: 'en-US',
    },
    INR: {
      code: 'INR',
      symbol: '₹',
      name: 'Indian Rupee',
      locale: 'en-IN',
    },
  },
};

/**
 * Format an amount in the specified currency.
 * For INR: Formats as integer with Indian numbering system (e.g. ₹1,500)
 * For USD: Formats with 2 decimal places (e.g. $15.79)
 */
export function formatCurrencyAmount(amount: number, currency: CurrencyCode): string {
  if (currency === 'INR') {
    const rounded = Math.round(amount);
    return `₹${rounded.toLocaleString('en-IN')}`;
  }
  return `$${amount.toFixed(2)}`;
}
