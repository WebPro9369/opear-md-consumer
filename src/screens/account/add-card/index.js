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

const AddCardScreen = ({
  navigation: { goBack, navigate },
  store: { userStore }
}) => {
  const {
    cardInfo: { cardNumber, expiryYear, expiryMonth, cvv, fullName }
  } = userStore;

  const data = {
    parent: {
      cardInfo: userStore.cardInfo
    }
  }

  console.tron.log(data);

  onSubmit = () => {

    const successHandler = () => {
      userStore.setCardInfo(cardInfo);
      goBack();
    };

    updateParent(userStore.id,data,{ successHandler});

  }

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
              value={
                expiryYear && expiryMonth
                  ? `${expiryYear} / ${expiryMonth}`
                  : null
              }
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
          />
        </FormInputView>
      </FormWrapper>
      <ServiceButton title="Add Card" onPress={() => onSubmit()} />
    </KeyboardAvoidingView>
  );
};

AddCardScreen.propTypes = {
  store: PropTypes.observableObject.isRequired
};

export default inject("store")(observer(AddCardScreen));
