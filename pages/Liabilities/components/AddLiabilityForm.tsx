import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Plus, CreditCard, DollarSign, Calendar, Percent, Tag, Bookmark } from 'lucide-react';
import { LiabilityCategory, Liability } from '../types/index.ts';
import { availableCurrencies } from '../../../data/currencies.ts';

interface AddLiabilityFormProps {
  onAdd: (data: Omit<Liability, 'id'>) => void;
}

export const AddLiabilityForm: React.FC<AddLiabilityFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [minimumPayment, setMinimumPayment] = useState('');
  const [category, setCategory] = useState<string>(LiabilityCategory.OTHER);
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !totalAmount || !remainingAmount) return;

    onAdd({
      name,
      totalAmount: parseFloat(totalAmount),
      remainingAmount: parseFloat(remainingAmount),
      interestRate: parseFloat(interestRate) || 0,
      dueDate,
      category,
      currency,
      minimumPayment: minimumPayment ? parseFloat(minimumPayment) : 0
    });

    // Reset
    setName('');
    setTotalAmount('');
    setRemainingAmount('');
    setInterestRate('');
    setDueDate('');
    setMinimumPayment('');
  };

  return (
    <div className="gsap-fade-in">
      <Card title="Add Liability">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm text-muted mb-1">Liability Name</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Home Mortgage, Chase Card"
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-danger focus:outline-none text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm text-muted mb-1">Type</label>
               <div className="relative">
                 <Bookmark className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                 <select
                   value={category}
                   onChange={(e) => setCategory(e.target.value)}
                   className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-danger focus:outline-none text-white appearance-none cursor-pointer"
                 >
                   {Object.values(LiabilityCategory).map(cat => (
                     <option key={cat} value={cat}>{cat}</option>
                   ))}
                 </select>
               </div>
            </div>
            <div>
               <label className="block text-sm text-muted mb-1">Currency</label>
               <select
                   value={currency}
                   onChange={(e) => setCurrency(e.target.value)}
                   className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:border-danger focus:outline-none text-white"
                 >
                   {availableCurrencies.map(c => (
                     <option key={c.code} value={c.code}>{c.code}</option>
                   ))}
               </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1">Original Total</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-danger focus:outline-none text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Current Owed</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="number"
                  value={remainingAmount}
                  onChange={(e) => setRemainingAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-danger focus:outline-none text-white"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm text-muted mb-1">APR (%)</label>
               <div className="relative">
                 <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                 <input
                   type="number"
                   value={interestRate}
                   onChange={(e) => setInterestRate(e.target.value)}
                   placeholder="e.g. 4.5"
                   className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-danger focus:outline-none text-white"
                   step="0.01"
                 />
               </div>
             </div>
             <div>
               <label className="block text-sm text-muted mb-1">Min. Payment</label>
               <div className="relative">
                 <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                 <input
                   type="number"
                   value={minimumPayment}
                   onChange={(e) => setMinimumPayment(e.target.value)}
                   placeholder="0.00"
                   className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-danger focus:outline-none text-white"
                 />
               </div>
             </div>
          </div>

          <div>
             <label className="block text-sm text-muted mb-1">Next Due Date</label>
             <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
               <input
                 type="date"
                 value={dueDate}
                 onChange={(e) => setDueDate(e.target.value)}
                 className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-danger focus:outline-none text-white appearance-none"
               />
             </div>
          </div>

          <button
            type="submit"
            className="w-full bg-danger hover:bg-red-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all mt-2"
          >
            <Plus size={18} /> Add Liability
          </button>
        </form>
      </Card>
    </div>
  );
};