import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Moon, Sun, Monitor, Bell, Globe, Shield, Check } from 'lucide-react';
import { availableCurrencies } from '../../../data/currencies.ts';
import { useTheme } from 'next-themes';

export const PreferencesSection: React.FC = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6 gsap-fade-in">
      <Card title="Appearance">
        <div className="grid grid-cols-3 gap-4">
           <button 
             onClick={() => setTheme('dark')}
             className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
               theme === 'dark' 
                 ? 'border-primary bg-primary/10 text-primary' 
                 : 'border-border bg-background text-muted hover:text-text hover:border-primary/50'
             }`}
           >
              <Moon size={24} className="mb-2" />
              <div className="flex items-center gap-1">
                 <span className="text-sm font-medium">Dark</span>
                 {theme === 'dark' && <Check size={12} />}
              </div>
           </button>
           
           <button 
             onClick={() => setTheme('light')}
             className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
               theme === 'light' 
                 ? 'border-primary bg-primary/10 text-primary' 
                 : 'border-border bg-background text-muted hover:text-text hover:border-primary/50'
             }`}
           >
              <Sun size={24} className="mb-2" />
              <div className="flex items-center gap-1">
                 <span className="text-sm font-medium">Light</span>
                 {theme === 'light' && <Check size={12} />}
              </div>
           </button>
           
           <button 
             onClick={() => setTheme('system')}
             className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
               theme === 'system' 
                 ? 'border-primary bg-primary/10 text-primary' 
                 : 'border-border bg-background text-muted hover:text-text hover:border-primary/50'
             }`}
           >
              <Monitor size={24} className="mb-2" />
              <div className="flex items-center gap-1">
                 <span className="text-sm font-medium">System</span>
                 {theme === 'system' && <Check size={12} />}
              </div>
           </button>
        </div>
      </Card>

      <Card title="Regional">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm text-muted mb-1">Display Currency</label>
               <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <select className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-text focus:border-primary focus:outline-none appearance-none">
                     {availableCurrencies.map(c => (
                        <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                     ))}
                  </select>
               </div>
               <p className="text-xs text-muted mt-1">Default currency for dashboard aggregation.</p>
            </div>
            <div>
               <label className="block text-sm text-muted mb-1">Date Format</label>
               <select className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none">
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
                     <p className="text-sm font-medium text-text">Bill Reminders</p>
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
                     <p className="text-sm font-medium text-text">Security Alerts</p>
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
      <div className={`w-4 h-4 rounded-full bg-surface absolute top-1 transition-all shadow-sm ${checked ? 'left-6' : 'left-1'}`}></div>
   </button>
);