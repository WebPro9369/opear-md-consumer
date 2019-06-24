import React, { Component } from "react";
import { Alert, Image, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import TouchID from "react-native-touch-id";
import { ServiceButton } from "@components/service-button";
import { StyledText, StyledTextInput } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";

const imgProgressbar = require("../../../../assets/images/ProgressBar1.png");

@inject("store")
@observer
class AskLocationScreen extends Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

  constructor(props) {
    super(props);
    this.state = {
      zipcode: null
    };
  }

  handleInputChange = text => {
    this.setState({
      zipcode: text
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: {
        userStore: { address }
      }
    } = this.props;
    const { zipcode } = this.state;

    if (!zipcode) return Alert.alert("Please enter your zip code");

    const optionalConfigObject = {
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: true // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    if (zipcode) address.setZipCode(zipcode);
    navigate("NameCapture");
    // TODO: Get TouchID working
  //   return TouchID.isSupported(optionalConfigObject)
  //     .then(biometryType => {
  //       console.tron.log("BiometryType: ", biometryType);
  //       TouchID.authenticate()
  //         .then(success => {
  //           console.tron.log("TouchID Auth successful: ", success);
  //           Alert.alert("Authenticated Successfully!");
  //           navigate("NameCapture");
  //         })
  //         .catch(error => {
  //           console.tron.log("TouchID auth failed: ", error);
  //           if (error.name === "LAErrorTouchIDNotAvailable") {
  //             return Alert.alert("TouchID is not supported.");
  //           }
  //           Alert.alert("Authentication failed.");
  //         });
  //     })
  //     .catch(error => {
  //       console.tron.log("TouchID not supported: ", error);
  //       Alert.alert("TouchID is not supported.");
  //     });
  };

  render() {
    const { zipcode } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View>
          <NavHeader title="Welcome to opear" hasBackButton size="small" />
          <StyledText
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            Let&apos;s make sure opear is in your area:
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
              autoFocus
              placeholder="Zip code"
              value={zipcode}
              onChangeText={this.handleInputChange}
            />
          </View>
        </View>
        <View>
          <Image source={imgProgressbar} style={{ marginBottom: 16 }} />
          <ServiceButton
            title="Check Availability"
            style={{ marginBottom: 20 }}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default AskLocationScreen;
