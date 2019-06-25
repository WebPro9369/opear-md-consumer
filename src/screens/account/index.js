/* eslint-disable import/no-unresolved */
import React from "react";
import { Linking } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar, Badge } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { removeAuthentication } from "@services/authentication";
import { StyledText } from "../../components/text";
import { NavHeader } from "../../components/nav-header";
import {
  FlexViewSpread,
  ListTouchableButtonWrapper,
  ListButtonText,
  styles
} from "./styles";
import { ContainerView, View, FlexView } from "../../components/views";
import { ScrollView } from "../../components/views/scroll-view";
import { colors } from "../../utils/constants";

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
        userStore: { name, email, children }
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

  logOut = () => {
    const {
      navigation: { navigate }
    } = this.props;

    removeAuthentication();
    navigate("AccountSignIn");
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { name, email, badges } = this.state;
    return (
      <ScrollView padding={16}>
        <NavHeader title="Account" size="medium" hasBackButton={false} />
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
          <ListTouchableButtonWrapper onPress={this.logOut}>
            <ListButtonText>Log out</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
        </View>
      </ScrollView>
    );
  }
}

export default AccountScreen;
