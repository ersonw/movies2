package com.movies2;

import com.alibaba.fastjson.JSONObject;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.IllegalViewOperationException;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.ContentResolver;
import android.content.Context;
import android.content.pm.FeatureInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.provider.Settings;

import androidx.core.app.ActivityCompat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class RNToolsManager extends ReactContextBaseJavaModule {
    private static ReactApplicationContext context;
    private final ContentResolver contentResolver;
    private final PackageManager packageManager;
    /** Substitute for missing values. */
    private static final String[] EMPTY_STRING_LIST = new String[] {};

    public RNToolsManager(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        this.contentResolver = reactContext.getContentResolver();
        this.packageManager = getReactApplicationContext().getPackageManager();
    }

    public String getMacAddress() {

        String macAddress = null;
        WifiManager wifiManager =
                (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = (null == wifiManager ? null : wifiManager.getConnectionInfo());

        if (!wifiManager.isWifiEnabled()) {
            //必须先打开，才能获取到MAC地址
            wifiManager.setWifiEnabled(true);
            wifiManager.setWifiEnabled(false);
        }
        if (null != info) {
            if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                ActivityCompat.requestPermissions(context.getCurrentActivity(), new String[]{Manifest.permission.ACCESS_FINE_LOCATION},1);
                return getMacAddress();
            }
            macAddress = info.getMacAddress().replaceAll(":","");
        }
        return macAddress;
    }
    //    重写getName方法声明Module类名称,在RN调用时用到
    @Override
    public String getName() {
        return "RNToolsManager";
    }

    //    声明的方法，外界调用
    @ReactMethod
    public void getAppVersion(Callback successCallback) {
        try {
            PackageInfo info = getPackageInfo();
            if (info != null) {
                successCallback.invoke(info.versionName);
            } else {
                successCallback.invoke("");
            }
        } catch (IllegalViewOperationException e) {

        }
    }
    @ReactMethod
    public void getAppVersionNumber(Callback successCallback) {
        try {
            PackageInfo info = getPackageInfo();
            if (info != null) {
                successCallback.invoke(info.versionCode);
            } else {
                successCallback.invoke("");
            }
        } catch (IllegalViewOperationException e) {

        }
    }
    @SuppressLint("HardwareIds")
    @ReactMethod
    public void getAppVersionUUID(Callback successCallback) {
        successCallback.invoke(getAndroidId());
//        successCallback.invoke(getMacAddress());
    }
    @ReactMethod
    public void getAppVersionPackage(Callback successCallback) {
        WritableNativeMap build = new WritableNativeMap();
        build.putString("board", Build.BOARD);
        build.putString("bootloader", Build.BOOTLOADER);
        build.putString("brand", Build.BRAND);
        build.putString("device", Build.DEVICE);
        build.putString("display", Build.DISPLAY);
        build.putString("fingerprint", Build.FINGERPRINT);
        build.putString("hardware", Build.HARDWARE);
        build.putString("host", Build.HOST);
        build.putString("id", Build.ID);
        build.putString("manufacturer", Build.MANUFACTURER);
        build.putString("model", Build.MODEL);
        build.putString("product", Build.PRODUCT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            WritableNativeArray array = new WritableNativeArray();
            for (String s: Build.SUPPORTED_32_BIT_ABIS) {
                array.pushString(s);
            }
            build.putArray("supported32BitAbis", array);
            array = new WritableNativeArray();
            for (String s: Build.SUPPORTED_64_BIT_ABIS) {
                array.pushString(s);
            }
            build.putArray("supported64BitAbis", array);
            array = new WritableNativeArray();
            for (String s: Build.SUPPORTED_ABIS) {
                array.pushString(s);
            }
            build.putArray("supportedAbis", array);
        } else {
            WritableNativeArray array = new WritableNativeArray();
            for (String s: EMPTY_STRING_LIST) {
                array.pushString(s);
            }
            build.putArray("supported32BitAbis", array);
            build.putArray("supported64BitAbis", array);
            build.putArray("supportedAbis", array);
        }
        build.putString("tags", Build.TAGS);
        build.putString("type", Build.TYPE);
        build.putBoolean("isPhysicalDevice", !isEmulator());
        build.putString("androidId", getAndroidId());
        WritableNativeArray array = new WritableNativeArray();
        for (String s: getSystemFeatures()) {
            array.pushString(s);
        }
        build.putArray("systemFeatures", array);

        WritableNativeMap version = new  WritableNativeMap();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            version.putString("baseOS", Build.VERSION.BASE_OS);
            version.putInt("previewSdkInt", Build.VERSION.PREVIEW_SDK_INT);
            version.putString("securityPatch", Build.VERSION.SECURITY_PATCH);
        }
        version.putString("codename", Build.VERSION.CODENAME);
        version.putString("incremental", Build.VERSION.INCREMENTAL);
        version.putString("release", Build.VERSION.RELEASE);
        version.putInt("sdkInt", Build.VERSION.SDK_INT);
        build.putMap("version", version);
        successCallback.invoke(build);
    }
    private String[] getSystemFeatures() {
        FeatureInfo[] featureInfos = packageManager.getSystemAvailableFeatures();
        if (featureInfos == null) {
            return EMPTY_STRING_LIST;
        }
        String[] features = new String[featureInfos.length];
        for (int i = 0; i < featureInfos.length; i++) {
            features[i] = featureInfos[i].name;
        }
        return features;
    }
    @SuppressLint("HardwareIds")
    private String getAndroidId() {
        return Settings.Secure.getString(contentResolver, Settings.Secure.ANDROID_ID);
    }
    private boolean isEmulator() {
        return (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.HARDWARE.contains("goldfish")
                || Build.HARDWARE.contains("ranchu")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || Build.PRODUCT.contains("sdk_google")
                || Build.PRODUCT.contains("google_sdk")
                || Build.PRODUCT.contains("sdk")
                || Build.PRODUCT.contains("sdk_x86")
                || Build.PRODUCT.contains("vbox86p")
                || Build.PRODUCT.contains("emulator")
                || Build.PRODUCT.contains("simulator");
    }
    //    获取 APP 信息
    private PackageInfo getPackageInfo() {
        PackageManager manager = getReactApplicationContext().getPackageManager();
        PackageInfo info = null;
        try {
            info = manager.getPackageInfo(getReactApplicationContext().getPackageName(), 0);
            return info;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

            return info;
        }
    }
}
