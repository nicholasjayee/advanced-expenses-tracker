import { Asset, AssetClass } from "../../../types.ts";

export interface Investment extends Asset {
  costBasis: number; // Original money spent (in asset currency)
  quantity: number; // Units held
  currency: string; // Currency of the asset
  purchaseDate: string;
  sourceAccountId: string; // Where the money came from
  exchangeRateAtPurchase: number; // Rate used when bought (Source -> Asset)
}

export const ASSET_CLASS_LABELS: Record<AssetClass, string> = {
  [AssetClass.EQUITY]: 'Stocks / Equity',
  [AssetClass.CRYPTO]: 'Cryptocurrency',
  [AssetClass.REAL_ESTATE]: 'Real Estate',
  [AssetClass.CASH]: 'Cash / Savings',
  [AssetClass.INSURANCE]: 'Insurance Policy',
  [AssetClass.BOND]: 'Bonds / Fixed Income',
  [AssetClass.COMMODITY]: 'Commodities (Gold/Silver)',
  [AssetClass.OTHER]: 'Other Asset'
};
