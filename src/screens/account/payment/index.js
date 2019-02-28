import React from "react";
import { Avatar, Badge } from "react-native-elements";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { StyledText, StyledTextInput } from "../../../components/text";
import { InputButton } from "../../../components/input-button";
import { NavHeader } from "../../../components/nav-header";
import {
  ContainerView,
  View,
  FlexView,
  TouchableWrapper,
  ListTouchableButtonWrapper,
  ListButtonText
} from "./styles";
import { colors } from "../../../utils/constants";

class PaymentScreen extends React.Component {
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <ContainerView>
        <NavHeader
          title="Payment settings"
          size="medium"
          hasBackButton={true}
          onPressBackButton={() => navigate("Account")}
        />
        <View>
          <View style={{ paddingTop: 16, paddingBottom: 16 }}>
            <ListTouchableButtonWrapper>
              <FlexView>
                <FontAwesome
                  name="paypal"
                  size={30}
                  color={colors.BLUE}
                  style={{ marginRight: 16 }}
                />
                <ListButtonText>Paypal</ListButtonText>
              </FlexView>
              <FontAwesome
                name="angle-right"
                color={colors.MIDGREY}
                size={24}
              />
            </ListTouchableButtonWrapper>
            <ListTouchableButtonWrapper onPress={() => navigate("EditCard")}>
              <FlexView>
                <FontAwesome
                  name="cc-visa"
                  size={30}
                  color={colors.BLUE}
                  style={{ marginRight: 16 }}
                />
                <ListButtonText>****4985</ListButtonText>
              </FlexView>
              <FontAwesome
                name="angle-right"
                color={colors.MIDGREY}
                size={24}
              />
            </ListTouchableButtonWrapper>
            <ListTouchableButtonWrapper>
              <FlexView>
                <FontAwesome
                  name="cc-visa"
                  size={30}
                  color={colors.BLUE}
                  style={{ marginRight: 16 }}
                />
                <ListButtonText>****5827</ListButtonText>
              </FlexView>
              <FontAwesome
                name="angle-right"
                color={colors.MIDGREY}
                size={24}
              />
            </ListTouchableButtonWrapper>
          </View>
          <View style={{ marginTop: 16, marginLeft: 28 }}>
            <TouchableWrapper onPress={() => navigate("AddCard")}>
              <FlexView>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={colors.LIGHTGREEN}
                  style={{
                    marginRight: 24
                  }}
                />
                <StyledText fontFamily="Flama-Medium" fontSize={16}>
                  Add payment method
                </StyledText>
              </FlexView>
            </TouchableWrapper>
          </View>
        </View>
      </ContainerView>
    );
  }
}

export default PaymentScreen;
