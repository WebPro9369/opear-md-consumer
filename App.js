import React from "react";
import { AppState, Platform } from "react-native";
import { Provider, observer } from "mobx-react";
import PushNotification from "react-native-push-notification";
import { mainStore } from "./src/store";
import RootContainer from "./src/root-container";
import { TwilioService } from "./src/services";
// import { DEVICE_WIDTH, DEVICE_HEIGHT } from "./src/utils/constants";

// const imgSplash = require("./assets/splash.png");
// const fontFlamaLight = require("./assets/fonts/FlamaLight_Regular.otf");
// const fontFlamaBasic = require("./assets/fonts/Flama_Regular.otf");
// const fontFlamaMedium = require("./assets/fonts/FlamaMedium_Regular.otf");

// const AppSplashWrapper = styled.View`
//   flex: 1;
//   width: ${DEVICE_WIDTH};
//   height: ${DEVICE_HEIGHT};
// `;

// const SplashImage = styled.Image`
//   flex: 1;
//   width: ${DEVICE_WIDTH};
//   height: ${DEVICE_HEIGHT};
// `;

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-undef
    if (__DEV__) {
      import("./ReactotronConfig").then(() =>
        // eslint-disable-next-line no-console
        console.log("Reactotron Configured")
      );
    }
  }

  componentWillMount() {}

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillReceiveProps() {}

  componentWillUpdate() {}

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  // eslint-disable-next-line class-methods-use-this
  onStartAsync() {
    setTimeout(() => {
      mainStore.applicationStore.hideSplash();
    }, 5000);
  }

  // eslint-disable-next-line class-methods-use-this
  onError() {}

  // eslint-disable-next-line class-methods-use-this
  onFinish() {
    // SplashScreen.hide();
  }

  // eslint-disable-next-line class-methods-use-this
  handleAppStateChange(appState) {
    if (appState === "background") {
      console.tron.log("Appstate changed: ", appState);
      // let date = new Date(Date.now() + 10 * 1000);

      TwilioService.sendNotification(
        "Test Notification",
        "This is a notification from my device!!!",
        null,
        "reo"
      );

      TwilioService.sendSMS("SMS Boby", null, "+19085008863");
      TwilioService.makeCall(null, null, "+19085008863");

      // if (Platform.OS === "ios") {
      //   date = date.toISOString();
      // }

      // PushNotification.localNotificationSchedule({
      //   message: "My Notification Message",
      //   date
      // });
    }
  }

  render() {
    // if (mainStore.applicationStore.getSplashShowing() === false) {
    return (
      <Provider store={mainStore}>
        <RootContainer />
      </Provider>
    );
    // }
    // return (
    //   <AppSplashWrapper>
    //     <AppLoading
    //       startAsync={this.onStartAsync}
    //       onError={this.onError}
    //       onFinish={this.onFinish}
    //     />
    //     <SplashImage resizeMode="cover" source={imgSplash} />
    //   </AppSplashWrapper>
    // );
  }
}
