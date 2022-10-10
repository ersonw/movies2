# movies2
code-push app add Movies2Ios ios react-native  #iOS版
 code-push app add Movies2Android android react-native #android版

react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/bundle/main.jsbundle --assets-dest ios/bundle

cd ios && pod deintegrate && pod install && cd ..

code-push release-react Movies2Ios ios -d Production

code-push release-react Movies2Android android -d Production
