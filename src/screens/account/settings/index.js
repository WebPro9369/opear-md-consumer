/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React from "react";
import { ActivityIndicator, Alert, Switch } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import InactiveUserBanner from "@components/banner";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { StyledText } from "@components/text";
import { InputButton } from "@components/input-button";
import { NavHeader } from "@components/nav-header";
import {
  ContainerView,
  HeaderWrapper,
  ViewCentered,
  View,
  FlexView
} from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { colors } from "@utils/constants";
import { updateParent } from "@services/opear-api";

const { MIDGREY } = colors;
const imgAvatar = require("../../../../assets/images/Placeholder_Photo.png");

@inject("store")
@observer
class SettingsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore: { sms_notification }
      }
    } = props;

    this.state = {
      loading: false,
      smsNotification: sms_notification,
      avatarSource: {}
    };
  }

  onChangeSmsNotification = value => {
    const {
      store: { userStore }
    } = this.props;

    console.tron.log("Sms notification: ", value);

    const data = {
      parent: {
        sms_notification: value
      }
    };

    const successHandler = ({ data: { sms_notification } }) => {
      this.setState({ loading: false, smsNotification: sms_notification }, () =>
        userStore.setSmsNotification(sms_notification)
      );
    };

    const errorHandler = () => {
      this.setState({ loading: false }, () =>
        Alert.alert("Error", "Failed to update SMS Notification setting.")
      );
    };

    this.setState({
      loading: true
    });

    updateParent(userStore.id, data, { successHandler, errorHandler });
  };

  onAddAvatar = () => {
    const options = {
      title: "Select Profile Picture"
    };

    const {
      store: { userStore }
    } = this.props;

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

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });

        userStore.setAvatar(source.uri);

        const successHandler = res => {
          console.tron.log(res.data);
        };

        const data = {
          parent: {
            avatar: {
              uri: source.uri
            }
          }
        };

        updateParent(userStore.id, data, { successHandler });
      }
    });
  };

  render() {
    const { smsNotification, avatarSource, loading } = this.state;
    const {
      navigation,
      store: { userStore }
    } = this.props;
    const { navigate } = navigation;
    const { name, addresses, email, phone } = userStore;
    const address =
      addresses && addresses.length ? addresses[addresses.length - 1] : {};

    const avatarOptions = { source: imgAvatar };

    if (avatarSource && avatarSource.uri !== "/images/original/missing.png") {
      avatarOptions.source = { uri: avatarSource.uri };
    }

    return (
      <ContainerView>
        <DeeplinkHandler navigation={navigation} />
        <HeaderWrapper>
          <NavHeader
            title="Settings"
            size="medium"
            hasBackButton
            onPressBackButton={() => navigate("AccountDefault")}
          />
        </HeaderWrapper>
        <InactiveUserBanner userIsActive={userStore.active} />
        {loading && (
          <ViewCentered paddingBottom={12} style={{ flex: 1 }}>
            <ActivityIndicator size="large" color={colors.SEAFOAMBLUE} />
          </ViewCentered>
        )}
        {!loading && (
          <ScrollView>
            <ViewCentered>
              <Avatar
                {...avatarOptions}
                rounded
                size={120}
                showEditButton
                editButton={{
                  containerStyle: {
                    backgroundColor: colors.GREEN,
                    borderRadius: 12
                  },
                  size: 24,
                  onPress: this.onAddAvatar
                }}
              />
            </ViewCentered>
            <View>
              <StyledText fontSize={24}>Personal Information</StyledText>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Name"
                  value={name}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("SettingsEditName")}
                />
              </View>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Address"
                  value={address.street}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("SettingsEditAdress")}
                />
              </View>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Email"
                  value={email}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("SettingsEditEmail")}
                />
              </View>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Phone Number"
                  value={phone}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("SettingsEditPhoneNumber")}
                />
              </View>
            </View>
            <FlexView style={{ padding: 16 }}>
              <StyledText fontSize={20}>SMS Notifications</StyledText>
              <Switch
                value={smsNotification}
                onValueChange={this.onChangeSmsNotification}
              />
            </FlexView>
          </ScrollView>
        )}
      </ContainerView>
    );
  }
}

export default SettingsScreen;
