import { DeviceEventEmitter, NativeModules } from 'react-native';

const { RNToolsManager } = NativeModules;
const listeners = {};
const notificationCallBack = 'RNToolsManagerNotificationCallBack';
const notificationBackgroundCallBack = 'RNToolsManagerNotificationBackgroundCallBack';
export function disableIdleTimer() {
  RNToolsManager.disableIdleTimer();
}
export function enableIdleTimer() {
  RNToolsManager.enableIdleTimer();
}
export function claenNotification() {
  RNToolsManager.claenNotification();
}

export async function getAppVersion(params) {
  return await RNToolsManager.getAppVersion(params);
}
export async function getAppVersionNumber(params) {
  return await RNToolsManager.getAppVersionNumber(params);
}
export function getAppVersionPackage(params) {
  return RNToolsManager.getAppVersionPackage(params);
}
export async function getAppVersionUUID(params) {
  return await RNToolsManager.getAppVersionUUID(params);
}
export function addNotificationListener(cb) {
  RNToolsManager.getNotification(result => {
    cb(result);
  });
  listeners[cb] = DeviceEventEmitter.addListener(notificationCallBack, result => {
    cb(result);
  });
}
export function addNotificationBackgroundListener(cb) {
  RNToolsManager.getNotification(result => {
    cb(result);
  });
  listeners[cb] = DeviceEventEmitter.addListener(notificationBackgroundCallBack, result => {
    cb(result);
  });
}
export function getNotification(cb){
  RNToolsManager.getNotification(result => {
    cb(result);
  });
}
export function removeNotificationListener(cb) {
  if (!listeners[cb]) {
    return;
  }
  listeners[cb].remove();
  listeners[cb] = null;
}
export default {
  getNotification,
  disableIdleTimer,
  enableIdleTimer,
  claenNotification,
  getAppVersion,
  getAppVersionNumber,
  getAppVersionPackage,
  getAppVersionUUID,
  addNotificationListener,
  addNotificationBackgroundListener,
  removeNotificationListener,
};
