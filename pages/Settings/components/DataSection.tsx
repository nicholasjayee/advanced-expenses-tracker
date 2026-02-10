import React, { useRef, useState } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Download, Upload, Trash2, Database, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useAccounts } from '../../../context/AccountContext.tsx';
import { useExpensesContext } from '../../../context/ExpenseContext.tsx';
import { useIncomeContext } from '../../../context/IncomeContext.tsx';
import { useInvestmentContext } from '../../../context/InvestmentContext.tsx';
import { useLiabilitiesContext } from '../../../context/LiabilityContext.tsx';

export const DataSection: React.FC = () => {
  const { accounts, importData: importAccounts, clearData: clearAccounts } = useAccounts();
  const { expenses, importData: importExpenses, clearData: clearExpenses } = useExpensesContext();
  const { incomes, importData: importIncomes, clearData: clearIncomes } = useIncomeContext();
  const { investments, importData: importInvestments, clearData: clearInvestments } = useInvestmentContext();
  const { liabilities, importData: importLiabilities, clearData: clearLiabilities } = useLiabilitiesContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resetStatus, setResetStatus] = useState<'idle' | 'cleared'>('idle');

  const handleExport = () => {
    const data = {
      timestamp: new Date().toISOString(),
      version: "1.0",
      accounts,
      expenses,
      incomes,
      investments,
      liabilities
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finnexus_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus('loading');
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        
        // Basic validation
        if (!json.accounts || !Array.isArray(json.accounts)) throw new Error("Invalid Format");

        // Batch Update
        importAccounts(json.accounts || []);
        importExpenses(json.expenses || []);
        importIncomes(json.incomes || []);
        importInvestments(json.investments || []);
        importLiabilities(json.liabilities || []);

        setImportStatus('success');
        setTimeout(() => setImportStatus('idle'), 3000);
      } catch (err) {
        console.error("Import failed", err);
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    };

    reader.readAsText(file);
    // Reset input so same file can be selected again
    e.target.value = ''; 
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
       clearAccounts();
       clearExpenses();
       clearIncomes();
       clearInvestments();
       clearLiabilities();
       setResetStatus('cleared');
       setTimeout(() => setResetStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-6 gsap-fade-in">
      <Card title="Data Management">
         <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-start gap-4 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
               <Database size={24} />
            </div>
            <div>
               <h4 className="font-semibold text-text">Your data is yours.</h4>
               <p className="text-sm text-text/80 mt-1">
                  FinNexus stores your data in local memory. 
                  Export your data regularly to create backups. Import JSON files to restore previous states.
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Export Button */}
            <button 
               onClick={handleExport}
               className="flex flex-col items-center justify-center gap-3 p-6 bg-surface border border-border rounded-xl hover:bg-muted/5 hover:border-primary/50 transition-all group"
            >
               <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download size={24} className="text-primary" />
               </div>
               <div className="text-center">
                  <h4 className="font-medium text-text">Export Data</h4>
                  <p className="text-xs text-muted mt-1">Download JSON backup</p>
               </div>
            </button>

            {/* Import Button */}
            <button 
               onClick={handleImportClick}
               disabled={importStatus === 'loading'}
               className="flex flex-col items-center justify-center gap-3 p-6 bg-surface border border-border rounded-xl hover:bg-muted/5 hover:border-secondary/50 transition-all group"
            >
               <input 
                 type="file" 
                 accept=".json" 
                 ref={fileInputRef} 
                 className="hidden" 
                 onChange={handleFileChange} 
               />
               <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform">
                  {importStatus === 'loading' ? (
                     <Loader2 size={24} className="text-secondary animate-spin" />
                  ) : importStatus === 'success' ? (
                     <CheckCircle size={24} className="text-secondary" />
                  ) : importStatus === 'error' ? (
                     <AlertTriangle size={24} className="text-danger" />
                  ) : (
                     <Upload size={24} className="text-secondary" />
                  )}
               </div>
               <div className="text-center">
                  <h4 className="font-medium text-text">
                     {importStatus === 'loading' ? 'Importing...' : 'Import Data'}
                  </h4>
                  <p className={`text-xs mt-1 ${importStatus === 'error' ? 'text-danger' : importStatus === 'success' ? 'text-secondary' : 'text-muted'}`}>
                     {importStatus === 'error' ? 'Invalid JSON File' : importStatus === 'success' ? 'Import Successful' : 'Restore from backup'}
                  </p>
               </div>
            </button>
         </div>
      </Card>

      <Card className="border-danger/30">
         <div className="flex items-start gap-4">
            <div className="p-2 bg-danger/10 rounded-lg text-danger">
               <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
               <h3 className="text-lg font-semibold text-text">Danger Zone</h3>
               <p className="text-sm text-muted mt-1 mb-4">
                  Permanently delete all your data and reset the application to its initial state (empty). This action cannot be undone unless you have a backup.
               </p>
               <button 
                 onClick={handleReset}
                 className="px-4 py-2 bg-danger/10 hover:bg-danger text-danger hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
               >
                  {resetStatus === 'cleared' ? <CheckCircle size={16}/> : <Trash2 size={16} />}
                  {resetStatus === 'cleared' ? 'Application Reset' : 'Reset Application'}
               </button>
            </div>
         </div>
      </Card>
    </div>
  );
};