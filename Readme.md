# React Native WebView and Video Player Expo App

## Overview

This is a React Native Expo application demonstrating a WebView screen and a Video Player screen with HLS video playback, notifications, and React Navigation.

## Features

- Two screens managed by React Navigation stack.
- **WebView Screen**: Loads https://reactnative.dev with embedded WebView.
  - Two buttons to trigger delayed local notifications:
    - Welcome notification after 3 seconds.
    - Video availability notification after 4 seconds.
  - Bonus: Automatically triggers welcome notification on WebView load finish.
- **Video Player Screen**:
  - Plays HLS streams using expo-av Video component.
  - Controls: Play/Pause, Mute/Unmute, Seek +10/-10 seconds, and switch between two streams.
  - Shows loading indicator and error handling.
- Local notifications implemented using Expo Notifications API with permission handling.
- React Context provides notification functions to all screens.
- Responsive and accessible UI with simple clean design.

## Setup & Running

### Prerequisites

- Node.js and npm/yarn installed
- Expo CLI installed globally (`npm install -g expo-cli`)
- Android/iOS simulator or Expo Go app on your physical device

### Installation

