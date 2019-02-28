import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import { KeyboardAvoidingView, View, FlexView, FormWrapper } from "./styles";
import { colors } from "../../../utils/constants";

class AddCardScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" enabled={true}>
        <NavHeader
          title="Add Card"
          size="medium"
          hasBackButton={true}
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <View>
            <FormTextInput
              label="Card Number"
              placeholder="1234 5678 3456 2456"
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
            />
          </View>
          <View>
            <FlexView>
              <FormTextInput
                label="Exp. Date"
                placeholder="## / ##"
                style={{
                  width: 120,
                  marginRight: 40
                }}
              />
              <FormTextInput
                label="CVV"
                placeholder="###"
                style={{
                  width: 120
                }}
              />
            </FlexView>
          </View>
          <View>
            <FormTextInput label="Full Name" placeholder="Full Name" />
          </View>
        </FormWrapper>
        <ServiceButton title="Add Card" onPress={() => goBack()} />
      </KeyboardAvoidingView>
    );
  }
}

export default AddCardScreen;
