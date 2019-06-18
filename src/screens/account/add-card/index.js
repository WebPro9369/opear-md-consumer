import React from "react";
import stripe from "tipsi-stripe";
import { inject, observer, PropTypes } from "mobx-react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FormTextInput } from "../../../components/text";
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
import { createPaymentAccount } from "../../../services/opear-api";

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
      isEditing: params && params.last4 && params.last4.length == 4,
      last4: params && params.last4
    };
  }

  saveCardHandler = async () => {
    const {
      navigation: { goBack },
      store: {
        cardStore,
        currentUserStore
      }
    } = this.props;
    const { id } = currentUserStore;
    const {
      cardInfo: { cardNumber, expiryYear, expiryMonth, cvv, fullName }
    } = cardStore;

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
        }, {
          successHandler: res => {
            currentUserStore.addPaymentAccount(res.data.paymentAccount);
            this.setState({ loading: false });

            goBack();
          },
          errorHandler: () => {
            this.setState({ loading: false });
          }
        }
      );
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      navigation: { goBack, navigate },
      store: { cardStore }
    } = this.props;

    const {
      cardInfo
    } = cardStore;

    const { cardNumber, expiryYear, expiryMonth, cvv, fullName } = cardInfo;

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
            goBack();
          }}
          hasBackButton
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Card Number"
              value={cardNumber}
              placeholder={
                isEditing
                  ? `Current Card ending in ${last4}`
                  : "1234 5678 3456 2456"
              }
              onChangeText={value =>
                cardStore.setCardInfo({ ...cardInfo, cardNumber: value })
              }
              leftIcon={
                <FontAwesome name="cc-visa" size={30} color={colors.BLUE} />
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
                onChangeText={value =>
                  cardStore.setCardInfo({ ...cardInfo, expiryMonth: value })
                }
                placeholder="##"
                style={{
                  width: 120,
                  marginRight: 40
                }}
              />
              <FormTextInput
                label="Exp. Year"
                value={expiryYear}
                onChangeText={value =>
                  cardStore.setCardInfo({ ...cardInfo, expiryYear: value })
                }
                placeholder="##"
                style={{
                  width: 120,
                  marginRight: 40
                }}
              />
              <FormTextInput
                label="CVV"
                value={cvv}
                placeholder="###"
                onChangeText={value => cardStore.setCardInfo({ ...cardInfo, cvv: value })}
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
              onChangeText={value => cardStore.setCardInfo({ ...cardInfo, fullName: value })}
              placeholder="Full Name"
            />
          </FormInputView>
        </FormWrapper>
        <ServiceButton
          title={!isEditing ? "Save Card" : "Edit Card"}
          onPress={async () => {
            await this.saveCardHandler();
          }}
          loading={loading}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default AddCardScreen;
