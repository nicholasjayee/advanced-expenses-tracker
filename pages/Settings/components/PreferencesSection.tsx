import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Moon, Sun, Monitor, Bell, Globe, Shield } from 'lucide-react';
import { availableCurrencies } from '../../../data/currencies.ts';

export const PreferencesSection: React.FC = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="space-y-6 gsap-fade-in">
      <Card title="Appearance">
        <div className="grid grid-cols-3 gap-4">
           <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary/10 text-primary">
              <Moon size={24} className="mb-2" />
              <span className="text-sm font-medium">Dark</span>
           </button>
           <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background text-muted hover:text-white hover:border-white/20 transition-all opacity-50 cursor-not-allowed" title="Coming Soon">
              <Sun size={24} className="mb-2" />
              <span className="text-sm font-medium">Light</span>
           </button>
           <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background text-muted hover:text-white hover:border-white/20 transition-all opacity-50 cursor-not-allowed" title="Coming Soon">
              <Monitor size={24} className="mb-2" />
              <span className="text-sm font-medium">System</span>
           </button>
        </div>
      </Card>

      <Card title="Regional">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm text-muted mb-1">Display Currency</label>
               <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <select className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-white focus:border-primary focus:outline-none appearance-none">
                     {availableCurrencies.map(c => (
                        <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                     ))}
                  </select>
               </div>
               <p className="text-xs text-muted mt-1">Default currency for dashboard aggregation.</p>
            </div>
            <div>
               <label className="block text-sm text-muted mb-1">Date Format</label>
               <select className="w-full bg-background border border-border rounded-lg p-2.5 text-white focus:border-primary focus:outline-none">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
               </select>
            </div>
         </div>
      </Card>

      <Card title="Notifications">
         <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded text-blue-500">
                     <Bell size={18} />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-white">Bill Reminders</p>
                     <p className="text-xs text-muted">Get alerted 3 days before due dates</p>
                  </div>
               </div>
               <Toggle checked={pushNotifs} onChange={setPushNotifs} />
            </div>

            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded text-purple-500">
                     <Shield size={18} />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-white">Security Alerts</p>
                     <p className="text-xs text-muted">Login attempts and suspicious activity</p>
                  </div>
               </div>
               <Toggle checked={true} onChange={() => {}} disabled />
            </div>
         </div>
      </Card>
    </div>
  );
};

const Toggle = ({ checked, onChange, disabled }: { checked: boolean, onChange: (v: boolean) => void, disabled?: boolean }) => (
   <button 
      onClick={() => !disabled && onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors ${checked ? 'bg-primary' : 'bg-border'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
   >
      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${checked ? 'left-6' : 'left-1'}`}></div>
   </button>
);