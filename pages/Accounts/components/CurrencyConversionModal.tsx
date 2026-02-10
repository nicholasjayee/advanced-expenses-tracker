import React, { useState } from 'react';
import { Account } from '../../../data/accounts.ts';
import { availableCurrencies, getCurrencySymbol } from '../../../data/currencies.ts';
import { X, RefreshCcw, ArrowRight } from 'lucide-react';

interface CurrencyConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, targetCurrency: string, rate: number) => void;
  account: Account | null;
}

export const CurrencyConversionModal: React.FC<CurrencyConversionModalProps> = ({ isOpen, onClose, onSubmit, account }) => {
  const [targetCurrency, setTargetCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');

  if (!isOpen || !account) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCurrency || !exchangeRate) return;
    onSubmit(account.id, targetCurrency, parseFloat(exchangeRate));
    setTargetCurrency('');
    setExchangeRate('');
  };

  const calculatedBalance = account.balance * (parseFloat(exchangeRate) || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-xl font-bold text-white">Convert Currency</h2>
          <button onClick={onClose} className="text-muted hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center gap-3">
             <div className="text-primary"><RefreshCcw size={20} /></div>
             <p className="text-xs text-primary/80">
               Converting currency will update the entire balance of <strong>{account.name}</strong> to the new currency using the rate you provide.
             </p>
          </div>

          <div className="flex items-center justify-between gap-2">
             <div className="bg-background border border-border rounded-lg p-3 flex-1 text-center">
                <span className="block text-xs text-muted">Current</span>
                <span className="text-lg font-bold text-white">{account.currency}</span>
             </div>
             <ArrowRight className="text-muted" />
             <div className="flex-1">
                <select 
                  value={targetCurrency}
                  onChange={(e) => setTargetCurrency(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                  required
                >
                  <option value="" disabled>Select Target</option>
                  {availableCurrencies.filter(c => c.code !== account.currency).map(c => (
                    <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                  ))}
                </select>
             </div>
          </div>

          <div>
             <label className="block text-sm text-muted mb-1.5">Exchange Rate (1 {account.currency} = ?)</label>
             <input 
               type="number" 
               value={exchangeRate}
               onChange={e => setExchangeRate(e.target.value)}
               className="w-full bg-background border border-border rounded-lg p-3 text-white focus:border-primary focus:outline-none"
               placeholder="e.g. 0.92"
               step="0.0001"
               required
             />
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
             <div className="flex justify-between items-center mb-1">
               <span className="text-sm text-muted">Current Balance</span>
               <span className="text-white">{getCurrencySymbol(account.currency)}{account.balance.toLocaleString()}</span>
             </div>
             <div className="flex justify-between items-center border-t border-border mt-2 pt-2">
               <span className="text-sm font-medium text-white">New Balance</span>
               <span className="text-lg font-bold text-secondary">
                 {targetCurrency ? getCurrencySymbol(targetCurrency) : ''}
                 {calculatedBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                 {targetCurrency ? ` ${targetCurrency}` : ''}
               </span>
             </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
            Confirm Conversion
          </button>
        </form>
      </div>
    </div>
  );
};