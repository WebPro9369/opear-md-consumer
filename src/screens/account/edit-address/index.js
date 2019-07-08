/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import InactiveUserBanner from "@components/banner";
import { updateAddress } from "@services/opear-api";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { FlexView, FormWrapper } from "../../../components/views";

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
      }
    } = props;

    const address = addresses.length ? addresses[addresses.length - 1] : {};
    const { id, name, street, city, zip, state } = address;

    this.state = {
      id,
      name,
      street,
      city,
      state,
      zip
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
      store: { userStore }
    } = this.props;

    const { id, street, city, zip, name, state } = this.state;
    const data =
      // parent: {
      //   address: [
      {
        name,
        street,
        city,
        zip,
        state
        // }
        //   ]
        // }
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

    updateAddress(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;
    const { street, city, zip, name, state } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit Address"
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
        </FormWrapper>
        <ServiceButton title="Update Address" onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

export default EditAddressScreen;
