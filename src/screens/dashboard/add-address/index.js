import React from "react";
import { MapView } from "expo";
import { View } from "react-native";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import {
  ContainerView,
  View as FormInputView,
  FormWrapper,
  ScrollView
} from "../../../components/views/scroll-view";

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
      <ContainerView behavior="padding" enabled>
        <View
          style={{
            paddingTop: 16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 6
          }}
        >
          <NavHeader
            title="Add address"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </View>
        <ScrollView padding={0}>
          <MapView
            style={{ alignSelf: "stretch", height: 200 }}
            initialRegion={map}
          />
          <FormWrapper padding={32}>
            <FormInputView>
              <FormTextInput
                label="Location Name"
                value={locationName}
                placeholder="Location Name"
              />
            </FormInputView>
            <FormInputView>
              <FormTextInput
                label="Street"
                value={street}
                placeholder="Street"
              />
            </FormInputView>
            <FormInputView>
              <FormTextInput label="City" value={city} placeholder="City" />
            </FormInputView>
            <FormInputView>
              <FormTextInput label="Zip" value={zip} placeholder="Zip" />
            </FormInputView>
          </FormWrapper>
          <FormInputView style={{ marginBottom: 20 }}>
            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
              <ServiceButton title="Add Address" onPress={() => goBack()} />
            </View>
          </FormInputView>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default AddAddressScreen;
