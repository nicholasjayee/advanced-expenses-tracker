import React from 'react';
import { Card } from '../../components/ui/Card';
import { Liability } from '../../types';
import { CreditCard, Home, Car, AlertCircle } from 'lucide-react';

const liabilities: Liability[] = [
  { id: '1', name: 'Home Mortgage', totalAmount: 450000, remainingAmount: 342000, interestRate: 3.25, dueDate: '2045-05-15' },
  { id: '2', name: 'Car Loan', totalAmount: 35000, remainingAmount: 12500, interestRate: 4.5, dueDate: '2026-08-20' },
  { id: '3', name: 'Credit Card (Visa)', totalAmount: 10000, remainingAmount: 2450, interestRate: 19.99, dueDate: '2024-06-01' },
];

const Liabilities: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gsap-fade-in">
        <h2 className="text-3xl font-bold text-white">Liabilities</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gsap-fade-in">
         {liabilities.map((item) => {
            const progress = ((item.totalAmount - item.remainingAmount) / item.totalAmount) * 100;
            const Icon = item.name.toLowerCase().includes('home') ? Home : item.name.toLowerCase().includes('car') ? Car : CreditCard;
            
            return (
               <Card key={item.id} className="relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-background rounded-lg border border-border">
                           <Icon className="text-white" size={24} />
                        </div>
                        <div>
                           <h3 className="font-semibold text-white">{item.name}</h3>
                           <p className="text-xs text-muted">{item.interestRate}% APR</p>
                        </div>
                     </div>
                     <span className="text-sm font-bold text-white">${item.remainingAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs text-muted">
                        <span>Paid: ${Math.floor(item.totalAmount - item.remainingAmount).toLocaleString()}</span>
                        <span>{Math.round(progress)}%</span>
                     </div>
                     <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                     </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                     <span className="text-xs text-muted">Due: {item.dueDate}</span>
                     <button className="text-xs font-medium text-white hover:text-primary transition-colors">Make Payment</button>
                  </div>
               </Card>
            );
         })}
      </div>

      <div className="gsap-fade-in">
         <Card className="bg-danger/5 border-danger/20">
            <div className="flex gap-4">
               <AlertCircle className="text-danger shrink-0" size={24} />
               <div>
                  <h3 className="text-lg font-semibold text-danger">Debt Reduction Strategy</h3>
                  <p className="text-sm text-danger/80 mt-1">
                     Based on your current interest rates, we recommend focusing on the <strong>Credit Card (Visa)</strong> first (Avalanche Method) as it has the highest APR (19.99%). Paying an extra $200/mo could save you $450 in interest this year.
                  </p>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default Liabilities;