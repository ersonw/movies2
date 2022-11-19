#import "RNToolsManager.h"
#import <sys/utsname.h>

@implementation RNToolsManager
@synthesize bridge = _bridge;
static NSString *deviceToken;
RCT_EXPORT_MODULE(RNToolsManager);
+ (void) setDeviceToken:(NSString*) token {
  deviceToken = token;
}
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
  UIDevice* device = [UIDevice currentDevice];
  struct utsname un;
  uname(&un);
  NSArray *array = [@{
    @"deviceToken" : deviceToken,
    @"name" : [device name],
    @"systemName" : [device systemName],
    @"systemVersion" : [device systemVersion],
    @"model" : [device model],
    @"localizedModel" : [device localizedModel],
    @"identifierForVendor" : [[device identifierForVendor] UUIDString],
    @"isPhysicalDevice" : [self isDevicePhysical],
    @"utsname" : @{
      @"sysname" : @(un.sysname),
      @"nodename" : @(un.nodename),
      @"release" : @(un.release),
      @"version" : @(un.version),
      @"machine" : @(un.machine),
    }
  } copy];
  callback(@[array]);
}
RCT_EXPORT_METHOD(getAppVersionUUID:(RCTResponseSenderBlock)callback)
{
  UIDevice* device = [UIDevice currentDevice];
  NSString *bundleIdentifier = [[device identifierForVendor] UUIDString];
  callback(@[[NSString stringWithFormat:@"%@",bundleIdentifier]]);
//  NSString *bundleIdentifier = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleIdentifier"];//获取项目版本号
//  callback(@[[NSString stringWithFormat:@"%@",bundleIdentifier]]);
}

RCT_EXPORT_METHOD(initMeiQia:(RCTResponseSenderBlock)callback)
{
  UIDevice* device = [UIDevice currentDevice];
  NSString *bundleIdentifier = [[device identifierForVendor] UUIDString];
  callback(@[[NSString stringWithFormat:@"%@",bundleIdentifier]]);
}
- (NSString*)isDevicePhysical {
#if TARGET_OS_SIMULATOR
  NSString* isPhysicalDevice = @"false";
#else
  NSString* isPhysicalDevice = @"true";
#endif

  return isPhysicalDevice;
}
- (NSArray *)arrayWithdictionary:(NSDictionary *)dictionary {
    if (dictionary == nil) {
        return nil;
    }
  NSString *jsonString = [self jsonWithDictionary:dictionary];
  return @[[self arrayWithJson:jsonString]];
}
- (NSDictionary *)dictionaryWithArray:(NSArray *)array {
  if (array == nil) {
      return nil;
  }
  NSString *jsonString = [self jsonWithArray:array];
  return [self dictionaryWithJson:jsonString];
}
- (NSArray *)arrayWithJson:(NSString *)jsonString {
    if (jsonString == nil) {
        return nil;
    }
    
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
  NSArray *dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
    if(err) {
        NSLog(@"json解析失败：%@",err);
        return nil;
    }
    return dic;
}
- (NSString*)jsonWithArray:(NSArray *)dic
{
    NSString *jsonString = nil;
    if ([NSJSONSerialization isValidJSONObject:dic])
    {
        NSError *error;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];
        jsonString =[[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        if (error) {
            NSLog(@"Error:%@" , error);
        }
    }
    return jsonString;
}
- (NSDictionary *)dictionaryWithJson:(NSString *)jsonString {
    if (jsonString == nil) {
        return nil;
    }
    
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
    if(err) {
        NSLog(@"json解析失败：%@",err);
        return nil;
    }
    return dic;
}
- (NSString*)jsonWithDictionary:(NSDictionary *)dic
{
    NSString *jsonString = nil;
    if ([NSJSONSerialization isValidJSONObject:dic])
    {
        NSError *error;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];
        jsonString =[[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        if (error) {
            NSLog(@"Error:%@" , error);
        }
    }
    return jsonString;
}
@end


