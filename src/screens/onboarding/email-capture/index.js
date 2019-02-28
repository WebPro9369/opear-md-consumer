import React, { Component } from "react";
import { Image, View } from "react-native";
import { KeyboardAvoidingView } from "./styles";
import ServiceButton from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";

class EmailCaptureScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled={true}
        keyboardVerticalOffset={64}
      >
        <View>
          <StyledText textAlign="left" style={{ marginBottom: 24 }}>
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
            onPress={() => this.props.navigation.navigate("CreatePassword")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EmailCaptureScreen;
