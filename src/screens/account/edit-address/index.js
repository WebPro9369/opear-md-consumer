import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import { KeyboardAvoidingView, View, FlexView, FormWrapper } from "./styles";
import { colors } from "../../../utils/constants";

class EditAddressScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" enabled={true}>
        <NavHeader
          title="Edit Address"
          size="medium"
          hasBackButton={true}
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <View>
            <FormTextInput
              label="Address"
              rightIcon={
                <FontAwesome
                  name="map-marker"
                  size={30}
                  color={colors.LIGHTGREEN}
                />
              }
              value="22341 Justice Avenue"
            />
          </View>
          <View>
            <FlexView>
              <FormTextInput
                label="City"
                style={{
                  width: 120,
                  marginRight: 40
                }}
                value="San Francisco"
              />
              <FormTextInput
                label="Zip"
                style={{
                  width: 120
                }}
                value="94043"
              />
            </FlexView>
          </View>
          <View>
            <FormTextInput label="Location Name" value="Eddie's House" />
          </View>
        </FormWrapper>
        <ServiceButton title="Update Address" onPress={() => goBack()} />
      </KeyboardAvoidingView>
    );
  }
}

export default EditAddressScreen;
