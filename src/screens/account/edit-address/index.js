/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React from "react";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import InactiveUserBanner from "@components/banner";
import { updateAddress, registerAddress } from "@services/opear-api";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { FlexView, FormWrapper } from "../../../components/views";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { GoogleMapsService } from "@services";

@inject("store")
@observer
class EditAddressScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore: { addresses }
      },
      navigation: {
        state: { params }
      }
    } = props;

    const address = addresses.length ? addresses[addresses.length - 1] : {};
    const { id, name, street, city, zip, state } = address;

    let isUpdating = true;

    if(!street && !city && !zip) {
      isUpdating = false;
    }

    this.state = {
      id,
      name,
      street,
      city,
      state,
      zip,
      isUpdating
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateAddressHandler = this.updateAddressHandler.bind(this);
  }

  handleInputChange = name => value => {
    return this.setState({
      [name]: value
    });
  };

  updateAddressHandler = () => {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;

    const { id, street, city, zip, name, state, isUpdating } = this.state;
    const data =
      {
        name,
        street,
        city,
        zip,
        state
      };

    const successHandler = res => {
      console.tron.log("update address res: ", res.data);
      const { id, name, street, city, state, zip } = res.data;
      const newAddress = {
        id,
        name: name || "",
        street: street || "",
        city: city || "",
        state: state || "",
        zip: zip || "",
        state: state || ""
      };

      userStore.address
        .setName(name || "")
        .setStreet(street || "")
        .setCity(city || "")
        .setZipCode(zip || "")
        .setState(state || "");

      console.tron.log("addresses: ", newAddress);

      userStore.setAddress(newAddress);

      goBack();
    };

    if(isUpdating){
      updateAddress(id, data, { successHandler });
    } else {
      registerAddress(data, { successHandler });
    }

  };

  onSubmit = () => {
    const { id, street, city, zip, name, state } = this.state;

    const address = street + ", " + city + ", " + state + " " + zip

    GoogleMapsService.getGeo(address,
      innerRes => {
        const { data } = innerRes;

        if(data.status == "ZERO_RESULTS") {
          return Alert.alert("Unable to verify address","We couldn't validate your address. Please try again, or contact support for assistance.");
        }

        this.updateAddressHandler();

      },
      () => {
        return Alert.alert("Unable to reach address services", "Please contact support for assistance.");
      }
    );
  };

  render() {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;
    const { street, city, zip, name, state, isUpdating } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <DeeplinkHandler navigation={this.props.navigation}/>
        <NavHeader
          title={!isUpdating ? "Add Address" : "Edit Address"}
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <InactiveUserBanner userIsActive={userStore.active} />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Address"
              value={street}
              onChangeText={this.handleInputChange("street")}
              // rightIcon={ <FontAwesome name="map-marker" size={30} color={LIGHTGREEN} /> }
            />
          </FormInputView>
          <FormInputView>
            <FlexView>
              <FormTextInput
                label="City"
                wrapperStyle={{
                  marginRight: 10,
                  flex: 1
                }}
                value={city}
                onChangeText={this.handleInputChange("city")}
              />
              <FormTextInput
                label="Zip"
                value={zip}
                wrapperStyle={{
                  flex: 1
                }}
                onChangeText={this.handleInputChange("zip")}
              />
            </FlexView>
          </FormInputView>
          <FormInputView>
            <FormTextInput
              label="State"
              value={state}
              onChangeText={this.handleInputChange("state")}
            />
          </FormInputView>
          <FormInputView>
            <FormTextInput
              label="Location Name"
              value={name}
              onChangeText={this.handleInputChange("name")}
            />
          </FormInputView>
          <ServiceButton title={!isUpdating ? "Add Address" : "Update Address"} onPress={this.onSubmit} />
        </FormWrapper>
      </KeyboardAvoidingView>
    );
  }
}

export default EditAddressScreen;
