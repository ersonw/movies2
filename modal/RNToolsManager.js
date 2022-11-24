import { NativeModules } from 'react-native';

const { RNToolsManager } = NativeModules;

export function disableIdleTimer() {
  RNToolsManager.disableIdleTimer();
}
export function enableIdleTimer() {
  RNToolsManager.enableIdleTimer();
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
export default {
  disableIdleTimer,
  enableIdleTimer,
  getAppVersion,
  getAppVersionNumber,
  getAppVersionPackage,
  getAppVersionUUID,
};
