import React from 'react';
import { useLiabilities } from './core/useLiabilities.ts';
import { AddLiabilityForm } from './components/AddLiabilityForm.tsx';
import { LiabilityList } from './components/LiabilityList.tsx';
import { DebtStrategy } from './components/DebtStrategy.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { DollarSign } from 'lucide-react';

const Liabilities: React.FC = () => {
  const { liabilities, addLiability, deleteLiability, stats } = useLiabilities();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gsap-fade-in">
        <h2 className="text-3xl font-bold text-text">Liabilities</h2>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gsap-fade-in">
         <Card className="bg-surface/50 border-danger/20">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-danger/10 rounded-lg text-danger">
                  <DollarSign size={20} />
               </div>
               <span className="text-sm text-muted">Total Debt Load</span>
            </div>
            <h3 className="text-3xl font-bold text-text">${stats.totalDebt.toLocaleString()}</h3>
         </Card>
         <DebtStrategy 
            highestAprLiability={stats.highestAprLiability} 
            totalMonthlyPayment={stats.totalMonthlyPayment}
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left: Form */}
         <div className="lg:col-span-1 space-y-6">
            <AddLiabilityForm onAdd={addLiability} />
         </div>

         {/* Right: List */}
         <div className="lg:col-span-2">
            <LiabilityList liabilities={liabilities} onDelete={deleteLiability} />
         </div>
      </div>
    </div>
  );
};

export default Liabilities;