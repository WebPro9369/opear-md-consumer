/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { getParent } from "@services/opear-api";
import {
  getAuthentication,
  removeAuthentication,
  requestTouchID,
  hasCachedAuthentication
} from "@services/authentication";
import { userFromResult } from "@utils";
import { SUBSCRIPTIONS_ACTIVE_START_DATE } from "@utils/constants";

@inject("store")
@observer
class AuthLoadingScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  componentDidMount() {
    return this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const {
      store: { applicationStore, userStore },
      navigation: { navigate }
    } = this.props;

    applicationStore.setSubscriptionsActive(
      new Date() > SUBSCRIPTIONS_ACTIVE_START_DATE
    );

    try {
      const {
        id,
        apiKey,
        isAuthenticated,
        wasAuthenticated
      } = await getAuthentication();

      if (!isAuthenticated && wasAuthenticated)
        return navigate("Authenticating");
      if (!isAuthenticated) return navigate("Authenticating");

      const onFail = (error) => {
        console.tron.log("TouchID error", error);
        removeAuthentication();
        navigate("Authenticating");
      };

      if (!hasCachedAuthentication()) requestTouchID({ onFail });

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
