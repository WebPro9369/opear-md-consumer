import React from "react";
import { StatusBar } from "react-native";
import { NavigationActions } from "react-navigation";
import { ThemeProvider } from "styled-components";
import { inject, observer, PropTypes } from "mobx-react";
import UserInactivity from "react-native-user-inactivity";
import TouchID from "react-native-touch-id";
import styled from "styled-components/native";
import stripe from "tipsi-stripe";
import AppNavigationContainer from "./navigation/main.navigator";
import { colors } from "./utils/constants";
import { removeAuthentication } from "./services/authentication";

stripe.setOptions({
  publishableKey: "pk_test_icZtWoaCwbJCemzBqBdTV6Cb", // test key
  // publishableKey: "pk_live_2YK7fEg9qnlrawyTukjyVUs9", // live key
  androidPayMode: "production" // "production"
});

const Root = styled.View`
  flex: 1;
  background-color: ${props => props.theme.WHITE};
`;

@inject("store")
@observer
class RootContainer extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      firstTime: true,
      active: true,
      authenticated: true
    };
  }

  componentDidMount() {
    const {
      store: {
        userStore: { apiKey }
      }
    } = this.props;
    if (apiKey) {
      this.showTouchId(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      store: {
        userStore: { apiKey }
      }
    } = this.props;
    const {
      store: { userStore: nextUserStore }
    } = nextProps;

    if (apiKey !== nextUserStore.apiKey && nextUserStore.apiKey) {
      this.showTouchId(false);
    }
  }

  showTouchId = active => {
    const { firstTime } = this.state;

    if (firstTime || active) {
      this.setState({
        firstTime: false
      });
      const navRef = this.navigatorRef;
      TouchID.isSupported()
        .then(biometryType => {
          console.tron.log("BiometryType: ", biometryType);
          TouchID.authenticate()
            .then(() => {})
            .catch(error => {
              console.tron.log(error);
              removeAuthentication();
              const routeName = "Authenticating";
              navRef.dispatch(
                NavigationActions.navigate({
                  routeName
                })
              );
            });
        })
        .catch(() => {});
    }
  };

  onAction = value => {
    const {
      store: {
        userStore: { apiKey }
      }
    } = this.props;
    const { active } = this.state;

    this.setState({
      active: value
    });

    if (active || !apiKey) {
      return false;
    }

    this.showTouchId(value);

    return true;
  };

  render() {
    return (
      <UserInactivity
        timeForInactivity={15 * 60 * 1000}
        onAction={this.onAction}
      >
        <ThemeProvider theme={colors}>
          <Root>
            <StatusBar />
            <AppNavigationContainer
              ref={navigatorRef => {
                this.navigatorRef = navigatorRef;
              }}
            />
          </Root>
        </ThemeProvider>
      </UserInactivity>
    );
  }
}

export default RootContainer;
