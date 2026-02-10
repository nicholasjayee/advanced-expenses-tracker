import React from 'react';
import { Account, AccountType } from '../../../data/accounts.ts';
import { getCurrencySymbol } from '../../../data/currencies.ts';
import { Card } from '../../../components/ui/Card.tsx';
import { Wallet, CreditCard, Briefcase, Landmark, Banknote, Edit2, Trash2, ArrowRightLeft, Plus, RefreshCcw, Minus } from 'lucide-react';
import { ACCOUNT_TYPE_LABELS } from '../types/index.ts';

interface AccountCardProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
  onTransfer: (sourceId: string) => void;
  onTopUp: (account: Account) => void;
  onWithdraw: (account: Account) => void;
  onConvert: (account: Account) => void;
}

const getIcon = (type: AccountType) => {
  switch (type) {
    case AccountType.CREDIT_CARD: return <CreditCard size={20} />;
    case AccountType.BUSINESS: return <Briefcase size={20} />;
    case AccountType.SAVINGS: return <Landmark size={20} />;
    case AccountType.CASH: return <Banknote size={20} />;
    default: return <Wallet size={20} />;
  }
};

export const AccountCard: React.FC<AccountCardProps> = ({ account, onEdit, onDelete, onTransfer, onTopUp, onWithdraw, onConvert }) => {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 rounded-xl opacity-20 blur-md transition-all group-hover:opacity-30 ${account.color}`}></div>
      <Card className="relative bg-surface border-border h-full flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg text-white shadow-lg ${account.color}`}>
              {getIcon(account.type)}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg leading-tight">{account.name}</h3>
              <p className="text-xs text-muted mt-1">{ACCOUNT_TYPE_LABELS[account.type]}</p>
            </div>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 rounded-lg p-1">
            <button onClick={() => onEdit(account)} className="p-1.5 hover:bg-white/10 rounded-md text-muted hover:text-white transition-colors" title="Edit">
              <Edit2 size={14} />
            </button>
            <button onClick={() => onConvert(account)} className="p-1.5 hover:bg-white/10 rounded-md text-muted hover:text-blue-400 transition-colors" title="Convert Currency">
              <RefreshCcw size={14} />
            </button>
            <button onClick={() => onDelete(account.id)} className="p-1.5 hover:bg-white/10 rounded-md text-muted hover:text-danger transition-colors" title="Delete">
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="mt-2">
           <p className="text-xs text-muted mb-1">Current Balance</p>
           <h2 className={`text-2xl font-bold ${account.balance < 0 ? 'text-danger' : 'text-white'}`}>
             {account.balance < 0 ? '-' : ''}{getCurrencySymbol(account.currency)}{Math.abs(account.balance).toLocaleString()} <span className="text-sm font-normal text-muted">{account.currency}</span>
           </h2>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-2">
           <button 
             onClick={() => onTransfer(account.id)}
             className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted hover:text-white hover:bg-white/5 py-2 rounded-lg transition-colors border border-transparent hover:border-border"
             title="Transfer"
           >
             <ArrowRightLeft size={14} /> Transfer
           </button>
           <button 
             onClick={() => onTopUp(account)}
             className="flex items-center justify-center gap-1.5 text-xs font-medium text-secondary hover:text-emerald-400 hover:bg-emerald-500/10 py-2 rounded-lg transition-colors border border-transparent hover:border-emerald-500/20"
             title="Top Up"
           >
             <Plus size={14} /> Top Up
           </button>
           <button 
             onClick={() => onWithdraw(account)}
             className="flex items-center justify-center gap-1.5 text-xs font-medium text-danger hover:text-red-400 hover:bg-red-500/10 py-2 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
             title="Withdraw"
           >
             <Minus size={14} /> Withdraw
           </button>
        </div>
      </Card>
    </div>
  );
};