import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';


type NotificationContextType = {
  triggerWelcomeNotification: () => void;
  triggerVideoAvailableNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    // Configure handler for foreground notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false, shouldShowBanner: true,
    shouldShowList: true,}),});
  }, []);

  const triggerWelcomeNotification = () => {
    if (!hasPermission) return;
    setTimeout(() => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Welcome!',
          body: 'Welcome to the React Native WebView screen!',
          sound: true,
        },
        trigger: null,
      });
    }, 3000);
  };

  const triggerVideoAvailableNotification = () => {
    if (!hasPermission) return;
    setTimeout(() => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Video Available',
          body: 'Check out the new video content in the Video Player screen.',
          sound: true,
        },
        trigger: null,
      });
    }, 4000);
  };

  return (
    <NotificationContext.Provider
      value={{ triggerWelcomeNotification, triggerVideoAvailableNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
