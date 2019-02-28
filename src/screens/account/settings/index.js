import React from "react";
import { Avatar } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { StyledText } from "../../../components/text";
import { InputButton } from "../../../components/input-button";
import { NavHeader } from "../../../components/nav-header";
import {
  ContainerView,
  HeaderWrapper,
  ViewCentered,
  View,
  ScrollView,
  FlexView,
  ContentButton
} from "./styles";
import { colors } from "../../../utils/constants";

class SettingsScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Settings"
            size="medium"
            hasBackButton={true}
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <ScrollView>
          <ViewCentered>
            <Avatar
              rounded
              size={120}
              source={require("../../../../assets/images/Doctor.png")}
              showEditButton
              editButton={{
                iconStyle: {
                  color: colors.WHITE
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
                value="Michael Brown"
                icon={
                  <FontAwesome
                    name="angle-right"
                    size={24}
                    color={colors.MIDGREY}
                  />
                }
              />
            </View>
            <View style={{ padding: 16 }}>
              <InputButton
                label="Address"
                value="22341 Justice Ave APT 725"
                icon={
                  <FontAwesome
                    name="angle-right"
                    size={24}
                    color={colors.MIDGREY}
                  />
                }
                onPress={() => navigate("EditAdress")}
              />
            </View>
            <View style={{ padding: 16 }}>
              <InputButton
                label="Email"
                value="michaelbrown@gmail.com"
                icon={
                  <FontAwesome
                    name="angle-right"
                    size={24}
                    color={colors.MIDGREY}
                  />
                }
                onPress={() => navigate("EditEmail")}
              />
            </View>
            <View style={{ padding: 16 }}>
              <InputButton
                label="Phone Number"
                value="(415) 123 - 4567"
                icon={
                  <FontAwesome
                    name="angle-right"
                    size={24}
                    color={colors.MIDGREY}
                  />
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
                <Avatar
                  rounded
                  size={40}
                  source={require("../../../../assets/images/FoxLarge.png")}
                />
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
                <Avatar
                  rounded
                  size={40}
                  source={require("../../../../assets/images/FoxLarge.png")}
                />
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
                <Avatar
                  rounded
                  size={40}
                  source={require("../../../../assets/images/FoxLarge.png")}
                />
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
