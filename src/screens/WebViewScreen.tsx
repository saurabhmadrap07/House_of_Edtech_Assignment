import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, ScrollView, RefreshControl, useColorScheme } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNotification } from '../contexts/NotificationContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

const lightTheme = {
  background: '#fff',
  textColor: '#000',
  buttonBackground: '#eee',
};

const darkTheme = {
  background: '#000',
  textColor: '#fff',
  buttonBackground: '#222',
};

const WebViewScreen: React.FC<Props> = ({ navigation }) => {
  const { triggerWelcomeNotification, triggerVideoAvailableNotification } = useNotification();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [refreshing, setRefreshing] = useState(false);
  const webviewRef = useRef<WebView>(null);

  const onWebViewLoadEnd = () => {
    triggerWelcomeNotification();
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    webviewRef.current?.reload();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <WebView
          ref={webviewRef}
          source={{ uri: 'https://reactnative.dev' }}
          style={[styles.webview, { backgroundColor: theme.background }]}
          onLoadEnd={onWebViewLoadEnd}
        />
      </ScrollView>
      <View style={[styles.buttonsContainer, { backgroundColor: theme.buttonBackground }]}>
        <Button
          color={theme.textColor}
          title="Trigger Welcome Notification"
          onPress={triggerWelcomeNotification}
        />
        <View style={{ height: 10 }} />
        <Button
          color={theme.textColor}
          title="Trigger Video Available Notification"
          onPress={triggerVideoAvailableNotification}
        />
        <View style={{ height: 10 }} />
        <Button
          color={theme.textColor}
          title="Go to Video Player"
          onPress={() => navigation.navigate('VideoPlayer')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1, minHeight: 500 },
  buttonsContainer: {
    padding: 10,
  },
});

export default WebViewScreen;
