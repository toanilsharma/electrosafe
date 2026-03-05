import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'EUR' | 'AUD' | 'CAD' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  exchangeRate: number; // Base is USD = 1.0
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', exchangeRate: 83.0 }, // Base default
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 1.0 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.79 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.92 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', exchangeRate: 1.53 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', exchangeRate: 1.36 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', exchangeRate: 3.67 },
};

interface CurrencyState {
  currency: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  // Utility to convert a hardcoded USD value to the currently selected currency
  convert: (amountInUSD: number) => number;
  // Format a numeric value into a localized string with the current currency symbol
  format: (amount: number, decimals?: number) => string;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: CURRENCIES.INR, // Default to INR as requested
      setCurrency: (code: CurrencyCode) => set({ currency: CURRENCIES[code] }),
      convert: (amountInUSD: number) => {
        return amountInUSD * get().currency.exchangeRate;
      },
      format: (amount: number, decimals = 0) => {
        const { currency } = get();
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency.code,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(amount);
      },
    }),
    {
      name: 'electrosafe-currency-storage',
    }
  )
);
