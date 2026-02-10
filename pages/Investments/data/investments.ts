import { AssetClass } from '../../../types.ts';
import { Investment } from '../types/index.ts';

export const initialInvestments: Investment[] = [
  { 
    id: '1', name: 'Apple Inc. (AAPL)', value: 24500, type: AssetClass.EQUITY, change24h: 1.2,
    costBasis: 18000, quantity: 150, currency: 'USD', purchaseDate: '2023-01-15', sourceAccountId: 'acc_1', exchangeRateAtPurchase: 1 
  },
  { 
    id: '2', name: 'Bitcoin (BTC)', value: 12300, type: AssetClass.CRYPTO, change24h: -2.4,
    costBasis: 10000, quantity: 0.25, currency: 'USD', purchaseDate: '2023-06-20', sourceAccountId: 'acc_1', exchangeRateAtPurchase: 1 
  },
  { 
    id: '4', name: 'Rental Property A', value: 150000, type: AssetClass.REAL_ESTATE, change24h: 0.0,
    costBasis: 140000, quantity: 1, currency: 'USD', purchaseDate: '2020-05-10', sourceAccountId: 'acc_4', exchangeRateAtPurchase: 1 
  },
  { 
    id: '5', name: 'Life Insurance Policy', value: 5000, type: AssetClass.INSURANCE, change24h: 0.0,
    costBasis: 4800, quantity: 1, currency: 'USD', purchaseDate: '2019-01-01', sourceAccountId: 'acc_1', exchangeRateAtPurchase: 1 
  },
];