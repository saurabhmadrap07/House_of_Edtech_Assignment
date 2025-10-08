import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  useColorScheme,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const VIDEO_STREAMS = [
  { label: 'Video-1', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { label: 'Video-2', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
];

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

const isPlaybackStatusSuccess = (
  status: AVPlaybackStatus | null
): status is AVPlaybackStatusSuccess => {
  return status !== null && (status as AVPlaybackStatusSuccess).isLoaded === true;
};

const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const VideoPlayerScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [selectedStreamIndex, setSelectedStreamIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isLoaded = isPlaybackStatusSuccess(status) && status.isLoaded;
  const isPlaying = isLoaded && status.isPlaying;
  const isMuted = isLoaded && status.isMuted;
  const isBuffering = isLoaded && status.isBuffering;
  const positionMillis = isLoaded ? status.positionMillis ?? 0 : 0;
  const durationMillis = isLoaded ? status.durationMillis ?? 0 : 0;

  const handlePlayPause = async () => {
    if (!videoRef.current || !isLoaded) return;
    if (isPlaying) await videoRef.current.pauseAsync();
    else await videoRef.current.playAsync();
  };

  const toggleMute = async () => {
    if (!videoRef.current || !isLoaded) return;
    await videoRef.current.setIsMutedAsync(!isMuted);
  };

  const onSeek = async (value: number) => {
    if (!videoRef.current) return;
    await videoRef.current.setPositionAsync(value * 1000);
  };

  const onSelectStream = async (index: number) => {
    if (index === selectedStreamIndex) return;
    setSelectedStreamIndex(index);
    try {
      await videoRef.current?.unloadAsync();
      await videoRef.current?.loadAsync(
        { uri: VIDEO_STREAMS[index].url },
        { shouldPlay: true, isMuted: isMuted },
        false
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to load video stream');
    }
  };

  const toggleFullscreen = async () => {
    if (!videoRef.current) return;
    if (!isFullscreen) await videoRef.current.presentFullscreenPlayer();
    else await videoRef.current.dismissFullscreenPlayer();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.videoOuterContainer}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: VIDEO_STREAMS[selectedStreamIndex].url }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={false}
          onPlaybackStatusUpdate={setStatus}
          shouldPlay
          onError={() => Alert.alert('Error', 'Video playback error')}
          onFullscreenUpdate={event => {
            setIsFullscreen(event.fullscreenUpdate === 1);
          }}
        />
        {/* Loading & Buffering overlays */}
        {!isLoaded && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading Video...</Text>
          </View>
        )}
        {isBuffering && (
          <View style={styles.bufferingOverlay}>
            <ActivityIndicator size="large" color="#1db954" />
            <Text style={styles.bufferingText}>Buffering...</Text>
          </View>
        )}
      </View>
      {/* Seekbar Row with All Inline Controls */}
      {isLoaded && (
        <View style={styles.seekContainer}>
          {/* Play/Pause (left) */}
          <TouchableOpacity onPress={handlePlayPause} style={styles.seekControlButton}>
            <MaterialIcons
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={26}
              color={theme.textColor}
            />
          </TouchableOpacity>
          {/* Current time */}
          <Text style={[styles.timeText, { color: theme.textColor }]}>
            {formatTime(positionMillis)}
          </Text>
          {/* Slider */}
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={Math.max((durationMillis ?? 0) / 1000, 1)}
            value={(positionMillis ?? 0) / 1000}
            minimumTrackTintColor="#1db954"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#1db954"
            onSlidingComplete={onSeek}
          />
          {/* Duration */}
          <Text style={[styles.timeText, { color: theme.textColor }]}>
            {formatTime(durationMillis)}
          </Text>
          {/* Volume/Mute */}
          <TouchableOpacity onPress={toggleMute} style={styles.seekControlButton}>
            <MaterialIcons
              name={isMuted ? 'volume-off' : 'volume-up'}
              size={22}
              color={theme.textColor}
            />
          </TouchableOpacity>
          {/* Fullscreen */}
          <TouchableOpacity onPress={toggleFullscreen} style={styles.seekControlButton}>
            <MaterialIcons
              name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
              size={22}
              color={theme.textColor}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Stream Switcher */}
      <View style={styles.streamSwitcher}>
        <Text style={[styles.streamLabel, { color: theme.textColor }]}>Switch Video Stream:</Text>
        {VIDEO_STREAMS.map((stream, index) => (
          <TouchableOpacity
            key={stream.label}
            onPress={() => onSelectStream(index)}
            style={[
              styles.streamButton,
              index === selectedStreamIndex && styles.streamButtonActive,
            ]}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.streamButtonText,
                index === selectedStreamIndex && styles.streamButtonTextActive,
              ]}
            >
              {stream.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  videoOuterContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: SCREEN_WIDTH,
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  loadingText: { marginTop: 10, color: '#fff', fontSize: 13 },
  bufferingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  bufferingText: { color: '#1db954', marginTop: 5, fontSize: 13 },
  seekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  seekControlButton: {
    padding: 6,
    marginHorizontal: 2,
  },
  slider: {
    flex: 1,
    height: 32,
    marginHorizontal: 4,
  },
  timeText: {
    marginHorizontal: 2,
    fontSize: 12,
    minWidth: 38,
    textAlign: 'center',
  },
  streamSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    flexWrap: 'wrap',
  },
  streamLabel: { marginRight: 10, fontWeight: 'bold', fontSize: 12 },
  streamButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 3,
    backgroundColor: '#444',
  },
  streamButtonActive: { backgroundColor: '#1db954' },
  streamButtonText: { color: '#ddd', fontSize: 13 },
  streamButtonTextActive: { color: '#fff', fontWeight: 'bold' },
});

export default VideoPlayerScreen;
