import React, { Component } from "react";
import { Image, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { ServiceButton } from "@components/service-button";
import { StyledText, StyledTextInput } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { registerParent } from "@services/opear-api";

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
      store: {
        userStore
      }
    } = this.props;
    const { phone } = this.state;

    if (phone) userStore.setPhone(phone);

    const {
      name,
      email,
      password,
      address: {zip_code}
    } = userStore;

    const data = {
      parent: {
        name,
        email,
        password,
        phone,
        zip: zip_code
      }
    };

    const successHandler = response => {
      const { id, apiKey: api_key } = response.data;

      userStore.setAuthentication({ id, apiKey });

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
    const { phone } = this.state;

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
