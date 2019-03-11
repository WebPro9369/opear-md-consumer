import React from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import {
  TouchableWrapper,
  ListTouchableButtonWrapper,
  ListButtonText
} from "./styles";
import { ContainerView, View, FlexView } from "../../../components/views";
import { colors } from "../../../utils/constants";

class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethods: [
        { id: 1, type: "Paypal" },
        { id: 2, type: "Card", number: "****4985" },
        { id: 3, type: "Card", number: "****5827" }
      ]
    };
  }

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { paymentMethods } = this.state;
    return (
      <ContainerView padding={16}>
        <NavHeader
          title="Payment settings"
          size="medium"
          hasBackButton
          onPressBackButton={() => navigate("Account")}
        />
        <View>
          <View style={{ paddingTop: 16, paddingBottom: 16 }}>
            {paymentMethods.map(pm => {
              if (pm.type === "Card") {
                return (
                  <ListTouchableButtonWrapper
                    key={pm.id}
                    onPress={() => navigate("EditCard")}
                  >
                    <FlexView justifyContent="start">
                      <FontAwesome
                        name="cc-visa"
                        size={30}
                        color={colors.BLUE}
                        style={{ marginRight: 16 }}
                      />
                      <ListButtonText>{pm.number}</ListButtonText>
                    </FlexView>
                    <FontAwesome
                      name="angle-right"
                      color={colors.MIDGREY}
                      size={24}
                    />
                  </ListTouchableButtonWrapper>
                );
              }
              if (pm.type === "Paypal") {
                return (
                  <ListTouchableButtonWrapper key={pm.id}>
                    <FlexView justifyContent="start">
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
                );
              }

              return null;
            })}
          </View>
          <View style={{ marginTop: 16, marginLeft: 28 }}>
            <TouchableWrapper onPress={() => navigate("AddCard")}>
              <FlexView justifyContent="start">
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
