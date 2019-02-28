import React, { Component } from "react";
import { Image, View } from "react-native";
import { KeyboardAvoidingView } from "./styles";
import ServiceButton from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";

class AskLocationScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled={true}
        keyboardVerticalOffset={64}
      >
        <View>
          <StyledText textAlign="left" style={{ marginBottom: 24 }}>
            Let's make sure opear is in your area:
          </StyledText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 16
            }}
          >
            <StyledTextInput
              fontSize={28}
              autoFocus={true}
              placeholder="Zip code"
            />
            <Image
              source={require("@images/Location.png")}
            />
          </View>
        </View>
        <View>
          <Image
            source={require("@images/ProgressBar1.png")}
            style={{ marginBottom: 16 }}
          />
          <ServiceButton
            title="Check Availability"
            style={{ marginBottom: 20 }}
            onPress={() => this.props.navigation.navigate("NameCapture")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default AskLocationScreen;
