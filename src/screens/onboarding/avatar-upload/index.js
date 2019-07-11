/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { Image, View, Alert, Linking } from "react-native";
import { CheckBox, Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { inject, observer, PropTypes } from "mobx-react";
// import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { ServiceButton } from "@components/service-button";
import { ViewCentered } from "@components/views";
import { KeyboardScrollView } from "@components/views/keyboard-scroll-view";
import { StyledText } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { registerParent } from "@services/opear-api";
import { storeNotificationToken } from "@services/authentication";
import { colors } from "@utils/constants";

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
      avatarSource: { uri: "" },
      acceptedPrivacy: false,
      acceptedTermsOfService: false
    };
  }

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: { userStore }
    } = this.props;
    const {
      avatarSource,
      acceptedPrivacy,
      acceptedTermsOfService
    } = this.state;

    if (!acceptedPrivacy) {
      return Alert.alert("Please review our Privacy Policy to continue");
    }

    if (!acceptedTermsOfService) {
      return Alert.alert("Please review our Terms of Service to continue");
    }

    if (avatarSource.uri == "") {
      return Alert.alert("Please upload a profile picture to continue");
    }

    const { name, email, password, address, phone } = userStore;

    userStore.setAvatar(avatarSource.uri);

    const data = {
      parent: {
        name,
        email,
        phone,
        password,
        zip: address.zip,
        accepted_privacy: acceptedPrivacy,
        accepted_terms_of_service: acceptedTermsOfService,
        avatar: { uri: avatarSource.uri }
      }
    };

    console.tron.log(data);

    const successHandler = response => {
      const { id, api_key: apiKey } = response.data;

      userStore.setAuthentication({ id, apiKey });

      const { notificationToken } = userStore;
      storeNotificationToken(id, notificationToken);

      userStore.setAvatar(avatarSource.uri);
      userStore.setAcceptedPrivacy(acceptedPrivacy);
      userStore.setAcceptedTermsOfService(acceptedTermsOfService);

      navigate("Tabs");
    };

    const errorHandler = () => {
      return Alert.alert(
        "Uhoh",
        "Registration failed. Please ensure your information is correct, or contact help@opear.com."
      );
    };

    return registerParent(data, { successHandler, errorHandler });
  };

  onAddAvatar = () => {
    const options = {
      title: "Select Profile Picture"
    };

    ImagePicker.showImagePicker(options, response => {
      console.tron.log("Response = ", response);

      if (response.didCancel) {
        console.tron.log("User cancelled image picker");
      } else if (response.error) {
        console.tron.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.tron.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        console.tron.log(source);
        console.tron.log(this.state);
        this.setState({
          avatarSource: source
        });
        console.tron.log(this.state);
      }
    });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const {
      avatarSource,
      acceptedPrivacy,
      acceptedTermsOfService
    } = this.state;

    const avatarOptions = { icon: { name: "user", type: "font-awesome" } };

    if (avatarSource.uri !== "") {
      avatarOptions.source = { uri: avatarSource.uri };
    }

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
            Please upload a profile picture
          </StyledText>
          <ViewCentered paddingTop={0}>
            <Avatar
              {...avatarOptions}
              rounded
              size={120}
              showEditButton
              editButton={{
                name: "pluscircle",
                type: "antdesign",
                containerStyle: {
                  backgroundColor: colors.BLUE,
                  borderRadius: 12
                },
                size: 24,
                onPress: this.onAddAvatar
              }}
            />
          </ViewCentered>
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
            checked={acceptedPrivacy}
            onPress={() =>
              this.setState({
                acceptedPrivacy: !acceptedPrivacy
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
              color: colors.BLACK60
            }}
          >
            {
              "I hereby affirm that I read and understood Opear's Terms of Use and Privacy Policy and agree to be bound by their terms."
            }
          </StyledText>
          <CheckBox
            title="I have read and accept"
            checked={acceptedTermsOfService}
            onPress={() =>
              this.setState({
                acceptedTermsOfService: !acceptedTermsOfService
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
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Image
            source={imgProgressbar}
            resizeMode="contain"
            style={{ width: "100%", marginBottom: 16 }}
          />
          <ServiceButton
            title="Submit"
            style={{ marginBottom: 20 }}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardScrollView>
    );
  }
}

export default PhoneNumberScreen;
