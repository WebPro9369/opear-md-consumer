/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
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

  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

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
    if (!isAuthenticated) return navigate("Onboarding");

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
