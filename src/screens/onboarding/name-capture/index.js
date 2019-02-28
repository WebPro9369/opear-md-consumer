import React, { Component } from "react";
import { Image, View } from "react-native";
import { KeyboardAvoidingView } from "./styles";
import ServiceButton from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";

class NameCaptureScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled={true}
        keyboardVerticalOffset={64}
      >
        <View>
          <StyledText textAlign="left" style={{ marginBottom: 24 }}>
            What is your full name?
          </StyledText>
          <View>
            <StyledTextInput
              fontSize={28}
              autoFocus={true}
              placeholder="Full name"
            />
          </View>
        </View>
        <View>
          <Image
            source={require("@images/ProgressBar2.png")}
            style={{ marginBottom: 16 }}
          />
          <ServiceButton
            title="Next"
            style={{ marginBottom: 20 }}
            onPress={() => this.props.navigation.navigate("EmailCapture")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default NameCaptureScreen;
