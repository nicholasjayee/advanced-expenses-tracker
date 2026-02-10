import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Plus, Tag, DollarSign, ListFilter, Calendar as CalendarIcon, Wallet, AlertCircle } from 'lucide-react';
import { IncomeCategory } from '../types/index.ts';
import { Account } from '../../../data/accounts.ts';
import { getCurrencySymbol } from '../../../data/currencies.ts';

interface AddIncomeFormProps {
  onAdd: (description: string, amount: number, date: Date, accountId: string, category: string) => void;
  accounts: Account[];
}

export const AddIncomeForm: React.FC<AddIncomeFormProps> = ({ onAdd, accounts }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const selectedAccount = accounts.find(a => a.id === selectedAccountId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!description || !amount || !selectedAccountId || !selectedCategory) {
      setError("Please fill in all required fields.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    
    onAdd(
      description, 
      parsedAmount, 
      new Date(dateStr), 
      selectedAccountId,
      selectedCategory
    );
    
    setDescription('');
    setAmount('');
    setDateStr(new Date().toISOString().split('T')[0]);
    setSelectedCategory('');
    setError(null);
    // Keep account selected
  };

  return (
    <div className="gsap-fade-in">
      <Card title="Record Income">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Date Received</label>
            <div className="relative z-10">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={16} />
              <input
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-secondary focus:outline-none text-text placeholder-muted/50 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Deposit To</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-secondary focus:outline-none text-text appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select Account</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.currency})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Description</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. May Salary, Freelance Gig"
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-secondary focus:outline-none text-text placeholder-muted/50"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-muted mb-1">Amount</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted flex items-center justify-center w-5">
                 {selectedAccount ? (
                   <span className="text-sm font-semibold text-text">{getCurrencySymbol(selectedAccount.currency)}</span>
                 ) : (
                   <DollarSign size={16} />
                 )}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-secondary focus:outline-none text-text placeholder-muted/50"
                required
                min="0.01"
                step="0.01"
              />
            </div>
            {selectedAccount && (
              <p className="text-[10px] text-muted mt-1 text-right">
                Receiving in {selectedAccount.currency}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Category</label>
            <div className="relative">
              <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-secondary focus:outline-none text-text appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select Category</option>
                {Object.values(IncomeCategory).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-xs p-3 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <Plus size={18} /> Add Income
          </button>
        </form>
      </Card>
    </div>
  );
};