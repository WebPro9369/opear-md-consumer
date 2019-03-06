import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import {
  KeyboardAvoidingView,
  FormInputView,
  FlexView,
  FormWrapper
} from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";

const AddCardScreen = ({ navigation: { goBack } }) => (
  <KeyboardAvoidingView behavior="padding" enabled>
    <NavHeader
      title="Add Card"
      size="medium"
      onPressBackButton={() => goBack()}
      hasBackButton
    />
    <FormWrapper>
      <FormInputView>
        <FormTextInput
          label="Card Number"
          placeholder="1234 5678 3456 2456"
          leftIcon={
            <FontAwesome name="cc-visa" size={30} color={colors.BLUE} />
          }
          rightIcon={
            <FontAwesome name="camera" size={30} color={colors.LIGHTGREEN} />
          }
        />
      </FormInputView>
      <FormInputView>
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
      </FormInputView>
      <FormInputView>
        <FormTextInput label="Full Name" placeholder="Full Name" />
      </FormInputView>
    </FormWrapper>
    <ServiceButton title="Add Card" onPress={() => goBack()} />
  </KeyboardAvoidingView>
);

export default AddCardScreen;
