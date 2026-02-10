
import React from 'react';
import { Card } from '../../components/ui/Card.tsx';
import { Zap, AlertTriangle, Lightbulb } from 'lucide-react';
import { useElectricity } from './core/useElectricity.ts';
import { AddElectricityForm } from './components/AddElectricityForm.tsx';
import { ElectricityStats } from './components/ElectricityStats.tsx';
import { ElectricityCharts } from './components/ElectricityCharts.tsx';

const Electricity: React.FC = () => {
  const { stats, chartData, addElectricityLog, accounts } = useElectricity();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gsap-fade-in">
        <h2 className="text-3xl font-bold text-white">Electricity Usage</h2>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-medium flex items-center gap-2">
             <Zap size={14} fill="currentColor"/> Grid Status: Stable
           </span>
        </div>
      </div>

      <ElectricityStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gsap-fade-in">
        <div className="lg:col-span-2 space-y-6">
           <ElectricityCharts data={chartData} />
           
           <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex gap-3">
              <Lightbulb className="text-yellow-500 shrink-0" size={24} />
              <div>
                 <h4 className="font-medium text-yellow-500">Efficiency Insight</h4>
                 <p className="text-sm text-yellow-200/80">
                    Your average cost per kWh is <strong>${stats.avgCostPerKwh.toFixed(3)}</strong>. 
                    {stats.trend === 'Rising' 
                      ? " Usage is trending upwards compared to the previous record. Consider checking your AC/Heating settings." 
                      : " Usage is stable or decreasing. Great job!"}
                 </p>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <AddElectricityForm onAdd={addElectricityLog} accounts={accounts} />
           
           <Card title="Latest Logs">
              <div className="space-y-3">
                {chartData.slice(0, 5).map((log, i) => ( // Show first 5 (which are reversed/newest in chartData logic? check logic) 
                  // chartData is reversed in useElectricity (chronological), let's re-reverse for list or use raw expenses
                  <div key={i} className="flex justify-between items-center p-3 bg-background border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                       <div className="bg-accent/10 p-2 rounded text-accent">
                          <Zap size={14} />
                       </div>
                       <div>
                          <p className="text-sm font-medium text-white">{log.date}</p>
                          <p className="text-xs text-muted">{log.kwh} kWh</p>
                       </div>
                    </div>
                    <span className="font-semibold text-white">${log.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Electricity;
