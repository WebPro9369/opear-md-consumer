/* eslint-disable import/no-unresolved */
import React from "react";

import { inject, observer, PropTypes } from "mobx-react";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import InactiveUserBanner from "@components/banner";
import { StyledText } from "../../../components/text";
import { InputButton } from "../../../components/input-button";
import { NavHeader } from "../../../components/nav-header";
import {
  ContainerView,
  HeaderWrapper,
  ViewCentered,
  View
} from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";
import { DeeplinkHandler } from "@components/deeplink-handler";
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
        userStore: { avatar }
      }
    } = this.props;

    this.state = {
      avatarSource: { uri: avatar}
    };
  }

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

        successHandler = res => {
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
    const {
      navigation: { navigate },
      store: { userStore }
    } = this.props;

    const { name, address, email, phone } = userStore;

    const { avatarSource } = this.state;
    var avatarOptions = { source: imgAvatar };

    if(avatarSource.uri != "/images/original/missing.png") {
      avatarOptions = {
        source:
        { uri : avatarSource.uri}
      };
    }

    return (
      <ContainerView>
        <DeeplinkHandler navigation={this.props.navigation}/>
        <HeaderWrapper>
          <NavHeader
            title="Settings"
            size="medium"
            hasBackButton
            onPressBackButton={() => navigate("AccountDefault")}
          />
        </HeaderWrapper>
        <InactiveUserBanner userIsActive={userStore.active} />
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
        </ScrollView>
      </ContainerView>
    );
  }
}

export default SettingsScreen;
