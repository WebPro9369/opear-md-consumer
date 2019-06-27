/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { getParent } from "@services/opear-api";
import { getAuthentication } from "@services/authentication";
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

    const {
      id,
      apiKey,
      isAuthenticated,
      wasAuthenticated
    } = await getAuthentication();

    if (!isAuthenticated && wasAuthenticated) return navigate("AccountSignIn");
    if (!isAuthenticated) return navigate("AccountSignIn");

    userStore.setAuthentication({ id, apiKey });

    const successHandler = res => {
      userFromResult(res, userStore);
      navigate("Tabs");
    };

    const errorHandler = err => {
      if (err.response.status === 401) {
        navigate("AccountSignIn");
      }
    };

    return getParent(id, { successHandler, errorHandler });
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
