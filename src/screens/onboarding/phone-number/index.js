import React, { Component } from "react";
import { Image, View, Alert, Linking } from "react-native";
import { CheckBox } from "react-native-elements";
import { TextInputMask } from "react-native-masked-text";
import { inject, observer, PropTypes } from "mobx-react";
// import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { ServiceButton } from "@components/service-button";
import { StyledText, StyledTextInput } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { registerParent } from "@services/opear-api";
import { colors } from "@utils/constants"
import { storeNotificationToken } from "@services/authentication";

const imgProgressbar = require("../../../../assets/images/ProgressBar5.png");

@inject("store")
@observer
class PhoneNumberScreen extends Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

  constructor(props) {
    super(props);

    this.state = {
      phone: null,
      acceptedPrivacy: false,
      acceptedTermsOfService: false
    };
  }

  handleInputChange = text => {
    this.setState({
      phone: text
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: { userStore }
    } = this.props;
    const { phone, acceptedPrivacy, acceptedTermsOfService } = this.state;
    const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!acceptedPrivacy) {
      return Alert.alert("Please review our Privacy Policy to continue");
    }

    if (!acceptedTermsOfService) {
      return Alert.alert("Please review our Terms of Service to continue");
    }

    if (!phone || !regPhone.test(phone)) {
      return Alert.alert("Please enter a valid phone number");
    }

    if (phone) userStore.setPhone(phone);

    const {
      name,
      email,
      password,
      address
    } = userStore;

    const data = {
      parent: {
        name,
        email,
        phone,
        password,
        zip: address.zip,
        accepted_privacy: acceptedPrivacy,
        accepted_terms_of_service: acceptedTermsOfService
      }
    };

    console.tron.log(data);

    const successHandler = response => {
      const { id, api_key: apiKey } = response.data;

      userStore.setAuthentication({ id, apiKey });

      const { notificationToken } = userStore;
      storeNotificationToken(id, notificationToken);

      userStore.setPhone(phone);
      userStore.setAcceptedPrivacy(acceptedPrivacy);
      userStore.setAcceptedTermsOfService(acceptedTermsOfService);

      navigate("Tabs");
    };

    const errorHandler = () => {
      return Alert.alert(
        "Uhoh",
        "Registration failed. Please ensure your information is correct, or contact help@opear.com."
      );
    };

    registerParent(data, { successHandler, errorHandler });
  };

  render() {
    const {
      navigation: { navigate, goBack }
    } = this.props;
    const { phone, acceptedPrivacy, acceptedTermsOfService } = this.state;

    return (
      <KeyboardScrollView
        behavior="padding"
        contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
      >
        <View>
          <NavHeader
            hasBackButton
            size="small"
            onPressBackButton={() => goBack()}
          />
          <StyledText
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            What is your phone number?
          </StyledText>
          <View>
            <TextInputMask
              fontSize={28}
              autoFocus
              placeholder="(123) 456 - 7890"
              value={phone}
              keyboardType="number-pad"
              returnKeyType="done"
              type="custom"
              options={{ mask: "(999) 999-9999" }}
              onChangeText={this.handleInputChange}
              style={{ marginBottom: 30 }}
            />
          </View>
        </View>
        <View>
          <StyledText
            style={{
              fontSize: 16,
              color: colors.BLACK60
            }}
          >
            By checking this box I affirm that I have read and understood
            Opear's
            {" "}
            <StyledText
              style={{
                color: colors.BLUE,
                textDecorationLine: "underline",
                textDecorationColor: colors.BLUE,
                fontSize: 16
              }}
              onPress={() =>
                Linking.openURL("https://www.opear.com/terms-conditions/")
              }
            >
              Terms of Use
            </StyledText>
            {" "}
            and
            {" "}
            <StyledText
              style={{
                color: colors.BLUE,
                textDecorationLine: "underline",
                textDecorationColor: colors.BLUE,
                fontSize: 16
              }}
              onPress={() =>
                Linking.openURL("https://www.opear.com/privacy-policy/")
              }
            >
              Privacy Policy
            </StyledText>
            {" "}
            and agree to be bound by their terms.
          </StyledText>
          <CheckBox
            title="I have read and accept"
            checked={this.state.acceptedPrivacy}
            onPress={() =>
              this.setState({
                acceptedPrivacy: !this.state.acceptedPrivacy
              })
            }
            size={36}
            textStyle={{ fontSize: 18 }}
            containerStyle={{
              backgroundColor: colors.WHITE,
              borderColor: colors.WHITE,
              paddingLeft: 0,
              marginLeft: 0
            }}
            checkedIcon="check-square"
            uncheckedIcon="square-o"
            checkedColor={colors.SEAFOAMBLUE}
          />
          <StyledText
            style={{
              fontSize: 16,
              color: colors.BLACK60,
              marginTop: 20
            }}
          >
            {
              "I hereby affirm that I read and understood Opear's Terms of Use and Privacy Policy and agree to be bound by their terms."
            }
            </StyledText>
          <CheckBox
            title="I have read and accept"
            checked={this.state.acceptedTermsOfService}
            onPress={() =>
              this.setState({
                acceptedTermsOfService: !this.state.acceptedTermsOfService
              })
            }
            size={36}
            textStyle={{ fontSize: 18 }}
            containerStyle={{
              backgroundColor: colors.WHITE,
              borderColor: colors.WHITE,
              paddingLeft: 0,
              marginLeft: 0
            }}
            checkedIcon="check-square"
            uncheckedIcon="square-o"
            checkedColor={colors.SEAFOAMBLUE}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Image
            source={imgProgressbar}
            resizeMode="contain"
            style={{ width: "100%", marginBottom: 16 }}
          />
          <ServiceButton
            title="Authenticate"
            style={{ marginBottom: 20 }}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardScrollView>
    );
  }
}

export default PhoneNumberScreen;
