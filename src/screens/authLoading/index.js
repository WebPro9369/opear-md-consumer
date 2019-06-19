import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { getParent, getChildren, getAddresses } from "@services/opear-api";
import { getAge } from "@utils";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    const userAuthenticated = false;

    /* for when authentication is available

    const successHandler = res => {
      const {
        name,
        email,
        zip,
        phone,
        password
      } = res.data;

      userStore
        .setName(name)
        .setEmail(email)
        .setZip(zip)
        .setPhone(phone)
        .setPassword(password);

        const childSuccessHandler = res => {

          var childAdjustedArray = res.data.map(row => [
          {
            id: row.id,
            name: row.first_name+" "+row.last_name,
            age: getAge(row.dob)
          }]);

          userStore.setChildren(childAdjustedArray);

          const addressSuccessHandler = res => {
            var addressAdjustedArray = res.data.map(row => [
            {
              id: row.id,
              name: row.name,
              address: row.address
            }]);

            userStore.setVisitAddresses(addressAdjustedArray);
          };

          getAddresses( { addressSuccessHandler });

        };

        getChildren( { childSuccessHandler });
    };


    getParent(id, { successHandler });

    */

    navigate(userAuthenticated ? "Tabs" : "Onboarding");
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
