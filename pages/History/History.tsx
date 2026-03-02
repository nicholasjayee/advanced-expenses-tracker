import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationItem } from '../../components/notifications/NotificationItem';
import { CheckCheck, Trash2, BellOff, Bell } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const History: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  // Sort by date descending
  const sortedNotifications = [...notifications].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gsap-fade-in">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Bell size={24} />
           </div>
           <div>
              <h2 className="text-3xl font-bold text-text">Notification History</h2>
              <p className="text-muted">Review your past alerts and system messages.</p>
           </div>
        </div>
        <div className="flex gap-2">
           {notifications.length > 0 && (
            <>
              <button 
                onClick={markAllAsRead} 
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text hover:bg-muted/10 transition-colors"
              >
                <CheckCheck size={16} /> Mark All Read
              </button>
              <button 
                onClick={clearAll} 
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors"
              >
                <Trash2 size={16} /> Clear All
              </button>
            </>
           )}
        </div>
      </div>

      <div className="gsap-fade-in">
        <Card className="min-h-[500px] p-0 overflow-hidden">
          {sortedNotifications.length > 0 ? (
             <div className="divide-y divide-border">
                {sortedNotifications.map(notification => (
                   <NotificationItem 
                      key={notification.id}
                      notification={notification}
                      onMarkRead={markAsRead}
                      onRemove={removeNotification}
                   />
                ))}
             </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-[400px] text-muted">
                <div className="p-4 bg-muted/10 rounded-full mb-4">
                   <BellOff size={32} />
                </div>
                <h3 className="text-lg font-medium text-text">No notifications</h3>
                <p className="text-sm">Your history is clean.</p>
             </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default History;