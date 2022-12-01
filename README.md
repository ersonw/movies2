# movies2
code-push app add Movies2Ios ios react-native  #iOS版
 code-push app add Movies2Android android react-native #android版

react-native bundle --entry-file index.tsx --platform ios --dev false --bundle-output ios/bundle/main.jsbundle --assets-dest ios/bundle

cd ios && pod deintegrate && pod install && cd ..
react-core-6 signal

code-push release-react Movies2Ios ios -d Production

code-push release-react Movies2Android android -d Production
code-push app rm Movies2Android

yarn add file:../react-native-mmeiqia --force
yarn add git+https://github.com/ersonw/react-native-mmeiqia.git --force
netstat -tunlp |grep 8081
lsof -i:8081
<string>$(MARKETING_VERSION)</string>
"push-ios": "code-push release-react Movies2Ios ios -d Production",
code-push deployment ls  Movies2Ios -k
code-push deployment ls  Movies2Android -k
adb shell am start -n "com.movies2/com.movies2.MainActivity" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER
pod install --repo-update

#LOCAL
<key>CodePushDeploymentKey</key>
<string>0ElbmQqCMcfi1BouBIDXOu6GNiN14ksvOXqog</string>
<key>CodePushServerURL</key>
<string>https://api.obsi.cc</string>
