/* eslint-disable import/no-unresolved */
import React from "react";

import { inject, observer, PropTypes } from "mobx-react";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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

const { MIDGREY } = colors;
const imgAvatar = require("../../../../assets/images/Placeholder_Photo.png");

@inject("store")
@observer
class SettingsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  render() {
    const {
      navigation: { navigate },
      store: { userStore }
    } = this.props;

    const { name, address, email, phone } = userStore;

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
              rounded
              size={120}
              source={imgAvatar}
              showEditButton={false}
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
