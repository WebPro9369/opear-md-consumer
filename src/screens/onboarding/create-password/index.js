import React, { Component } from "react";
import { Image, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { ServiceButton } from "@components/service-button";
import { StyledText, StyledTextInput } from "@components/text";
import { NavHeader } from "@components/nav-header";

const imgProgressbar = require("../../../../assets/images/ProgressBar4.png");

@inject("store")
@observer
class CreatePasswordScreen extends Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

  constructor(props) {
    super(props);
    this.state = {
      password: null
    };
  }

  handleInputChange = text => {
    this.setState({
      password: text
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: {
        userStore
      }
    } = this.props;
    const { password } = this.state;

    if (password) userStore.setPassword(password);
    navigate("PhoneNumber");

  };

  render() {
    const {
      navigation: { navigate, goBack }
    } = this.props;
    const { password } = this.state;
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
            Choose a password
          </StyledText>
          <View>
            <StyledTextInput
              fontSize={28}
              autoFocus
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={this.handleInputChange}
            />
          </View>
        </View>
        <View>
          <Image source={imgProgressbar} style={{ marginBottom: 16 }} />
          <ServiceButton
            title="Next"
            style={{ marginBottom: 20 }}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default CreatePasswordScreen;
