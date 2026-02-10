import React from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Liability } from '../types/index.ts';
import { AlertCircle, TrendingDown, Target } from 'lucide-react';

interface DebtStrategyProps {
  highestAprLiability?: Liability;
  totalMonthlyPayment: number;
}

export const DebtStrategy: React.FC<DebtStrategyProps> = ({ highestAprLiability, totalMonthlyPayment }) => {
  if (!highestAprLiability) return null;

  return (
     <div className="gsap-fade-in">
         <Card className="bg-gradient-to-br from-danger/5 to-purple-500/5 border-danger/20">
            <div className="flex gap-4 items-start">
               <div className="p-3 bg-danger/10 rounded-xl text-danger shrink-0">
                  <Target size={24} />
               </div>
               <div>
                  <h3 className="text-lg font-semibold text-white">Recommended Strategy: Avalanche Method</h3>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                     To minimize interest payments, you should prioritize paying off <strong>{highestAprLiability.name}</strong> first, as it has the highest APR of <strong>{highestAprLiability.interestRate}%</strong>.
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-4">
                     <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <p className="text-xs text-muted mb-1">Target Priority</p>
                        <p className="text-sm font-bold text-danger">{highestAprLiability.name}</p>
                     </div>
                     <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <p className="text-xs text-muted mb-1">Total Min Payments</p>
                        <p className="text-sm font-bold text-white">${totalMonthlyPayment.toLocaleString()}/mo</p>
                     </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-muted flex items-center gap-2">
                     <AlertCircle size={12} />
                     <span>Paying an extra $100/mo towards {highestAprLiability.name} could shorten payoff by 8 months.</span>
                  </div>
               </div>
            </div>
         </Card>
      </div>
  );
};