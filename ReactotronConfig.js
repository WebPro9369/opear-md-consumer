import Reactotron from "reactotron-react-native";
import debugConfig from "./config/debug-config";

if (debugConfig.useReactotron) {
  Reactotron.configure({ host: "localhost" })
    .useReactNative()
    .connect();

  console.tron = Reactotron;
}
