import React, { useState, useEffect } from 'react';
import { Account, AccountType } from '../../../data/accounts.ts';
import { availableCurrencies } from '../../../data/currencies.ts';
import { AccountColors, ACCOUNT_TYPE_LABELS } from '../types/index.ts';
import { X, Check } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Account, 'id'>) => void;
  initialData?: Account;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Omit<Account, 'id'>>({
    name: '',
    type: AccountType.CHECKING,
    balance: 0,
    currency: 'USD',
    color: AccountColors[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type,
        balance: initialData.balance,
        currency: initialData.currency,
        color: initialData.color
      });
    } else {
      setFormData({
        name: '',
        type: AccountType.CHECKING,
        balance: 0,
        currency: 'USD',
        color: AccountColors[Math.floor(Math.random() * AccountColors.length)]
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-xl font-bold text-text">{initialData ? 'Edit Account' : 'Add Account'}</h2>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Account Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none"
              placeholder="e.g. Chase Savings"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm text-muted mb-1.5">Type</label>
               <select 
                 value={formData.type}
                 onChange={e => setFormData({...formData, type: e.target.value as AccountType})}
                 className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none"
               >
                 {Object.entries(ACCOUNT_TYPE_LABELS).map(([value, label]) => (
                   <option key={value} value={value}>{label}</option>
                 ))}
               </select>
            </div>
            <div>
               <label className="block text-sm text-muted mb-1.5">Currency</label>
               <select 
                 value={formData.currency}
                 onChange={e => setFormData({...formData, currency: e.target.value})}
                 className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none"
                 disabled={!!initialData} // Currency change should be done via conversion, not edit
               >
                 {availableCurrencies.map(curr => (
                   <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>
                 ))}
               </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">Initial Balance</label>
            <input 
              type="number" 
              value={formData.balance}
              onChange={e => setFormData({...formData, balance: parseFloat(e.target.value)})}
              className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Card Color</label>
            <div className="flex flex-wrap gap-2">
              {AccountColors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({...formData, color})}
                  className={`w-8 h-8 rounded-full ${color} transition-transform hover:scale-110 flex items-center justify-center ${formData.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-surface' : ''}`}
                >
                  {formData.color === color && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors mt-4">
            {initialData ? 'Save Changes' : 'Create Account'}
          </button>
          
          {initialData && (
             <p className="text-xs text-muted text-center">To change currency, use the convert option on the card.</p>
          )}
        </form>
      </div>
    </div>
  );
};