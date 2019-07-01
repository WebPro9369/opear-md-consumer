import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { View, Alert } from "react-native";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  ContainerView,
  HeaderWrapper,
  FormInputWrapper,
  FormWrapper
} from "../../../components/views";

import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { registerAddress } from "@services/opear-api";
import InactiveUserBanner from "@components/banner"

@inject("store")
@observer
class AddAddressScreen extends React.Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore
      }
    } = props;

    this.state = {
      locationName: "",
      street: "",
      city: "",
      zip: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleInputChange = name => value => {
    return this.setState({
      [name]: value
    });
  };

  onSubmit = () => {

    const {
      navigation: { goBack },
      store: {
        userStore
      }
    } = this.props;

    const {
      locationName,
      street,
      city,
      zip
    } = this.state;

    if (!zip) return Alert.alert("Please enter your zip code");

    const dateRegex1 = /^\d\d\d\d\d$/;

    if (!dateRegex1.test(zip)) {
      return Alert.alert(
        "There was an issue",
        "Please enter your 5-digit Zip Code");
    }

    const data =
    {
      address:
      {
        name: locationName,
        street: street,
        city: city,
        zip: zip
      }
    }

    const successHandler = response => {
      const { id, name, street, city, state, zip } = response.data;

      const newAddress = {
        id,
        name,
        street,
        city,
        //state,
        zip
      }

      userStore.addAddress(newAddress);

      goBack();
    };

    registerAddress(data, { successHandler });

  }

  render() {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;
    const { locationName, street, city, zip } = this.state;
    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Add address"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <InactiveUserBanner userIsActive={userStore.active} />
        <KeyboardScrollView padding={0}>
          <FormWrapper padding={32}>
            <FormInputWrapper>
              <FormTextInput
                label="Location Name"
                value={locationName}
                onChangeText={this.handleInputChange("locationName")}
                placeholder="Location Name"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Street"
                value={street}
                onChangeText={this.handleInputChange("street")}
                placeholder="Street"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="City" value={city} placeholder="City"
              onChangeText={this.handleInputChange("city")} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Zip"
                value={zip}
                placeholder="Zip"
                keyboardType="number-pad"
                maxLength={5}
                onChangeText={this.handleInputChange("zip")}
              />
            </FormInputWrapper>
          </FormWrapper>
          <FormInputWrapper style={{ marginBottom: 20 }}>
            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
              <ServiceButton title="Add Address" onPress={this.onSubmit} />
            </View>
          </FormInputWrapper>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default AddAddressScreen;
