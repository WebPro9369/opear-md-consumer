import React from "react";
import PhoneInput from "react-native-phone-input";
import { FormTextInput, StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import { KeyboardAvoidingView, View, FormView, FormWrapper } from "./styles";
import { colors } from "../../../utils/constants";

class EditPhoneNumberScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" enabled={true}>
        <NavHeader
          title="Edit email"
          size="medium"
          hasBackButton={true}
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <StyledText fontSize={14}>Phone number</StyledText>
          <FormView>
            <PhoneInput ref="phone" />
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
