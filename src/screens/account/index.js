import React from "react";
import { Avatar, Badge } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { StyledText, StyledTextInput } from "../../components/text";
import { NavHeader } from "../../components/nav-header";
import {
  ContainerView,
  View,
  FlexView,
  FlexViewSpread,
  ListTouchableButtonWrapper,
  ListButtonText,
  styles
} from "./styles";
import { colors } from "../../utils/constants";

class AccountScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <ContainerView>
        <NavHeader title="Account" size="medium" hasBackButton={false} />
        <View style={{ padding: 16 }}>
          <FlexView>
            <Avatar
              rounded
              size={80}
              source={require("../../../assets/images/Doctor.png")}
            />
            <View style={{ paddingLeft: 20 }}>
              <StyledText fontSize={16}>Michael Brown</StyledText>
              <StyledText fontSize={16} fontFamily="Flama-Light">
                michaelbrown@gmail.com
              </StyledText>
            </View>
          </FlexView>
          <FlexViewSpread style={{ paddingTop: 30 }}>
            <Badge
              value="Benjamin"
              textStyle={styles.badgeText}
              badgeStyle={styles.badge}
            />
            <Badge
              value="Tommy"
              textStyle={styles.badgeText}
              badgeStyle={styles.badge}
            />
            <Badge
              value="Audrey"
              textStyle={styles.badgeText}
              badgeStyle={styles.badge}
            />
          </FlexViewSpread>
        </View>
        <View style={{ paddingTop: 16, paddingBottom: 16 }}>
          <ListTouchableButtonWrapper onPress={() => navigate("Settings")}>
            <ListButtonText>Settings</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
          <ListTouchableButtonWrapper onPress={() => navigate("Payment")}>
            <ListButtonText>Payment</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
          <ListTouchableButtonWrapper>
            <ListButtonText>Support</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
          <ListTouchableButtonWrapper>
            <ListButtonText>Log out</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
        </View>
      </ContainerView>
    );
  }
}

export default AccountScreen;
