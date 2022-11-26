#import "AppDelegate.h"
#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTAppSetupUtils.h>
#import <CodePush/CodePush.h>
#import <UserNotifications/UserNotifications.h>
#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>
#import <react/config/ReactNativeConfig.h>


static NSString *const kRNConcurrentRoot = @"concurrentRoot";
@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTAppSetupPrepareApp(application);
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  
#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif
  
  NSDictionary *initProps = [self prepareInitialProps];
  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"movies2", initProps);
  
  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }
//  NSDictionary *payload = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
//  if (payload) {
//    NSLog(@"payload %@", [payload description]);
//  }
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [self registerRemoteNotifications: application];
  return YES;
}
- (void)registerRemoteNotifications:(UIApplication *)application {
    
  if (@available(iOS 10.0, *)) { // iOS10 以上
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert + UNAuthorizationOptionSound) completionHandler:^(BOOL granted, NSError * _Nullable error) {
      if(!granted){
        [self registerRemoteNotifications: application];
        return;
      }
      //注册远端消息通知获取device token
      [application registerForRemoteNotifications];
    }];
  } else {// iOS8.0 以上
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  }
}
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_8_0
/** 远程通知注册成功委托 */
- (void)application:(UIApplication *)application
    didRegisterUserNotificationSettings:(UIUserNotificationSettings *)settings
{
    [application registerForRemoteNotifications];
}
#endif
- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSUInteger dataLength = deviceToken.length;
  if (dataLength == 0) {
    return;
  }
  const unsigned char *dataBuffer = (const unsigned char *)deviceToken.bytes;
  NSMutableString *hexTokenString  = [NSMutableString stringWithCapacity:(dataLength * 2)];
  for (int i = 0; i < dataLength; ++i) {
    [hexTokenString appendFormat:@"%02x", dataBuffer[i]];
  }
//  NSLog(@"push DeviceToken token:%@", hexTokenString);
  [RNToolsManager setDeviceToken:hexTokenString];
}

- (void)application:(UIApplication *)application
    didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    NSLog(@"Failed to register: %@", error);
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    completionHandler(UIBackgroundFetchResultNewData);
    if (application.applicationState == UIApplicationStateActive) {
      [RNToolsManager setNotificationMessage:userInfo];
//        NSLog(@"前台收到推送 userInfo = %@", userInfo);
    } else {
      [RNToolsManager setNotificationMessageBackground:userInfo];
//        NSLog(@"后台收到推送 userInfo = %@", userInfo);
    }
//   [self handlerNotification:userInfo];
}
- (void)handlerNotification:(NSDictionary *)userInfo{
////  --------注册通知
//      UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//  //--------获取权限（角标，通知，音效）
//      [center requestAuthorizationWithOptions:UNAuthorizationOptionBadge|UNAuthorizationOptionAlert|UNAuthorizationOptionSound
//                            completionHandler:^(BOOL granted, NSError * _Nullable error) {
//          if (granted) {
//              NSLog(@"seccess");
//          }
//      }];
//  NSDictionary *alert = [[userInfo valueForKey:@"aps"] valueForKey:@"alert"];
//  UNMutableNotificationContent *content = [UNMutableNotificationContent new];
//  content.title = [NSString stringWithFormat:@"%@",[alert valueForKey:@"title"]];
//  content.subtitle = [NSString stringWithFormat:@"%@",[alert valueForKey:@"subtitle"]];
//  content.body = [NSString stringWithFormat:@"%@",[alert valueForKey:@"body"]];
//  long long scannedNumber;
//  NSScanner *scanner = [NSScanner scannerWithString:[NSString stringWithFormat:@"%@",[alert valueForKey:@"badge"]]];
//  [scanner scanLongLong:&scannedNumber];
//  content.badge = [NSNumber numberWithLongLong: scannedNumber];
//  NSLog(@"userInfo: %@",userInfo);
//  content.sound = [UNNotificationSound soundNamed:@"%@"];
  //--------设置触发机制
//  UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:60 repeats:YES];
//  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:@"REQUEST" content:content trigger:trigger];
////  //---------添加通知到通知中心
//  [[UNUserNotificationCenter currentNotificationCenter] addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
//          NSLog(@"error : %@",error);
//      }];
}
- (NSString *)modeString
{
#if DEBUG
    return @"Development (sandbox)";
#else
    return @"Production";
#endif
}
/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feture is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  // Switch this bool to turn on and off the concurrent root
  return true;
}

- (NSDictionary *)prepareInitialProps
{
  NSMutableDictionary *initProps = [NSMutableDictionary new];

#ifdef RCT_NEW_ARCH_ENABLED
  initProps[kRNConcurrentRoot] = @([self concurrentRootEnabled]);
#endif

  return initProps;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
//  [RCTBundleURLProvider sharedSettings].jsLocation=@"192.168.1.11";
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif
//iOS9以上，会优先走这个方法
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
 //openURL1
 [InvitationSDK handLinkURL:url];
 return YES;
}

//适用目前所有iOS版本
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{
 //openURL2
 [InvitationSDK handLinkURL:url];
 return YES;
}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler{
    //处理通过一键唤起App时传递的数据
    [InvitationSDK continueUserActivity:userActivity];
    //其他第三方回调；
     return YES;
}
@end
