#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
#import "WXApi.h"
#include <netdb.h>
@interface RNToolsManager : NSObject <RCTBridgeModule>
//+(instancetype _Nullable)defaultManager;
+ (void) setDeviceToken:(NSString*_Nullable) token;
+ (void) setNotificationMessage:(NSDictionary *_Nullable)info;
+ (void) setNotificationMessageBackground:(NSDictionary *_Nullable)info;
@end
