
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface UserProfile {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl?: string;
}

interface SettingsContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  name: 'Alex Sterling',
  username: 'alex_sterling',
  email: 'alex@finnexus.app',
  bio: 'Financial enthusiast building wealth one pixel at a time.'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <SettingsContext.Provider value={{ profile, updateProfile }}>
      {children}
    </SettingsContext.Provider>
  );
};
