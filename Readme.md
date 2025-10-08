# 🎬 React Native Expo WebView & Video Player App

A **modern, robust, and educational** React Native project demonstrating an end-to-end, real-world app architecture with **WebView integration**, a feature-rich **custom video player**, local notifications, dark/light theming, and best practices with TypeScript and Expo SDK 53+.

---

## 🌟 Project Overview

This project serves as a comprehensive reference and learning asset for developers:
- It demonstrates how to build a multi-screen mobile app with **professional video streaming**, **web browsing**, app-wide **notifications**, and adaptable user interface.
- The **app architecture and code** are suited for use in production projects as well as portfolio works.
- All major features are tested and ready for deployment on both Android and iOS (using Expo Go and EAS Build).

---

## 🚀 Full Feature List

### **Navigation**
- Stack navigation for managing multiple screens (WebView and Video Player)
- Smooth, modern screen transitions

### **WebView Screen**
- Embedded browser using React Native WebView component
- Pull-to-refresh gesture on the web content
- Default page: [reactnative.dev](https://reactnative.dev) (changeable for other URLs)
- Notification actions:
  - Manual "Show Welcome Notification" button (fires after 3s)
  - Manual "Show Video Available" notification (fires after 4s)
  - Bonus: **Automatically fires welcome notification when page finishes loading**

### **Video Player Screen**
- **Advanced HLS streaming** using Expo AV (to be migrated to expo-video)
- **Multiple video streams**: Easily switch between sources (examples: Mux, Big Buck Bunny)
- **Professional, single-row control bar** including:
  - Play/Pause (toggle and responsive), also toggle by tapping video area
  - Current time and remaining time display
  - Seek slider with drag-to-seek
  - Volume/Mute toggle
  - Fullscreen toggle (with native fullscreen on mobile)
  - Stream switching buttons (switches instantly)
- **Loading and buffering indicators** with spinner overlay
- Error handling with user feedback for network or playback issues
- **Modern, responsive UI design**: Icons and controls visible in all themes and adapt to screen size

### **Theming and Responsiveness**
- Automatic **dark and light theme** support matching device settings
- Layout adapts for phones and tablets, portrait and landscape

### **Notifications**
- Uses Expo Notifications API for **local notifications** (fully compatible with Expo Go)
- Permission management (asks user for notification permissions)
- Notifications can play sounds if triggered

### **State Management and Best Practices**
- Uses React Context for handling notification logic (clean, scalable)
- Modular separation of screens, components, and utilities
- Full TypeScript typing for safety and maintainability

### **Build, Testing, and Distribution**
- "expo start" for local dev and device testing
- EAS Build for generating APK (android) or AAB for Google Play
- Doctor and automated checks for early error detection

---

## 🛠️ Tech Stack

- **React Native**
- **Expo SDK 53+**
- **TypeScript**
- **@expo/vector-icons** (MaterialIcons)
- **expo-av** (video/audio)
- **expo-notifications**
- **react-navigation**
- **@react-native-community/slider**

---

## 🗂️ Folder Structure

assets/
splash.png
notification-icon.png
screenshots/
video-player-dark.png
webview-light.png
src/
screens/
VideoPlayerScreen.tsx
WebViewScreen.tsx
components/
utils/
app.json
eas.json
package.json
README.md

text

---

## 📲 Getting Started

1. **Clone the repo**
git clone https://github.com/saurabhmadrap07/House_of_Edtech_Assignment.git
cd House_of_Edtech_Assignment

text

2. **Install dependencies**
npm install

or
yarn

text

3. **Check/Add Assets**
- Ensure `assets/splash.png` and `assets/notification-icon.png` are present

4. **Start the Expo dev server**
npx expo start

text
- Scan QR with Expo Go app or launch on emulator

---

## 🏗️ Building APK (Android)

1. **Install EAS CLI**
npm install -g eas-cli

text

2. **Configure**
eas build:configure

text

3. **Build APK**
eas build -p android --profile preview

text
(AAB for Play Store upload: `eas build -p android --profile production`)

4. **Download APK from Expo dashboard**

---

## 🧑‍💻 How the App Works

- **Navigation**: Switch between WebView and Video via navigation stack.
- **WebView Screen**: Interact with embedded browser, fire notifications via buttons.
- **Video Player Screen**:
- Tap on video to play/pause (video area is interactive)
- All controls (play/pause, seek, time, mute, fullscreen, stream switch) shown in one row under video
- Responsive across all screen sizes and orientations

---

## 🧰 Troubleshooting & Configuration

- If you see build errors like missing splash or notification icons, place images with those names in `assets/`.
- When installing new native dependencies, always run `expo doctor` and check for compatibility.
- Make sure all required API permissions are granted for notifications and audio/video.

---

## 🤝 Contributing

- Issues and pull requests are welcome!
- Please create a feature branch and submit a clear PR.

---

## 📝 License

MIT

---

## 👤 Author

**[Saurabh Madrap](https://github.com/saurabhmadrap07)**

---

**This project is a demonstration of how to build beautiful, real-world-ready app experiences in Expo/React Native! 🚀**
