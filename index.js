/**
 * @format
 */

import { AppRegistry, PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";
import App from "./App";
import { name as appName } from "./app.json";
import { TwilioService } from "./src/services";
import { mainStore } from "./src/store";

// Disable yellow warning boxes
console.disableYellowBox = true;

PushNotification.configure({
  onRegister({ token }) {
    if (console.tron) console.tron.log("Push notification device token: ", token);

    const { userStore } = mainStore;
    userStore.setNotificationToken(token);
    TwilioService.bindDevice(token);
  },
  onNotification(notification) {
    if (console.tron) console.tron.log("NOTIFICATION:", notification);
  },
  senderID: "95891248163"
});

AppRegistry.registerComponent(appName, () => App);
