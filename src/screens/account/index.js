import React from "react";
import { Linking } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar, Badge } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText } from "../../components/text";
import { NavHeader } from "../../components/nav-header";
import {
  FlexViewSpread,
  ListTouchableButtonWrapper,
  ListButtonText,
  styles
} from "./styles";
import { ContainerView, View, FlexView } from "../../components/views";
import { colors } from "../../utils/constants";
import InactiveUserBanner from "@components/banner"

const imgDoctor = require("../../../assets/images/Doctor.png");

@inject("store")
@observer
class AccountScreen extends React.Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

    constructor(props) {
      super(props);

      const {
        store: {
          userStore: {
            name,
            email,
            children
          }
        }
      } = props;

      this.state = {
        name,
        email,
        badges: children.map(value => value.name)
      };

  }

  openURL = url => {
    return Linking.openURL(url);
  };

  render() {
    const {
      navigation: { navigate },
      store: { userStore }
    } = this.props;
    const { name, email, badges } = this.state;
    return (
      <ContainerView padding={16}>
        <NavHeader title="Account" size="medium" hasBackButton={false} />
        <InactiveUserBanner userIsActive={userStore.active} />
        <View style={{ padding: 16 }}>
          <FlexView justifyContent="start">
            <Avatar rounded size={80} source={imgDoctor} />
            <View style={{ paddingLeft: 20 }}>
              <StyledText fontSize={16}>{name}</StyledText>
              <StyledText fontSize={16} fontFamily="FlamaLight">
                {email}
              </StyledText>
            </View>
          </FlexView>
          <FlexViewSpread style={{ paddingTop: 30 }}>
            {badges.map(badge => (
              <Badge
                key={badge}
                value={badge}
                textStyle={styles.badgeText}
                badgeStyle={styles.badge}
              />
            ))}
          </FlexViewSpread>
        </View>
        <View style={{ paddingTop: 16, paddingBottom: 16 }}>
          <ListTouchableButtonWrapper
            onPress={() => navigate("AccountSettings")}
          >
            <ListButtonText>Settings</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
          <ListTouchableButtonWrapper
            onPress={() => navigate("AccountPayment")}
          >
            <ListButtonText>Payment</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
          <ListTouchableButtonWrapper
            onPress={() => this.openURL("mailto:help@opear.com")}
          >
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
