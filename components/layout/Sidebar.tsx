import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Zap, 
  CreditCard, 
  Settings,
  Activity,
  Landmark,
  ArrowDownLeft
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { label: 'Accounts', path: '/accounts', icon: <Landmark size={20} /> },
  { label: 'Expenses', path: '/expenses', icon: <Wallet size={20} /> },
  { label: 'Income', path: '/income', icon: <ArrowDownLeft size={20} /> },
  { label: 'Investments', path: '/investments', icon: <TrendingUp size={20} /> },
  { label: 'Electricity', path: '/electricity', icon: <Zap size={20} /> },
  { label: 'Liabilities', path: '/liabilities', icon: <CreditCard size={20} /> },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-surface border-r border-border h-screen fixed left-0 top-0 flex flex-col z-20">
      <div className="p-6 border-b border-border flex items-center gap-2">
        <Activity className="text-primary" />
        <h1 className="text-xl font-bold tracking-tight text-white">FinNexus</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <NavLink 
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};