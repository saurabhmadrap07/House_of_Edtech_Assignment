import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationProvider } from './src/contexts/NotificationContext';
import WebViewScreen from './src/screens/WebViewScreen';
import VideoPlayerScreen from './src/screens/VideoPlayerScreen';

export type RootStackParamList = {
  WebView: undefined;
  VideoPlayer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WebView">
          <Stack.Screen name="WebView" component={WebViewScreen} options={{ title: 'WebView' }} />
          <Stack.Screen
            name="VideoPlayer"
            component={VideoPlayerScreen}
            options={{ title: 'Video Player' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
}
