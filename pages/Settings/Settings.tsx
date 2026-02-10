import React, { useState } from 'react';
import { User, Settings as SettingsIcon, Database, ShieldCheck } from 'lucide-react';
import { ProfileSection } from './components/ProfileSection.tsx';
import { PreferencesSection } from './components/PreferencesSection.tsx';
import { DataSection } from './components/DataSection.tsx';

type Tab = 'profile' | 'preferences' | 'data' | 'security';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gsap-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-white">Settings</h2>
          <p className="text-muted">Manage your account and application preferences.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex-shrink-0 gsap-fade-in">
           <div className="bg-surface border border-border rounded-xl p-2 sticky top-24">
              {tabs.map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${
                       activeTab === tab.id 
                       ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                       : 'text-muted hover:text-white hover:bg-white/5'
                    }`}
                 >
                    <tab.icon size={18} />
                    {tab.label}
                 </button>
              ))}
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
           {activeTab === 'profile' && <ProfileSection />}
           {activeTab === 'preferences' && <PreferencesSection />}
           {activeTab === 'data' && <DataSection />}
           {activeTab === 'security' && (
              <div className="flex items-center justify-center h-64 bg-surface border border-border rounded-xl border-dashed">
                 <div className="text-center text-muted">
                    <ShieldCheck size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Security settings are managed by your identity provider.</p>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Settings;