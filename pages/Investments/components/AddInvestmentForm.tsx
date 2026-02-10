import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Plus, Briefcase, DollarSign, Wallet, RefreshCw, Layers } from 'lucide-react';
import { AssetClass } from '../../../types.ts';
import { ASSET_CLASS_LABELS } from '../types/index.ts';
import { Account } from '../../../data/accounts.ts';
import { getCurrencySymbol, availableCurrencies } from '../../../data/currencies.ts';

interface AddInvestmentFormProps {
  onAdd: (
    name: string,
    type: AssetClass,
    amountInvested: number,
    sourceAccountId: string,
    assetCurrency: string,
    exchangeRate: number,
    quantity: number,
    purchaseDate: Date
  ) => void;
  accounts: Account[];
}

export const AddInvestmentForm: React.FC<AddInvestmentFormProps> = ({ onAdd, accounts }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<AssetClass>(AssetClass.EQUITY);
  const [sourceAccountId, setSourceAccountId] = useState('');
  const [amountInvested, setAmountInvested] = useState('');
  const [assetCurrency, setAssetCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState('1');
  const [quantity, setQuantity] = useState('1');
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString().split('T')[0]);

  const selectedAccount = accounts.find(a => a.id === sourceAccountId);
  
  // Auto-set asset currency to account currency initially
  useEffect(() => {
    if (selectedAccount) {
        setAssetCurrency(selectedAccount.currency);
        setExchangeRate('1');
    }
  }, [selectedAccount]);

  const isCrossCurrency = selectedAccount && selectedAccount.currency !== assetCurrency;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amountInvested || !sourceAccountId) return;
    
    onAdd(
      name,
      type,
      parseFloat(amountInvested),
      sourceAccountId,
      assetCurrency,
      parseFloat(exchangeRate),
      parseFloat(quantity),
      new Date(dateStr)
    );

    // Reset Form
    setName('');
    setAmountInvested('');
    setQuantity('1');
  };

  const calculatedAssetValue = parseFloat(amountInvested || '0') * (parseFloat(exchangeRate) || 1);

  return (
    <div className="gsap-fade-in">
      <Card title="Add New Asset">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Asset Details */}
          <div>
            <label className="block text-sm text-muted mb-1">Asset Name</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tesla Stock, Life Insurance..."
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm text-muted mb-1">Type</label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as AssetClass)}
                    className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-white appearance-none cursor-pointer"
                  >
                    {Object.entries(ASSET_CLASS_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
             </div>
             <div>
                <label className="block text-sm text-muted mb-1">Units / Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="1"
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none text-white"
                  step="0.0001"
                  required
                />
             </div>
          </div>

          {/* Funding Source */}
          <div className="pt-2 border-t border-border">
             <label className="block text-sm text-muted mb-1">Funding Source (Account)</label>
             <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <select
                value={sourceAccountId}
                onChange={(e) => setSourceAccountId(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-white appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select Account</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.currency}) - Bal: {getCurrencySymbol(acc.currency)}{acc.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Amount to Invest ({selectedAccount?.currency || 'USD'})</label>
            <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-semibold">
                 {selectedAccount ? getCurrencySymbol(selectedAccount.currency) : '$'}
               </span>
              <input
                type="number"
                value={amountInvested}
                onChange={(e) => setAmountInvested(e.target.value)}
                placeholder="0.00"
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-white"
                required
                min="0.01"
                step="0.01"
              />
            </div>
          </div>

          {/* Currency Handling */}
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm text-muted mb-1">Asset Currency</label>
                <select
                    value={assetCurrency}
                    onChange={(e) => setAssetCurrency(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none text-white"
                  >
                    {availableCurrencies.map(c => (
                      <option key={c.code} value={c.code}>{c.code}</option>
                    ))}
                </select>
             </div>
             {isCrossCurrency && (
                 <div className="animate-in fade-in slide-in-from-left-1">
                    <label className="block text-sm text-primary mb-1 flex items-center gap-1">
                       <RefreshCw size={12} /> Exchange Rate
                    </label>
                    <input
                      type="number"
                      value={exchangeRate}
                      onChange={(e) => setExchangeRate(e.target.value)}
                      placeholder="e.g. 0.92"
                      className="w-full bg-background border border-primary/50 rounded-lg p-2.5 text-sm focus:border-primary focus:outline-none text-white"
                      step="0.0001"
                    />
                 </div>
             )}
          </div>

          {isCrossCurrency && (
             <div className="text-xs text-muted text-right">
                Initial Value: {getCurrencySymbol(assetCurrency)}{calculatedAssetValue.toLocaleString(undefined, {maximumFractionDigits: 2})}
             </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all mt-2"
          >
            <Plus size={18} /> Buy / Add Asset
          </button>
        </form>
      </Card>
    </div>
  );
};
