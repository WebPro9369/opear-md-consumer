import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { getParent, getChildren, getAddresses } from "@services/opear-api";
import { getAge } from "@utils";

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
    const userAuthenticated = false;

    const successHandler = res => {
       const {
         name,
         email,
         zip,
         phone,
         addresses
       } = res.data;

       userStore
         .setName(name)
         .setEmail(email)
         .setZip(zip)
         .setPhone(phone)
         .setAddresses(addresses);

         navigate("Tabs");
     };


     getParent(userStore.id, { successHandler });

    //navigate(userAuthenticated ? "Tabs" : "Onboarding");
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
