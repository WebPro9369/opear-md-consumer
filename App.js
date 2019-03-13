import React from "react";
import styled from "styled-components/native";
import { AppLoading, SplashScreen, Font } from "expo";
import { Provider, observer } from "mobx-react";

import ApplicationState from "./src/store/app";
import RootContainer from "./src/root-container";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "./src/utils/constants";

const imgSplash = require("./assets/splash.png");

const fontFlamaLight = require("./assets/fonts/FlamaLight_Regular.otf");
const fontFlamaBasic = require("./assets/fonts/Flama_Regular.otf");
const fontFlamaMedium = require("./assets/fonts/FlamaMedium_Regular.otf");

const AppSplashWrapper = styled.View`
  flex: 1;
  width: ${DEVICE_WIDTH};
  height: ${DEVICE_HEIGHT};
`;

const SplashImage = styled.Image`
  flex: 1;
  width: ${DEVICE_WIDTH};
  height: ${DEVICE_HEIGHT};
`;

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
    Font.loadAsync({
      "Flama-Light": fontFlamaLight,
      "Flama-Basic": fontFlamaBasic,
      "Flama-Medium": fontFlamaMedium
    });
  }

  componentWillReceiveProps() {}

  componentWillUpdate() {}

  componentWillUnmount() {}

  static onStartAsync() {
    setTimeout(() => {
      ApplicationState.AppGlobalState.SplashShowing = false;
    }, 5000);
  }

  static onError() {}

  static onFinish() {
    SplashScreen.hide();
  }

  render() {
    if (ApplicationState.AppGlobalState.SplashShowing === false) {
      return (
        <Provider ApplicationState={ApplicationState}>
          <RootContainer />
        </Provider>
      );
    }
    return (
      <AppSplashWrapper>
        <AppLoading
          startAsync={this.onStartAsync}
          onError={this.onError}
          onFinish={this.onFinish}
        />
        <SplashImage resizeMode="cover" source={imgSplash} />
      </AppSplashWrapper>
    );
  }
}
