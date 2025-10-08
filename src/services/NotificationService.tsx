import React, { createContext, useContext, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationContext = createContext<{
  sendWelcomeNotification: () => Promise<void>;
  sendVideoNotification: () => Promise<void>;
  sendWebViewLoadedNotification: () => Promise<void>;
} | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Request permissions on mount
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Notification permissions are required!');
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F',
      });
    }
  };

  const scheduleNotification = async (title: string, body: string, seconds: number) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: { seconds },
    });
  };

  const sendWelcomeNotification = async () => {
    await scheduleNotification('👋 Welcome!', 'Thanks for using the app.', 3);
  };

  const sendVideoNotification = async () => {
    await scheduleNotification('🎬 Video Ready!', 'Tap to watch video content.', 4);
  };

  const sendWebViewLoadedNotification = async () => {
    await scheduleNotification('🌐 WebView Loaded', 'The website has loaded successfully.', 2);
  };

  return (
    <NotificationContext.Provider
      value={{ sendWelcomeNotification, sendVideoNotification, sendWebViewLoadedNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
