import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext.tsx';
import { useSettings } from '../../context/SettingsContext.tsx';
import { NotificationDropdown } from '../notifications/NotificationDropdown.tsx';

export const Header: React.FC = () => {
  const { unreadCount } = useNotifications();
  const { profile } = useSettings();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        
        {/* Notification Bell Area */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative p-2 rounded-full transition-colors ${isNotifOpen ? 'bg-muted/10 text-text' : 'text-muted hover:text-text'}`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-danger rounded-full border-2 border-surface animate-pulse"></span>
            )}
          </button>
          
          <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        <div className="h-8 w-[1px] bg-border"></div>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-text">{profile.name}</p>
            <p className="text-xs text-muted">Pro Plan</p>
          </div>
          {profile.avatarUrl ? (
             <img src={profile.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-border" />
          ) : (
             <UserCircle size={32} className="text-muted" />
          )}
        </div>
      </div>
    </header>
  );
};