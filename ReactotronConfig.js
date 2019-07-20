import Reactotron from "reactotron-react-native";
import { mst } from "reactotron-mst";
import { mainStore } from "./src/store";
import debugConfig from "./config/debug-config";

if (debugConfig.useReactotron) {
  Reactotron.configure({ host: "0.tcp.ngrok.io", port: 19433 })
    .useReactNative()
    .use(mst())
    .connect();

  console.tron = Reactotron;
  console.tron.trackMstNode(mainStore);
}
