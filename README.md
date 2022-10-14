# movies2
code-push app add Movies2Ios ios react-native  #iOS版
 code-push app add Movies2Android android react-native #android版

react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/bundle/main.jsbundle --assets-dest ios/bundle

cd ios && pod deintegrate && pod install && cd ..
react-core-6 signal

code-push release-react Movies2Ios ios -d Production

code-push release-react Movies2Android android -d Production

"react-native-webrtc": "^106.0.0-beta.3"
"react-native-webrtc": "git+https://github.com/ersonw/react-native-webrtc.git"
 "react-native-webrtc": "git+https://github.com/ant-media/WebRTC-React-Native-SDK.git"
"react-native-ffmpeg": "^0.5.2",
