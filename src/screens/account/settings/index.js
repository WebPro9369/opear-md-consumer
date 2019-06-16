import React from "react";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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

const { GREEN, MIDGREY } = colors;
const imgDoctor = require("../../../../assets/images/Doctor.png");

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Michael Brown",
      address: "22341 Justice Ave APT 725",
      email: "michaelbrown@gmail.com",
      phone: "(415) 123 - 4567"
    };
  }

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { name, address, email, phone } = this.state;
    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Settings"
            size="medium"
            hasBackButton
            onPressBackButton={() => navigate("AccountDefault")}
          />
        </HeaderWrapper>
        <ScrollView>
          <ViewCentered>
            <Avatar
              rounded
              size={120}
              source={imgDoctor}
              showEditButton
              editButton={{
                containerStyle: {
                  backgroundColor: GREEN,
                  borderRadius: 12
                },
                size: 24
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
                onPress={() => null}
              />
            </View>
            <View style={{ padding: 16 }}>
              <InputButton
                label="Address"
                value={address}
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
