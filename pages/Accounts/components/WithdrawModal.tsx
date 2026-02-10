import React, { useState } from 'react';
import { Account } from '../../../data/accounts.ts';
import { X, TrendingDown, AlertCircle, MessageSquare } from 'lucide-react';
import { getCurrencySymbol } from '../../../data/currencies.ts';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, amount: number, description: string) => void;
  account: Account | null;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, onSubmit, account }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen || !account) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSubmit(account.id, parseFloat(amount), description);
    setAmount('');
    setDescription('');
  };

  const amountValue = parseFloat(amount) || 0;
  const isOverdraft = amountValue > account.balance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-xl font-bold text-text">Withdraw Funds</h2>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted">Withdrawing from</p>
            <h3 className="text-lg font-semibold text-text">{account.name}</h3>
            <p className="text-xs text-muted">Current Balance: {getCurrencySymbol(account.currency)}{account.balance.toLocaleString()}</p>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                {getCurrencySymbol(account.currency)}
              </span>
              <input 
                type="number" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className={`w-full bg-background border rounded-lg pl-8 p-3 text-text focus:outline-none text-xl font-bold ${isOverdraft ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
                autoFocus
              />
            </div>
            {isOverdraft && (
                <p className="text-danger text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> This amount exceeds the current balance.
                </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">Reason / Comment</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-muted" size={16} />
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-text focus:border-primary focus:outline-none text-sm min-h-[80px] resize-none"
                placeholder="e.g. ATM Withdrawal, Cash payment..."
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-surface border border-danger/30 text-danger hover:bg-danger hover:text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <TrendingDown size={18} /> Confirm Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
};