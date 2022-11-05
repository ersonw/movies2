#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#include <netdb.h>
@interface RNToolsManager : NSObject <RCTBridgeModule>
//+(instancetype _Nullable)defaultManager;
+ (void) setDeviceToken:(NSString*_Nullable) token;
@end
