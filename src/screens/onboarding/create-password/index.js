import React, { Component } from "react";
import { Image, View } from "react-native";
import { KeyboardAvoidingView } from "./styles";
import ServiceButton from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";

class CreatePasswordScreen extends Component {
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
            Choose a password
          </StyledText>
          <View>
            <StyledTextInput
              fontSize={28}
              autoFocus={true}
              placeholder="Enter password"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View>
          <Image
            source={require("@images/ProgressBar4.png")}
            style={{ marginBottom: 16 }}
          />
          <ServiceButton
            title="Next"
            style={{ marginBottom: 20 }}
            onPress={() => navigate("PhoneNumber")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default CreatePasswordScreen;
