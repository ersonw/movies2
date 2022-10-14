package com.movies2;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

import androidx.core.app.ActivityCompat;

import java.util.ArrayList;
import java.util.Arrays;

public class RNToolsManager extends ReactContextBaseJavaModule {
    private static ReactApplicationContext context;

    public RNToolsManager(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;

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
    @ReactMethod
    public void getAppVersionUUID(Callback successCallback) {
        successCallback.invoke(getMacAddress());
    }
    @ReactMethod
    public void getAppVersionPackage(Callback successCallback) {
        try {
            PackageInfo info = getPackageInfo();
            if (info != null) {
                successCallback.invoke(info.packageName);
            } else {
                successCallback.invoke("");
            }
        } catch (IllegalViewOperationException e) {

        }
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
