import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FlexView, FormWrapper } from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";
import { updateParent, getParent } from "@services/opear-api"

const { BLUE, LIGHTGREEN } = colors;

@inject("store")
@observer
class EditCardScreen extends React.Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

  constructor(props) {
    super(props);

    const {
      navigation,
      store: {
        userStore: {
          paymentMethods
        }
      },
      expiryDate
    } = props;

    const cardID = navigation.getParam('cardID',0);

    this.state = {
      paymentMethods,
      cardNumber: paymentMethods[cardID].cardNumber,
      expiryYear: paymentMethods[cardID].expiryYear,
      expiryMonth: paymentMethods[cardID].expiryMonth,
      cvv: paymentMethods[cardID].cvv,
      fullName: paymentMethods[cardID].fullName,
      expiryDate: paymentMethods[cardID].expiryYear+"/"+paymentMethods[cardID].expiryMonth
    };

    console.tron.log(this.state);
  }

  handleInputChange = name => value => {
    return this.setState({
      [name]: value
    });
  };

  onSubmit = () => {
    const {
      navigation,
      store: {
        userStore
      }
    } = this.props;

    const { cardNumber, expiryDate, cvv, fullName } = this.state;

    const cardID = navigation.getParam('cardID',0);

    var expiryArray = expiryDate.split("/")

    var expiryYear = expiryArray[0];
    var expiryMonth = expiryArray[1];

    userStore.setPaymentMethod(cardID,{
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
      navigation.goBack();
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
          title="Edit Card"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Card Number"
              leftIcon={<FontAwesome name="cc-visa" size={30} color={BLUE} />}
              rightIcon={
                <FontAwesome name="camera" size={30} color={LIGHTGREEN} />
              }
              value={cardNumber}
              onChangeText={this.handleInputChange("cardNumber")}
            />
          </FormInputView>
          <FormInputView>
            <FlexView>
              <FormTextInput
                label="Exp. Date"
                style={{
                  width: 120,
                  marginRight: 40
                }}
                value={expiryDate}
                onChangeText={this.handleInputChange("expiryDate")}
              />
              <FormTextInput
                label="CVV"
                style={{
                  width: 120
                }}
                value={cvv}
                onChangeText={this.handleInputChange("cvv")}
              />
            </FlexView>
          </FormInputView>
          <FormInputView>
            <FormTextInput label="Full Name" value={fullName}
            onChangeText={this.handleInputChange("fullName")} />
          </FormInputView>
        </FormWrapper>
        <ServiceButton title="Save Card" onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

export default EditCardScreen;
