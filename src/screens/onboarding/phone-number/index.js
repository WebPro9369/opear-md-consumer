import React, { Component } from "react";
import { Image, View, Alert, Linking } from "react-native";
import { CheckBox } from "react-native-elements";
import { inject, observer, PropTypes } from "mobx-react";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { ServiceButton } from "@components/service-button";
import { StyledText, StyledTextInput } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { registerParent } from "@services/opear-api";
import { colors } from "@utils/constants"

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
      store: {
        userStore
      }
    } = this.props;
    const { phone, acceptedPrivacy, acceptedTermsOfService } = this.state;

    if (!acceptedPrivacy) {
      return Alert.alert("Please review our Privacy Policy to continue");
    }

    if (!acceptedTermsOfService) {
      return Alert.alert("Please review our Terms of Service to continue");
    }

    const {
      name,
      email,
      password,
      address: {zip_code}
    } = userStore;

    const data = {
      parent: {
        name: name,
        email: email,
        phone: phone,
        password: password,
        zip: zip_code,
        accepted_privacy: acceptedPrivacy,
        accepted_terms_of_service: acceptedTermsOfService
      }
    };

    console.tron.log(data);

    const successHandler = response => {
      const { id, api_key: apiKey } = response.data;

      userStore.setAuthentication({ id, apiKey });

      userStore.setPhone(phone);
      userStore.setAcceptedPrivacy(acceptedPrivacy);
      userStore.setAcceptedTermsOfService(acceptedTermsOfServices);


    };

    // eslint-disable-next-line prettier/prettier
    const errorHandler = () => Alert.alert("Registration failed. Please ensure your information is correct, or contact help@opear.com.");

    registerParent(data, { successHandler, errorHandler });

    navigate("Tabs");

  };

  render() {
    const {
      navigation: { navigate, goBack }
    } = this.props;
    const { phone, acceptedPrivacy, acceptedTermsOfService } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" enabled>
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
            <StyledTextInput
              fontSize={28}
              autoFocus
              placeholder="(123) 456 - 7890"
              value={phone}
              onChangeText={this.handleInputChange}
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
            I hereby affirm that I read and understood Opear's Terms of
            Use and Privacy Policy and agree to be bound by their terms. I
            have (and will maintain during my time as an Opear Provider)
            all necessary malpractice and other insurance as required
            under applicable law.
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
        <View>
          <Image source={imgProgressbar} style={{ marginBottom: 16 }} />
          <ServiceButton
            title="Authenticate"
            style={{ marginBottom: 20 }}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default PhoneNumberScreen;
