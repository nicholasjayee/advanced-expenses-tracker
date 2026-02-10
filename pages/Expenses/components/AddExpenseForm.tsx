import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Plus, Tag, DollarSign, ListFilter, Calendar as CalendarIcon, Zap } from 'lucide-react';
import { ExpenseCategory } from '../types/index.ts';

interface AddExpenseFormProps {
  onAdd: (description: string, amount: number, date: Date, category?: string, units?: number) => void;
  isCategorizing: boolean;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAdd, isCategorizing }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  // Use string for native date input (YYYY-MM-DD)
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [units, setUnits] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    onAdd(
      description, 
      parseFloat(amount), 
      new Date(dateStr), 
      selectedCategory || undefined,
      (selectedCategory === ExpenseCategory.ELECTRICITY && units) ? parseFloat(units) : undefined
    );
    
    setDescription('');
    setAmount('');
    setDateStr(new Date().toISOString().split('T')[0]);
    setSelectedCategory('');
    setUnits('');
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
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-white placeholder-muted/50 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full"
                required
              />
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
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-white placeholder-muted/50"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-muted mb-1">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-white placeholder-muted/50"
                required
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Category (Optional)</label>
            <div className="relative">
              <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-sm focus:border-primary focus:outline-none text-white appearance-none cursor-pointer"
              >
                <option value="">Auto-Categorize (AI)</option>
                {Object.values(ExpenseCategory).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {selectedCategory === ExpenseCategory.ELECTRICITY && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm text-accent mb-1 flex items-center gap-1">
                <Zap size={14} /> Units Consumed (kWh)
              </label>
              <div className="relative">
                <Zap className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="e.g. 150"
                  className="w-full bg-background border border-accent/50 rounded-lg pl-10 p-2.5 text-sm focus:border-accent focus:outline-none text-white placeholder-muted/50"
                  step="1"
                />
              </div>
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