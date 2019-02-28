import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import { KeyboardAvoidingView, View, FlexView, FormWrapper } from "./styles";
import { colors } from "../../../utils/constants";

class EditEmailScreen extends React.Component {
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
          <View>
            <FormTextInput label="Email" value="michaelbrown@gmail.com" />
          </View>
        </FormWrapper>
        <View>
          <ServiceButton title="Update Email" onPress={() => goBack()} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EditEmailScreen;
