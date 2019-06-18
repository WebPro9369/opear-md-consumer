import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  ContainerView,
  HeaderWrapper,
  FlexView,
  FormWrapper
} from "../../../components/views";
import { FormInputView } from "../../../components/views/keyboard-view";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";

import { colors } from "../../../utils/constants";

const { LIGHTGREEN } = colors;

class EditAddressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "22341 Justice Avenue",
      city: "San Francisco",
      zip: "94043",
      locationName: "Eddie's House"
    };
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { address, city, zip, locationName } = this.state;
    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Edit Address"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <KeyboardScrollView>
          <FormWrapper>
            <FormInputView>
              <FormTextInput
                label="Address"
                value={address}
                rightIcon={
                  <FontAwesome name="map-marker" size={30} color={LIGHTGREEN} />
                }
              />
            </FormInputView>
            <FormInputView>
              <FlexView>
                <FormTextInput
                  label="City"
                  style={{
                    width: 120,
                    marginRight: 40
                  }}
                  value={city}
                />
                <FormTextInput
                  label="Zip"
                  style={{
                    width: 120
                  }}
                  value={zip}
                />
              </FlexView>
            </FormInputView>
            <FormInputView>
              <FormTextInput label="Location Name" value={locationName} />
            </FormInputView>
          </FormWrapper>
          <ServiceButton title="Update Address" onPress={() => goBack()} />
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default EditAddressScreen;
