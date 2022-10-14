#import "RNToolsManager.h"
@implementation RNToolsManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RNToolsManager);
//  对外提供调用方法,Callback
RCT_EXPORT_METHOD(getAppVersion:(RCTResponseSenderBlock)callback)
{
  NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];//获取项目版本号
  callback(@[[NSString stringWithFormat:@"%@",version]]);
}

RCT_EXPORT_METHOD(getAppVersionNumber:(RCTResponseSenderBlock)callback)
{
  NSString *buildNumber = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"];//获取项目版本号
  callback(@[[NSString stringWithFormat:@"%@",buildNumber]]);
}

RCT_EXPORT_METHOD(getAppVersionPackage:(RCTResponseSenderBlock)callback)
{
  NSString *bundleIdentifier = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleIdentifier"];//获取项目版本号
  callback(@[[NSString stringWithFormat:@"%@",bundleIdentifier]]);
}
RCT_EXPORT_METHOD(getAppVersionUUID:(RCTResponseSenderBlock)callback)
{
  NSString *bundleIdentifier = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleIdentifier"];//获取项目版本号
  callback(@[[NSString stringWithFormat:@"%@",bundleIdentifier]]);
}
@end
