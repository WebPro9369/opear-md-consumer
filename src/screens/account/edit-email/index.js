import React from "react";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import {
  KeyboardAvoidingView,
  View,
  FormWrapper
} from "../../../components/views/keyboard-view";

class EditEmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "michaelbrown@gmail.com"
    };
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { email } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit email"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <View>
            <FormTextInput label="Email" value={email} />
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
