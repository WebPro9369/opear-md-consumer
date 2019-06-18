import React from "react";
import MapView from "react-native-maps";
import { View } from "react-native";
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

class AddAddressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: null,
      street: null,
      city: null,
      zip: null,
      map: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { locationName, street, city, zip, map } = this.state;
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
        <KeyboardScrollView padding={0}>
          <MapView
            style={{ alignSelf: "stretch", height: 200 }}
            initialRegion={map}
          />
          <FormWrapper padding={32}>
            <FormInputWrapper>
              <FormTextInput
                label="Location Name"
                value={locationName}
                placeholder="Location Name"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Street"
                value={street}
                placeholder="Street"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="City" value={city} placeholder="City" />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Zip" value={zip} placeholder="Zip" />
            </FormInputWrapper>
          </FormWrapper>
          <FormInputWrapper style={{ marginBottom: 20 }}>
            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
              <ServiceButton title="Add Address" onPress={() => goBack()} />
            </View>
          </FormInputWrapper>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default AddAddressScreen;
