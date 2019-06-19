import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import {
  TouchableWrapper,
  ListTouchableButtonWrapper,
  ListButtonText
} from "./styles";
import { ContainerView, View, FlexView } from "../../../components/views";
import { colors } from "../../../utils/constants";

@inject("store")
@observer
class PaymentScreen extends React.Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

  constructor(props) {
    super(props);
    const {
      store: {
        userStore: {
          paymentMethods
        }
      }
    } = props;

    this.state = {
      paymentMethods
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
          onPressBackButton={() => navigate("AccountDefault")}
        />
        <View>
          <View style={{ paddingTop: 16, paddingBottom: 16 }}>
            {paymentMethods.map(pm => {
              if (pm.type === "Card") {
                return (
                  <ListTouchableButtonWrapper
                    key={pm.id}
                    onPress={() => navigate("PaymentEditCard",{cardID: pm.id})}
                  >
                    <FlexView justifyContent="start">
                      <FontAwesome
                        name="cc-visa"
                        size={30}
                        color={colors.BLUE}
                        style={{ marginRight: 16 }}
                      />
                      <ListButtonText>{pm.cardNumber}</ListButtonText>
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
            <TouchableWrapper onPress={() => navigate("PaymentAddCard")}>
              <FlexView justifyContent="start">
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={colors.LIGHTGREEN}
                  style={{
                    marginRight: 24
                  }}
                />
                <StyledText fontFamily="FlamaMedium" fontSize={16}>
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
