import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Plus, Tag, DollarSign, ListFilter, Calendar as CalendarIcon, Zap, Wallet, Battery, CreditCard } from 'lucide-react';
import { ExpenseCategory } from '../types/index.ts';
import { Account } from '../../../data/accounts.ts';
import { getCurrencySymbol } from '../../../data/currencies.ts';
import { useLiabilitiesContext } from '../../../context/LiabilityContext.tsx';

interface AddExpenseFormProps {
  onAdd: (description: string, amount: number, date: Date, accountId: string, category?: string, units?: number, unitsRemaining?: number, liabilityId?: string) => void;
  isCategorizing: boolean;
  accounts: Account[];
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAdd, isCategorizing, accounts }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [selectedLiabilityId, setSelectedLiabilityId] = useState<string>('');
  const [units, setUnits] = useState('');
  const [unitsRemaining, setUnitsRemaining] = useState('');

  const { liabilities } = useLiabilitiesContext();
  const selectedAccount = accounts.find(a => a.id === selectedAccountId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !selectedAccountId) return;
    
    onAdd(
      description, 
      parseFloat(amount), 
      new Date(dateStr), 
      selectedAccountId,
      selectedCategory || undefined,
      (selectedCategory === ExpenseCategory.ELECTRICITY && units) ? parseFloat(units) : undefined,
      (selectedCategory === ExpenseCategory.ELECTRICITY && unitsRemaining) ? parseFloat(unitsRemaining) : undefined,
      (selectedCategory === ExpenseCategory.LIABILITY_PAYMENT && selectedLiabilityId) ? selectedLiabilityId : undefined
    );
    
    setDescription('');
    setAmount('');
    setDateStr(new Date().toISOString().split('T')[0]);
    setSelectedCategory('');
    setUnits('');
    setUnitsRemaining('');
    setSelectedLiabilityId('');
    // Keep account selected for convenience
  };

  return (
    <div className="gsap-fade-in">
      <Card title="Add New Expense">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Date</label>
            <div className="relative z-10">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={16} />
              <input
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-text placeholder-muted/50 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Source Account</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-text appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select Payment Source</option>
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
                placeholder="e.g. Electric Bill, Rent, Gift for Mom"
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-text placeholder-muted/50"
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
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-text placeholder-muted/50"
                required
                step="0.01"
              />
            </div>
            {selectedAccount && (
              <p className="text-[10px] text-muted mt-1 text-right">
                Paying in {selectedAccount.currency}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Category (Optional)</label>
            <div className="relative">
              <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-text appearance-none cursor-pointer"
              >
                <option value="">Auto-Categorize (AI)</option>
                {Object.values(ExpenseCategory).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {selectedCategory === ExpenseCategory.ELECTRICITY && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-3 p-3 bg-surface/50 border border-border rounded-lg">
              <div>
                <label className="block text-xs text-accent mb-1 flex items-center gap-1">
                  <Zap size={12} /> Units Topped Up (kWh)
                </label>
                <input
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="e.g. 150"
                  className="w-full bg-background border border-accent/30 rounded-lg p-2 text-sm focus:border-accent focus:outline-none text-text placeholder-muted/50"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-xs text-emerald-400 mb-1 flex items-center gap-1">
                  <Battery size={12} /> Units Remaining Before Topup
                </label>
                <input
                  type="number"
                  value={unitsRemaining}
                  onChange={(e) => setUnitsRemaining(e.target.value)}
                  placeholder="e.g. 15.4"
                  className="w-full bg-background border border-emerald-500/30 rounded-lg p-2 text-sm focus:border-emerald-500 focus:outline-none text-text placeholder-muted/50"
                  step="0.1"
                />
              </div>
            </div>
          )}

          {selectedCategory === ExpenseCategory.LIABILITY_PAYMENT && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 p-3 bg-surface/50 border border-border rounded-lg">
               <label className="block text-xs text-danger mb-1 flex items-center gap-1">
                  <CreditCard size={12} /> Paying towards which Liability?
               </label>
               <select
                value={selectedLiabilityId}
                onChange={(e) => setSelectedLiabilityId(e.target.value)}
                className="w-full bg-background border border-danger/30 rounded-lg p-2 text-sm focus:border-danger focus:outline-none text-text"
               >
                 <option value="" disabled>Select Liability</option>
                 {liabilities.map(l => (
                   <option key={l.id} value={l.id}>{l.name} (Owes {getCurrencySymbol(l.currency)}{l.remainingAmount})</option>
                 ))}
               </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isCategorizing}
            className={`w-full font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedCategory ? 'bg-secondary hover:bg-emerald-600 text-white' : 'bg-primary hover:bg-blue-600 text-white'
            }`}
          >
            {isCategorizing ? (
              'Analyzing...'
            ) : (
              <>
                <Plus size={18} /> {selectedCategory ? 'Add Expense' : 'Auto-Add with AI'}
              </>
            )}
          </button>
          
          {!selectedCategory && (
            <p className="text-xs text-muted text-center mt-2">
              Leave category blank to let Gemini AI detect if it's Rent, Food, or Electricity.
            </p>
          )}
        </form>
      </Card>
    </div>
  );
};