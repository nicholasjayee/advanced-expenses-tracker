import React, { useState, useEffect } from 'react';
import { Account } from '../../../data/accounts.ts';
import { getCurrencySymbol } from '../../../data/currencies.ts';
import { X, ArrowRight, Wallet, RefreshCw, MessageSquare } from 'lucide-react';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fromId: string, toId: string, amount: number, feeRate: number, exchangeRate: number, description: string) => void;
  accounts: Account[];
  initialSourceId?: string;
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, onSubmit, accounts, initialSourceId }) => {
  const [fromId, setFromId] = useState(initialSourceId || '');
  const [toId, setToId] = useState('');
  const [amount, setAmount] = useState('');
  const [feeRate, setFeeRate] = useState('0');
  const [exchangeRate, setExchangeRate] = useState('1');
  const [description, setDescription] = useState('');

  // Update fromId when initialSourceId changes
  useEffect(() => {
    if (initialSourceId) setFromId(initialSourceId);
  }, [initialSourceId]);

  if (!isOpen) return null;

  const selectedSource = accounts.find(a => a.id === fromId);
  const selectedTarget = accounts.find(a => a.id === toId);
  
  const isCrossCurrency = selectedSource && selectedTarget && selectedSource.currency !== selectedTarget.currency;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromId || !toId || !amount) return;
    
    // If not cross currency, force exchange rate to 1
    const finalExchangeRate = isCrossCurrency ? parseFloat(exchangeRate) : 1;
    
    onSubmit(fromId, toId, parseFloat(amount), parseFloat(feeRate), finalExchangeRate, description);
  };

  const amountVal = parseFloat(amount || '0');
  const feePercent = parseFloat(feeRate || '0');
  
  const feeAmount = amountVal * (feePercent / 100);
  const amountAfterFee = amountVal - feeAmount;
  
  const finalExchangeRate = isCrossCurrency ? parseFloat(exchangeRate || '1') : 1;
  const recipientAmount = amountAfterFee * finalExchangeRate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-xl font-bold text-text">Transfer Funds</h2>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex items-center gap-4">
             <div className="flex-1">
               <label className="block text-xs text-muted mb-1">From</label>
               <div className="relative">
                  <select 
                    value={fromId}
                    onChange={(e) => setFromId(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg p-2.5 text-sm text-text focus:border-primary focus:outline-none appearance-none"
                    required
                  >
                    <option value="" disabled>Select Source</option>
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.id} disabled={acc.id === toId}>
                        {acc.name} ({acc.currency})
                      </option>
                    ))}
                  </select>
                  <Wallet className="absolute right-3 top-2.5 text-muted pointer-events-none" size={16} />
               </div>
             </div>
             
             <ArrowRight className="text-muted mt-5" size={20} />
             
             <div className="flex-1">
               <label className="block text-xs text-muted mb-1">To</label>
               <div className="relative">
                  <select 
                    value={toId}
                    onChange={(e) => setToId(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg p-2.5 text-sm text-text focus:border-primary focus:outline-none appearance-none"
                    required
                  >
                    <option value="" disabled>Select Target</option>
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.id} disabled={acc.id === fromId}>
                        {acc.name} ({acc.currency})
                      </option>
                    ))}
                  </select>
                  <Wallet className="absolute right-3 top-2.5 text-muted pointer-events-none" size={16} />
               </div>
             </div>
          </div>

          <div className="bg-background/50 p-4 rounded-lg border border-border space-y-4">
             <div>
               <label className="block text-sm text-muted mb-1.5">Amount to Send</label>
               <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                   {selectedSource ? getCurrencySymbol(selectedSource.currency) : '$'}
                 </span>
                 <input 
                   type="number" 
                   value={amount}
                   onChange={e => setAmount(e.target.value)}
                   className="w-full bg-background border border-border rounded-lg pl-8 p-2.5 text-text focus:border-primary focus:outline-none text-lg font-medium"
                   placeholder="0.00"
                   min="0"
                   step="0.01"
                   required
                 />
               </div>
               {selectedSource && (
                 <p className="text-xs text-muted mt-1 text-right">Available: {getCurrencySymbol(selectedSource.currency)}{selectedSource.balance.toLocaleString()}</p>
               )}
             </div>

             <div>
               <label className="block text-sm text-muted mb-1.5 flex justify-between">
                 <span>Transfer Fee / Rate (%)</span>
                 <span className="text-accent text-xs">Base Rate: 0%</span>
               </label>
               <div className="flex items-center gap-3">
                 <div className="relative flex-1">
                    <input 
                      type="number" 
                      value={feeRate}
                      onChange={e => setFeeRate(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none"
                      placeholder="0"
                      min="0"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">%</span>
                 </div>
                 <div className="flex-1 text-right">
                    <p className="text-xs text-muted">Fee Amount</p>
                    <p className="text-danger font-medium">
                       -{selectedSource ? getCurrencySymbol(selectedSource.currency) : '$'}{feeAmount.toFixed(2)}
                    </p>
                 </div>
               </div>
             </div>
             
             {isCrossCurrency && (
               <div className="pt-2 border-t border-border animate-in fade-in slide-in-from-top-1">
                  <label className="block text-sm text-primary mb-1.5 flex items-center gap-2">
                     <RefreshCw size={14} /> Exchange Rate
                  </label>
                  <div className="flex items-center gap-3">
                     <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs">1 {selectedSource.currency} =</span>
                        <input 
                          type="number" 
                          value={exchangeRate}
                          onChange={e => setExchangeRate(e.target.value)}
                          className="w-full bg-background border border-primary/50 rounded-lg pl-14 p-2.5 text-text focus:border-primary focus:outline-none"
                          placeholder="e.g. 0.85"
                          step="0.0001"
                          required
                        />
                     </div>
                     <div className="flex-none pt-1">
                        <span className="text-sm font-medium text-text">{selectedTarget?.currency}</span>
                     </div>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    You are sending <strong>{selectedSource.currency}</strong> to an account holding <strong>{selectedTarget?.currency}</strong>.
                  </p>
               </div>
             )}
          </div>
          
          <div>
            <label className="block text-sm text-muted mb-1.5">Reason / Comment</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-muted" size={16} />
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-text focus:border-primary focus:outline-none text-sm min-h-[60px] resize-none"
                placeholder="Optional transfer note..."
              />
            </div>
          </div>

          <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
             <span className="text-sm text-secondary">Recipient Gets</span>
             <span className="text-lg font-bold text-secondary">
               {selectedTarget ? getCurrencySymbol(selectedTarget.currency) : '$'}{recipientAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
             </span>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            Confirm Transfer <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};