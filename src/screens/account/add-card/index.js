import React from "react";
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
import { updateParent } from "@services/opear-api"

@inject("store")
@observer
class AddCardScreen extends React.Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

    constructor(props) {
      super(props);

      const {
        cardNumber, expiryDate, cvv, fullName
      } = this.props;

      this.state = {
        cardNumber, expiryDate, cvv, fullName
      };

      this.handleInputChange = this.handleInputChange.bind(this);
  };

  handleInputChange = name => value => {
    return this.setState({
      [name]: value
    });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: {
        userStore
      }
    } = this.props;

    const { cardNumber, expiryDate, cvv, fullName } = this.state;

    var expiryArray = expiryDate.split("/")

    var expiryYear = expiryArray[0];
    var expiryMonth = expiryArray[1];

    userStore.addPaymentMethod({
      id: userStore.paymentMethods.length,
      type: "Card",
      cardNumber: parseInt(cardNumber),
      expiryYear: parseInt(expiryYear),
      expiryMonth: parseInt(expiryMonth),
      cvv: parseInt(cvv),
      fullName
    });

    const data = {
      paymentMethods: userStore.paymentMethods
    }

    const successHandler = () => {

      goBack();
    };

    updateParent(userStore.id,data,{ successHandler});
  }


  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { cardNumber, expiryDate, cvv, fullName } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Add Card"
          size="medium"
          onPressBackButton={() => goBack()}
          hasBackButton
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Card Number"
              value={cardNumber}
              placeholder="1234 5678 3456 2456"
              onChangeText={this.handleInputChange("cardNumber")}
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
                label="Exp. Date"
                value={ expiryDate }
                onChangeText={this.handleInputChange("expiryDate")}
                placeholder="## / ##"
                style={{
                  width: 120,
                  marginRight: 40
                }}
              />
              <FormTextInput
                label="CVV"
                value={cvv}
                placeholder="###"
                onChangeText={this.handleInputChange("cvv")}
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
              placeholder="Full Name"
              onChangeText={this.handleInputChange("fullName")}
            />
          </FormInputView>
        </FormWrapper>
        <ServiceButton title="Add Card" onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    );
  };
}


export default AddCardScreen;
