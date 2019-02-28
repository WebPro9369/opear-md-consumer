import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userAuthenticated = false;
    this.props.navigation.navigate(userAuthenticated ? "Tabs" : "Onboarding");
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#7F5DB0" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
