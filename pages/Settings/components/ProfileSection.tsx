import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { User, Mail, Camera, Save, CheckCircle } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext.tsx';

export const ProfileSection: React.FC = () => {
  const { profile, updateProfile } = useSettings();
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 gsap-fade-in">
      <Card title="Public Profile">
        <div className="flex flex-col md:flex-row gap-8 items-start">
           <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-surface border-2 border-border flex items-center justify-center overflow-hidden">
                 {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                 ) : (
                    <User size={40} className="text-muted" />
                 )}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera size={20} className="text-white" />
              </div>
           </div>
           
           <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm text-muted mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-sm text-muted mb-1">Username</label>
                    <input 
                      type="text" 
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none"
                    />
                 </div>
              </div>
              
              <div>
                 <label className="block text-sm text-muted mb-1">Email Address</label>
                 <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-background border border-border rounded-lg pl-10 p-2.5 text-text focus:border-primary focus:outline-none"
                    />
                 </div>
              </div>

              <div>
                 <label className="block text-sm text-muted mb-1">Bio</label>
                 <textarea 
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="w-full bg-background border border-border rounded-lg p-2.5 text-text focus:border-primary focus:outline-none h-24 resize-none"
                 />
              </div>

              <div className="pt-2 flex items-center gap-3">
                 <button 
                    onClick={handleSave}
                    className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                 >
                    <Save size={16} /> Save Changes
                 </button>
                 {saved && (
                    <span className="text-secondary text-sm flex items-center gap-1 animate-in fade-in">
                        <CheckCircle size={14} /> Saved successfully
                    </span>
                 )}
              </div>
           </div>
        </div>
      </Card>
    </div>
  );
};