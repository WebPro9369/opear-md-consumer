/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React from "react";
import { Alert } from "react-native";
import { inject } from "mobx-react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { FormTextInput } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { ServiceButton } from "@components/service-button";
import { FormInputWrapper, FormWrapper } from "@components/views";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { colors } from "@utils/constants";
import { passwordReset } from "@services/opear-api";

@inject("store")
class ForgotPwdScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }

  onSubmit = () => {
    const { email } = this.state;
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email || !regEmail.test(email)) {
      return Alert.alert("Email Error", "Please enter a valid email address.");
    }

    // console.tron.log("Password reset email: ", email);

    const successHandler = () => {
      Alert.alert(
        "Reset Requested",
        "Check your email to reset your password."
      );
    };

    passwordReset({ email }, { successHandler });
    return true;
  };

  handleEmailChange = text => {
    this.setState({
      email: text
    });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { email } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ backgroundColor: colors.LIGHTGREEN, height: "100%" }}
      >
        <NavHeader
          title="Forgot Password"
          size="medium"
          hasBackButton
          backButtonIcon={
            <AntDesign name="arrowleft" size={20} color={colors.WHITE} />
          }
          backgroundColor={colors.LIGHTGREEN}
          serviceTextStyle={{ color: "#ffffff" }}
          onPressBackButton={() => {
            goBack();
          }}
        />
        <FormWrapper centered padding={0} style={{ marginTop: 32 }}>
          <FormInputWrapper paddingLeft={16} paddingRight={16}>
            <FormTextInput
              label="Email"
              value={email}
              placeholder="name@domain.com"
              color="#ffffff"
              onChangeText={this.handleEmailChange}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingBottom={6} style={{ marginBottom: 0 }}>
            <ServiceButton
              title="Reset Password"
              onPress={this.onSubmit}
              backgroundColor="#ffffff"
              color={colors.LIGHTGREEN}
            />
          </FormInputWrapper>
        </FormWrapper>
      </KeyboardAvoidingView>
    );
  }
}

export default ForgotPwdScreen;
