import React from "react";
import { Alert } from "react-native";
import { inject, PropTypes } from "mobx-react";
import { FormTextInput, StyledText } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { ServiceButton } from "@components/service-button";
import { ViewCentered, FormInputWrapper, FormWrapper } from "@components/views";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { colors } from "@utils/constants";
import { getParent, getApiToken } from "@services/opear-api";
import { userFromResult } from "@utils";

@inject("store")
class SignInScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }

  onSubmit = () => {
    const { email, password } = this.state;
    const {
      navigation: { navigate },
      store: { userStore }
    } = this.props;

    const loginSuccessHandler = res => {
      if (res.data.message) {
        return Alert.alert(`Incorrect credentials. Please try again.`);
      } 
      
      const { id, api_key: apiKey } = res.data;
      userStore.setAuthentication({ id, apiKey });

      const successHandler = res => {
        userFromResult(res, userStore);
        navigate("Tabs");
      };
      getParent(id, { successHandler });
    };

    getApiToken(email, password, { successHandler: loginSuccessHandler });
  };

  onPressForgotPassword = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("AccountForgotPwd");
    return true;
  };

  onPressSignUp = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Onboarding");
    return true;
  };

  handleEmailChange = text => {
    this.setState({
      email: text
    });
  };

  handlePwdChange = text => {
    this.setState({
      password: text
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ backgroundColor: colors.LIGHTGREEN, height: "100%" }}
      >
        <NavHeader
          title="Sign In"
          size="medium"
          hasBackButton={false}
          serviceTextStyle={{ color: "#ffffff" }}
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
          <FormInputWrapper paddingLeft={16} paddingRight={16}>
            <FormTextInput
              label="Password"
              value={password}
              placeholder="Enter password"
              type="password"
              color="#ffffff"
              onChangeText={this.handlePwdChange}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingBottom={6} style={{ marginBottom: 0 }}>
            <ServiceButton
              title="Sign In"
              onPress={this.onSubmit}
              backgroundColor="#ffffff"
              color={colors.LIGHTGREEN}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingTop={6}>
            <ViewCentered
              style={{ flexDirection: "row" }}
            >
              <StyledText
                style={{ color: "#ffffff" }}
                onPress={this.onPressSignUp}
              >
                sign up
              </StyledText>              
              <StyledText style={{ color: "#ffffff" }}>  |  </StyledText>
              <StyledText
                style={{ color: "#ffffff" }}
                onPress={this.onPressForgotPassword}
              >
                forgot password?
              </StyledText>
            </ViewCentered>
          </FormInputWrapper>
        </FormWrapper>
      </KeyboardAvoidingView>
    );
  }
}

export default SignInScreen;