package com.opear;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.hoxfon.react.RNTwilioVoice.TwilioVoicePackage;
import com.oblador.keychain.KeychainPackage;
import com.gettipsi.stripe.StripeReactPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.cardio.RNCardIOPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new TwilioVoicePackage(),
            new KeychainPackage(),
            new StripeReactPackage(),
            new FingerprintAuthPackage(),
            new ReactNativePushNotificationPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new MapsPackage(),
            new RNCardIOPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
