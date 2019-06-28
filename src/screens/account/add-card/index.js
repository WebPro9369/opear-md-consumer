/* eslint-disable no-else-return */
/* eslint-disable import/no-unresolved */
import React from "react";
import stripe from "tipsi-stripe";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createPaymentAccount } from "@services/opear-api";
import InactiveUserBanner from "@components/banner";
import { FormTextInput } from "../../../components/text";
import { FormMaskedTextInput } from "../../../components/text-masked";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  FlexView,
  FormWrapper,
  TouchableView
} from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";

@inject("store")
@observer
class AddCardScreen extends React.Component {
  propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      navigation: {
        state: { params }
      }
    } = this.props;

    this.state = {
      loading: false,
      isEditing: params && params.last4 && params.last4.length === 4,
      last4: params && params.last4
    };
  }

  saveCardHandler = async () => {
    const {
      navigation: { goBack, getParam, navigate },
      store: { cardStore, userStore }
    } = this.props;
    const { id } = userStore;
    const {
      cardNumber,
      expiryYear,
      expiryMonth,
      cvv,
      fullName
    } = cardStore.cardInfo;

    const params = {
      number: cardNumber,
      expMonth: expiryMonth,
      expYear: expiryYear,
      cvc: cvv,
      name: fullName
    };

    this.setState({ loading: true });

    try {
      const token = await stripe.createTokenWithCard(params);

      createPaymentAccount(
        id,
        {
          payment_account: {
            token_id: token.tokenId
          }
        },
        {
          successHandler: res => {
            this.setState({ loading: false });

            if (res.status === 200) {
              userStore.addPaymentAccount(res.data);
              this.previousScreen();
            } else {
              Alert.alert("Error", "There was an error saving your card.");
            }
          },
          errorHandler: () => {
            Alert.alert("Error", "There was an error saving your card.");
            this.setState({ loading: false });
          }
        }
      );
    } catch (e) {
      Alert.alert("Error", "There was an error saving your card.");
      this.setState({ loading: false });
    }
  };

  previousScreen() {
    const {
      navigation: { getParam, navigate, goBack }
    } = this.props;

    const screenRef = getParam("screenRef", null);

    if (screenRef) {
      navigate("DashboardPaymentDefault", { screenRef });
    } else {
      goBack();
    }
  }

  render() {
    const {
      navigation: { navigate },
      store: { cardStore, userStore }
    } = this.props;

    const { cardInfo } = cardStore;
    const { cardNumber, expiryYear, expiryMonth, cvv, fullName } =
      cardInfo || {};

    const { loading, isEditing, last4 } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title={isEditing ? "Edit Card" : "Add Card"}
          size="medium"
          onPressBackButton={() => {
            cardStore.setCardInfo({
              cardNumber: "",
              expiryYear: "",
              expiryMonth: "",
              cvv: ""
            });
            this.previousScreen();
          }}
          hasBackButton
        />
        <InactiveUserBanner userIsActive={userStore.active} />
        <FormWrapper>
          <FormInputView>
            <FormMaskedTextInput
              label="Card Number"
              value={cardNumber}
              placeholder={
                isEditing
                  ? `Current Card ending in ${last4}`
                  : "1234 5678 3456 2456"
              }
              maskOptions={{ mask: "9999 9999 9999 9999" }}
              onChangeText={value =>
                cardStore.setCardInfo({
                  ...cardInfo,
                  cardNumber: value
                })
              }
              rightIcon={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <TouchableView onPress={() => navigate("PaymentScanCard")}>
                  <FontAwesome
                    name="camera"
                    size={30}
                    color={colors.LIGHTGREEN}
                  />
                </TouchableView>
              }
            />
          </FormInputView>
          <FormInputView>
            <FlexView>
              <FormTextInput
                label="Exp. Month"
                value={expiryMonth}
                placeholder="MM"
                maxLength={2}
                style={{
                  width: 120,
                  marginRight: 40
                }}
                onChangeText={value =>
                  cardStore.setCardInfo({
                    ...cardInfo,
                    expiryMonth: Number(value)
                  })
                }
              />
              <FormTextInput
                label="Exp. Year"
                value={expiryYear}
                placeholder="YY"
                maxLength={2}
                onChangeText={value =>
                  cardStore.setCardInfo({
                    ...cardInfo,
                    expiryYear: Number(value)
                  })
                }
                style={{
                  width: 120,
                  marginRight: 40
                }}
              />
              <FormMaskedTextInput
                label="CVV"
                value={cvv}
                placeholder="123"
                maskOptions={{ mask: "999" }}
                onChangeText={value =>
                  cardStore.setCardInfo({ ...cardInfo, cvv: value })
                }
                style={{
                  width: 120
                }}
              />
            </FlexView>
          </FormInputView>
          <FormInputView>
            <FormTextInput
              label="Full Name"
              value={fullName}
              onChangeText={value =>
                cardStore.setCardInfo({ ...cardInfo, fullName: value })
              }
              placeholder="Full Name"
            />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton
            title={!isEditing ? "Save Card" : "Edit Card"}
            onPress={async () => {
              await this.saveCardHandler();
            }}
            loading={loading}
          />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default AddCardScreen;
