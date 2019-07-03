/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { getParent } from "@services/opear-api";
import { getAuthentication, removeAuthentication } from "@services/authentication";
import { userFromResult } from "@utils";

@inject("store")
@observer
class AuthLoadingScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.tron.log(`Initial url is: ${url}`);
          return this.handleOpenURL(url);
        }
        return this.bootstrapAsync();
      })
      .catch(err => console.tron.log("Error getInitialURL", err));
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = url => {
    this.navigate(url);
  };

  navigate = url => {
    const {
      navigation: { navigate }
    } = this.props;
    const route = url.replace(/.*?:\/\//g, "");
    const routeName = route.split("/")[0];

    if (routeName === "newpwd") {
      navigate("AccountNewPwd", { routeInfo: route });
    }
  };

  bootstrapAsync = async () => {
    const {
      store: { userStore },
      navigation: { navigate }
    } = this.props;
    try {
      const {
        id,
        apiKey,
        isAuthenticated,
        wasAuthenticated
      } = await getAuthentication();

      if (!isAuthenticated && wasAuthenticated) return navigate("Authenticating");
      if (!isAuthenticated) return navigate("Authenticating");

      userStore.setAuthentication({ id, apiKey });

      const successHandler = res => {
        try {
          userFromResult(res, userStore);
          navigate("Tabs");
        } catch {
          removeAuthentication();
          navigate("Authenticating");
        }
      };

      const errorHandler = err => {
        if (err.response.status === 401) {
          navigate("Authenticating");
        }
      };

      return getParent(id, { successHandler, errorHandler });
    } catch {
      removeAuthentication();
      navigate("Authenticating");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#7F5DB0" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
