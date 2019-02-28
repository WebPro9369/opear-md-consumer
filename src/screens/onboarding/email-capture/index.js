import React, { Component } from "react";
import { Image, View } from "react-native";
import { KeyboardAvoidingView } from "./styles";
import ServiceButton from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";

class EmailCaptureScreen extends Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" enabled={true}>
        <View>
          <NavHeader
            hasBackButton={true}
            size="small"
            onPressBackButton={() => goBack()}
          />
          <StyledText
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            What is your e-mail?
          </StyledText>
          <View>
            <StyledTextInput
              fontSize={28}
              autoFocus={true}
              placeholder="Email"
              textContentType="emailAddress"
            />
          </View>
        </View>
        <View>
          <Image
            source={require("@images/ProgressBar3.png")}
            style={{ marginBottom: 16 }}
          />
          <ServiceButton
            title="Next"
            style={{ marginBottom: 20 }}
            onPress={() => navigate("CreatePassword")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EmailCaptureScreen;
