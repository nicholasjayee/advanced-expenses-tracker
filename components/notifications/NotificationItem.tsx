import React from 'react';
import { AppNotification } from '../../types.ts';
import { CheckCircle, AlertTriangle, Info, XCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationItemProps {
  notification: AppNotification;
  onMarkRead: (id: string) => void;
  onRemove: (id: string) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'SUCCESS': return <CheckCircle size={16} className="text-secondary" />;
    case 'WARNING': return <AlertTriangle size={16} className="text-accent" />;
    case 'ERROR': return <XCircle size={16} className="text-danger" />;
    default: return <Info size={16} className="text-primary" />;
  }
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkRead, onRemove }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <div 
      className={`relative p-4 border-b border-border hover:bg-white/5 transition-colors group cursor-pointer ${notification.isRead ? 'opacity-70' : 'bg-surface'}`}
      onClick={handleClick}
    >
      <div className="flex gap-3 items-start">
        <div className={`mt-0.5 shrink-0 ${!notification.isRead ? 'animate-pulse' : ''}`}>
           {getIcon(notification.type)}
        </div>
        <div className="flex-1 pr-6">
           <div className="flex justify-between items-start">
              <h4 className={`text-sm font-medium ${notification.isRead ? 'text-muted' : 'text-white'}`}>
                {notification.title}
              </h4>
           </div>
           <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
             {notification.message}
           </p>
           <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
             <Clock size={10} /> {formatTime(new Date(notification.timestamp))}
           </p>
        </div>
        
        {!notification.isRead && (
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary"></div>
        )}
      </div>
    </div>
  );
};