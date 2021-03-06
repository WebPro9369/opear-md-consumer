import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { StyledText } from "../../../components/text";
import { StyledMaskedTextInput } from "../../../components/text-masked";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { View, FormView } from "./styles";
import { FormWrapper } from "../../../components/views";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { updateParent } from "@services/opear-api"
import InactiveUserBanner from "@components/banner"
import { DeeplinkHandler } from "@components/deeplink-handler";

@inject("store")
@observer
class EditPhoneNumberScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore: { phone }
      }
    } = props;

    this.state = { phone };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = name => value => {
    return this.setState({
      [name]: value
    });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;

    const { id } = userStore;
    const { phone } = this.state;
    const data = { phone };

    const successHandler = () => {
      userStore.setPhone(phone);

      goBack();
    };

    updateParent(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;
    const { phone } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <DeeplinkHandler navigation={this.props.navigation}/>
        <NavHeader
          title="Edit phone number"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <InactiveUserBanner userIsActive={userStore.active} />
        <FormWrapper>
          <StyledText fontSize={14}>Phone number</StyledText>
          <View>
            <StyledMaskedTextInput
              fontSize={28}
              autoFocus
              placeholder="(123) 456 - 7890"
              keyboardType="number-pad"
              type="custom"
              options={{ mask: "(999) 999-9999" }}
              value={phone}
              onChangeText={this.handleInputChange("phone")}
            />
          </View>
        </FormWrapper>
        <View>
          <ServiceButton title="Update Phone" onPress={this.onSubmit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EditPhoneNumberScreen;
