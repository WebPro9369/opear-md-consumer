import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import { KeyboardAvoidingView, View, FlexView, FormWrapper } from "./styles";
import { colors } from "../../../utils/constants";

class EditCardScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" enabled={true}>
        <NavHeader
          title="Edit Card"
          size="medium"
          hasBackButton={true}
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <View>
            <FormTextInput
              label="Card Number"
              leftIcon={
                <FontAwesome name="cc-visa" size={30} color={colors.BLUE} />
              }
              rightIcon={
                <FontAwesome
                  name="camera"
                  size={30}
                  color={colors.LIGHTGREEN}
                />
              }
              value="1234 5678 3456 2456"
            />
          </View>
          <View>
            <FlexView>
              <FormTextInput
                label="Exp. Date"
                style={{
                  width: 120,
                  marginRight: 40
                }}
                value="05 / 2020"
              />
              <FormTextInput
                label="CVV"
                style={{
                  width: 120
                }}
                value="698"
              />
            </FlexView>
          </View>
          <View>
            <FormTextInput label="Full Name" value="Michael Brown" />
          </View>
        </FormWrapper>
        <ServiceButton title="Save Card" onPress={() => goBack()} />
      </KeyboardAvoidingView>
    );
  }
}

export default EditCardScreen;
