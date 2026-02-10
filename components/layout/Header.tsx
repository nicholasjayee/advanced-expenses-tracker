import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-border fixed top-0 right-0 w-[calc(100%-16rem)] z-10 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions, assets..." 
            className="w-full bg-background border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-text placeholder-muted"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full"></span>
        </button>
        <div className="h-8 w-[1px] bg-border"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Alex Sterling</p>
            <p className="text-xs text-muted">Pro Plan</p>
          </div>
          <UserCircle size={32} className="text-muted" />
        </div>
      </div>
    </header>
  );
};