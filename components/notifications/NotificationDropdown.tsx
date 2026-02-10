import React, { useEffect, useRef } from 'react';
import { useNotifications } from '../../context/NotificationContext.tsx';
import { NotificationItem } from './NotificationItem.tsx';
import { CheckCheck, Trash2, BellOff } from 'lucide-react';
import gsap from 'gsap';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current, 
        { opacity: 0, y: -10, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-12 w-80 md:w-96 bg-surface border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]"
    >
      <div className="p-4 border-b border-border flex justify-between items-center bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <h3 className="font-semibold text-white">Notifications</h3>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <>
              <button 
                onClick={markAllAsRead} 
                className="p-1.5 text-muted hover:text-secondary hover:bg-secondary/10 rounded transition-colors"
                title="Mark all as read"
              >
                <CheckCheck size={16} />
              </button>
              <button 
                onClick={clearAll} 
                className="p-1.5 text-muted hover:text-danger hover:bg-danger/10 rounded transition-colors"
                title="Clear all"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-1">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
              onMarkRead={markAsRead}
              onRemove={removeNotification}
            />
          ))
        ) : (
          <div className="py-12 px-6 text-center text-muted flex flex-col items-center">
            <div className="bg-background p-4 rounded-full mb-3">
               <BellOff size={24} className="opacity-50" />
            </div>
            <p className="text-sm">No new notifications</p>
            <p className="text-xs text-gray-600 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
      
      {notifications.length > 0 && (
         <div className="p-2 border-t border-border bg-background/30 text-center">
            <button className="text-xs text-muted hover:text-primary transition-colors py-1">
               View All History
            </button>
         </div>
      )}
    </div>
  );
};