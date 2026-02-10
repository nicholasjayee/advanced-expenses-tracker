import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Zap, Calendar, DollarSign, Wallet, Battery } from 'lucide-react';
import { Account } from '../../../data/accounts.ts';
import { getCurrencySymbol } from '../../../data/currencies.ts';
import { ExpenseCategory } from '../../Expenses/types/index.ts';

interface AddElectricityFormProps {
  onAdd: (description: string, amount: number, date: Date, accountId: string, manualCategory: string, units: number, unitsRemaining: number) => Promise<void>;
  accounts: Account[];
}

export const AddElectricityForm: React.FC<AddElectricityFormProps> = ({ onAdd, accounts }) => {
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString().split('T')[0]);
  const [units, setUnits] = useState('');
  const [unitsRemaining, setUnitsRemaining] = useState('');
  const [cost, setCost] = useState('');
  const [accountId, setAccountId] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedAccount = accounts.find(a => a.id === accountId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!units || !cost || !accountId) return;

    setLoading(true);
    await onAdd(
      `Electricity Bill (${units} kWh)`,
      parseFloat(cost),
      new Date(dateStr),
      accountId,
      ExpenseCategory.ELECTRICITY,
      parseFloat(units),
      unitsRemaining ? parseFloat(unitsRemaining) : 0
    );
    setLoading(false);
    
    // Reset
    setUnits('');
    setUnitsRemaining('');
    setCost('');
    setDateStr(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="gsap-fade-in">
      <Card title="Log Usage & Top-up">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-accent focus:outline-none text-white appearance-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm text-muted mb-1">Units Remaining</label>
               <div className="relative">
                 <Battery className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={16} />
                 <input
                   type="number"
                   value={unitsRemaining}
                   onChange={(e) => setUnitsRemaining(e.target.value)}
                   placeholder="Before topup"
                   className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-emerald-400 focus:outline-none text-white"
                   step="0.1"
                 />
               </div>
             </div>
             <div>
               <label className="block text-sm text-muted mb-1">Units Topped Up</label>
               <div className="relative">
                 <Zap className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={16} />
                 <input
                   type="number"
                   value={units}
                   onChange={(e) => setUnits(e.target.value)}
                   placeholder="0"
                   className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-accent focus:outline-none text-white"
                   required
                 />
               </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm text-muted mb-1">Cost</label>
               <div className="relative">
                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted flex items-center justify-center w-4">
                    {selectedAccount ? <span className="text-xs font-bold">{getCurrencySymbol(selectedAccount.currency)}</span> : <DollarSign size={14}/>}
                 </div>
                 <input
                   type="number"
                   value={cost}
                   onChange={(e) => setCost(e.target.value)}
                   placeholder="0.00"
                   className="w-full bg-background border border-border rounded-lg pl-9 p-2.5 text-sm focus:border-accent focus:outline-none text-white"
                   required
                   step="0.01"
                 />
               </div>
             </div>
             <div>
                <label className="block text-sm text-muted mb-1">Payment Source</label>
                <div className="relative">
                   <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                   <select
                     value={accountId}
                     onChange={(e) => setAccountId(e.target.value)}
                     className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-accent focus:outline-none text-white appearance-none cursor-pointer"
                     required
                   >
                     <option value="" disabled>Select</option>
                     {accounts.map(acc => (
                       <option key={acc.id} value={acc.id}>{acc.name} ({acc.currency})</option>
                     ))}
                   </select>
                </div>
             </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent/90 hover:bg-accent text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all mt-2"
          >
            {loading ? 'Adding...' : <><Zap size={18} fill="currentColor" /> Log Top-up</>}
          </button>
        </form>
      </Card>
    </div>
  );
};