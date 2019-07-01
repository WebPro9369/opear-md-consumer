import React from "react";
import { AppState } from "react-native";
import { Provider, observer } from "mobx-react";
import SplashScreen from "react-native-splash-screen";
import { mainStore } from "./src/store";
import RootContainer from "./src/root-container";

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
    SplashScreen.hide();
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
    }
  }

  render() {
    return (
      <Provider store={mainStore}>
        <RootContainer />
      </Provider>
    );
  }
}
