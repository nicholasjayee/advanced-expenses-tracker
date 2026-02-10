export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const availableCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'BTC', symbol: '₿', name: 'Bitcoin' },
  { code: 'ETH', symbol: 'Ξ', name: 'Ethereum' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
];

export const getCurrencySymbol = (code: string): string => {
  const currency = availableCurrencies.find(c => c.code === code);
  return currency ? currency.symbol : code;
};