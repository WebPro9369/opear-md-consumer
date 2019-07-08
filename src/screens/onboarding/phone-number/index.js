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
      phone: null
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

    if (!phone || !regPhone.test(phone)) {
      return Alert.alert("Please enter a valid phone number");
    }

    if (phone) userStore.setPhone(phone);


    navigate("AvatarUpload");

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
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Image
            source={imgProgressbar}
            resizeMode="contain"
            style={{ width: "100%", marginBottom: 16 }}
          />
          <ServiceButton
            title="Next"
            style={{ marginBottom: 20 }}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardScrollView>
    );
  }
}

export default PhoneNumberScreen;
