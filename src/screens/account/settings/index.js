import React from "react";
import { Avatar } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { StyledText } from "../../../components/text";
import { InputButton } from "../../../components/input-button";
import { NavHeader } from "../../../components/nav-header";
import { ContentButton } from "./styles";
import {
  ContainerView,
  HeaderWrapper,
  ViewCentered,
  View,
  ScrollView,
  FlexView
} from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";

const { GREEN, MIDGREY } = colors;
const imgFoxLarge = require("../../../../assets/images/FoxLarge.png");
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
            onPressBackButton={() => navigate("Account")}
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
              />
            </View>
            <View style={{ padding: 16 }}>
              <InputButton
                label="Address"
                value={address}
                icon={
                  <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                }
                onPress={() => navigate("EditAdress")}
              />
            </View>
            <View style={{ padding: 16 }}>
              <InputButton
                label="Email"
                value={email}
                icon={
                  <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                }
                onPress={() => navigate("EditEmail")}
              />
            </View>
            <View style={{ padding: 16 }}>
              <InputButton
                label="Phone Number"
                value={phone}
                icon={
                  <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                }
                onPress={() => navigate("EditPhoneNumber")}
              />
            </View>
          </View>
          <View>
            <StyledText
              fontFamily="Flama-Medium"
              fontSize={24}
              style={{ paddingTop: 24, paddingBottom: 16 }}
            >
              Edit Children
            </StyledText>
            <ContentButton>
              <FlexView>
                <Avatar rounded size={40} source={imgFoxLarge} />
                <StyledText
                  fontFamily="Flama-Basic"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  Benjamin
                </StyledText>
              </FlexView>
              <StyledText fontFamily="Flama-Basic" fontSize={16}>
                6 yrs
              </StyledText>
            </ContentButton>
            <ContentButton>
              <FlexView>
                <Avatar rounded size={40} source={imgFoxLarge} />
                <StyledText
                  fontFamily="Flama-Basic"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  Audrey
                </StyledText>
              </FlexView>
              <StyledText fontFamily="Flama-Basic" fontSize={16}>
                8 yrs
              </StyledText>
            </ContentButton>
            <ContentButton onPress={() => navigate("EditChild")}>
              <FlexView>
                <Avatar rounded size={40} source={imgFoxLarge} />
                <StyledText
                  fontFamily="Flama-Basic"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  Tara
                </StyledText>
              </FlexView>
              <StyledText fontFamily="Flama-Basic" fontSize={16}>
                12 yrs
              </StyledText>
            </ContentButton>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default SettingsScreen;
