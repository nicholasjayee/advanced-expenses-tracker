import React, { useState } from 'react';
import { useAccounts } from '../../context/AccountContext.tsx';
import { AccountCard } from './components/AccountCard.tsx';
import { AccountModal } from './components/AccountModal.tsx';
import { TransferModal } from './components/TransferModal.tsx';
import { TopUpModal } from './components/TopUpModal.tsx';
import { WithdrawModal } from './components/WithdrawModal.tsx';
import { CurrencyConversionModal } from './components/CurrencyConversionModal.tsx';
import { Plus } from 'lucide-react';
import { Account } from '../../data/accounts.ts';

const Accounts: React.FC = () => {
  const { 
    accounts, 
    addAccount, 
    updateAccount, 
    deleteAccount, 
    transferFunds, 
    topUpAccount,
    withdrawFromAccount,
    convertAccountCurrency
  } = useAccounts();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [topUpAccountData, setTopUpAccountData] = useState<Account | null>(null);
  const [withdrawAccountData, setWithdrawAccountData] = useState<Account | null>(null);
  const [convertAccountData, setConvertAccountData] = useState<Account | null>(null);
  const [transferSourceId, setTransferSourceId] = useState<string>('');

  const handleAddSubmit = (data: Omit<Account, 'id'>) => {
    addAccount(data);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (data: Omit<Account, 'id'>) => {
    if (editingAccount) {
      updateAccount(editingAccount.id, data);
      setEditingAccount(null);
    }
  };

  const handleTransferSubmit = (fromId: string, toId: string, amount: number, feeRate: number, exchangeRate: number, description: string) => {
    transferFunds(fromId, toId, amount, feeRate, exchangeRate, description);
    setIsTransferModalOpen(false);
    setTransferSourceId('');
  };

  const handleTopUpSubmit = (id: string, amount: number, description: string) => {
    topUpAccount(id, amount, description);
    setTopUpAccountData(null);
  };

  const handleWithdrawSubmit = (id: string, amount: number, description: string) => {
    withdrawFromAccount(id, amount, description);
    setWithdrawAccountData(null);
  };

  const handleConvertSubmit = (id: string, targetCurrency: string, rate: number) => {
    convertAccountCurrency(id, targetCurrency, rate);
    setConvertAccountData(null);
  };

  const openTransfer = (sourceId: string) => {
    setTransferSourceId(sourceId);
    setIsTransferModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end gsap-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-text">Accounts</h2>
          <p className="text-muted">Manage your cash sources, banks, and liabilities.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsTransferModalOpen(true)}
             className="bg-surface hover:bg-muted/10 text-text border border-border px-4 py-2 rounded-lg text-sm font-medium transition-colors"
           >
             Quick Transfer
           </button>
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
           >
             <Plus size={18} /> Add Account
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gsap-fade-in">
        {accounts.map((account) => (
          <AccountCard 
            key={account.id} 
            account={account}
            onEdit={setEditingAccount}
            onDelete={deleteAccount}
            onTransfer={openTransfer}
            onTopUp={setTopUpAccountData}
            onWithdraw={setWithdrawAccountData}
            onConvert={setConvertAccountData}
          />
        ))}
        
        {/* Add New Placeholder Card */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="group border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-surface/50 transition-all min-h-[220px]"
        >
          <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-muted">
            <Plus size={24} />
          </div>
          <span className="text-muted font-medium group-hover:text-text">Connect New Account</span>
        </button>
      </div>

      {/* Modals */}
      <AccountModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={handleAddSubmit} 
      />
      
      {editingAccount && (
        <AccountModal 
          isOpen={!!editingAccount} 
          onClose={() => setEditingAccount(null)} 
          onSubmit={handleEditSubmit} 
          initialData={editingAccount}
        />
      )}

      <TransferModal 
        isOpen={isTransferModalOpen}
        onClose={() => { setIsTransferModalOpen(false); setTransferSourceId(''); }}
        onSubmit={handleTransferSubmit}
        accounts={accounts}
        initialSourceId={transferSourceId}
      />

      <TopUpModal 
        isOpen={!!topUpAccountData}
        onClose={() => setTopUpAccountData(null)}
        onSubmit={handleTopUpSubmit}
        account={topUpAccountData}
      />

      <WithdrawModal 
        isOpen={!!withdrawAccountData}
        onClose={() => setWithdrawAccountData(null)}
        onSubmit={handleWithdrawSubmit}
        account={withdrawAccountData}
      />

      <CurrencyConversionModal
        isOpen={!!convertAccountData}
        onClose={() => setConvertAccountData(null)}
        onSubmit={handleConvertSubmit}
        account={convertAccountData}
      />
    </div>
  );
};

export default Accounts;