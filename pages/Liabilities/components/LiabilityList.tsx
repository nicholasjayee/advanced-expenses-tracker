import React from 'react';
import { Liability, LiabilityCategory } from '../types/index.ts';
import { Card } from '../../../components/ui/Card.tsx';
import { Home, Car, CreditCard, Wallet, BookOpen, AlertCircle, Trash2 } from 'lucide-react';
import { getCurrencySymbol } from '../../../data/currencies.ts';

interface LiabilityListProps {
  liabilities: Liability[];
  onDelete: (id: string) => void;
}

const getIcon = (category: string) => {
  switch (category) {
    case LiabilityCategory.MORTGAGE: return Home;
    case LiabilityCategory.CAR_LOAN: return Car;
    case LiabilityCategory.CREDIT_CARD: return CreditCard;
    case LiabilityCategory.STUDENT_LOAN: return BookOpen;
    default: return Wallet;
  }
};

export const LiabilityList: React.FC<LiabilityListProps> = ({ liabilities, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-6 gsap-fade-in">
       {liabilities.map((item) => {
          const progress = item.totalAmount > 0 ? ((item.totalAmount - item.remainingAmount) / item.totalAmount) * 100 : 0;
          const Icon = getIcon(item.category);
          const symbol = getCurrencySymbol(item.currency);
          
          return (
             <Card key={item.id} className="relative overflow-hidden group">
                <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-lg border border-border group-hover:border-danger/50 transition-colors">
                         <Icon className="text-text group-hover:text-danger transition-colors" size={24} />
                      </div>
                      <div>
                         <h3 className="font-semibold text-text">{item.name}</h3>
                         <div className="flex items-center gap-2 text-xs text-muted">
                            <span className="bg-muted/10 px-2 py-0.5 rounded">{item.category}</span>
                            <span>{item.interestRate}% APR</span>
                         </div>
                      </div>
                   </div>
                   <div className="text-right">
                       <span className="block text-sm font-bold text-text">{symbol}{item.remainingAmount.toLocaleString()}</span>
                       <span className="text-[10px] text-muted">Outstanding</span>
                   </div>
                </div>
                
                <div className="space-y-2">
                   <div className="flex justify-between text-xs text-muted">
                      <span>Paid: {symbol}{Math.floor(item.totalAmount - item.remainingAmount).toLocaleString()}</span>
                      <span>{Math.round(progress)}%</span>
                   </div>
                   <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-danger transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                   </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                   <div className="flex items-center gap-2 text-xs text-muted">
                     {item.minimumPayment && (
                        <span>Min Pay: {symbol}{item.minimumPayment}/mo</span>
                     )}
                     <span className="w-1 h-1 bg-muted rounded-full"></span>
                     <span>Due: {item.dueDate}</span>
                   </div>
                   <button 
                     onClick={() => onDelete(item.id)}
                     className="p-1.5 hover:bg-muted/10 rounded text-muted hover:text-danger transition-colors"
                     title="Delete Liability"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>
             </Card>
          );
       })}
       {liabilities.length === 0 && (
         <div className="p-8 text-center border-2 border-dashed border-border rounded-xl">
           <p className="text-muted">No liabilities recorded. You are debt free!</p>
         </div>
       )}
    </div>
  );
};