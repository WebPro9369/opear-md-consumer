import React from "react";
import PhoneInput from "react-native-phone-input";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import { View, FormView } from "./styles";
import { FormWrapper } from "../../../components/views";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";

class EditPhoneNumberScreen extends React.Component {
  render() {
    const {
      navigation: { goBack }
    } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit email"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <StyledText fontSize={14}>Phone number</StyledText>
          <FormView>
            <PhoneInput
              ref={phone => {
                this.phone = phone;
              }}
            />
          </FormView>
        </FormWrapper>
        <View>
          <ServiceButton title="Update Phone" onPress={() => goBack()} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EditPhoneNumberScreen;
