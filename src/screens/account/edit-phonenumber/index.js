import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import PhoneInput from "react-native-phone-input";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { View, FormView } from "./styles";
import { FormWrapper } from "../../../components/views";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { updateParent } from "@services/opear-api"

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
          userStore: {
            phone
          }
        }
      } = props;

      this.state = {
        phone
      };

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
      store: {
        userStore: { id, phone }
      }
    } = this.props;

    const data = {
      parent: {
        phone
        }
      };

    const successHandler = () => {
      userStore.setPhone(phone);

      goBack();
    };

    updateParent(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit phone number"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <StyledText fontSize={14}>Phone number</StyledText>
          <FormView>
            <PhoneInput
              onChangePhoneNumber={this.handleInputChange("phone")}
              ref={phone => {
                this.phone = phone;
              }}
            />
          </FormView>
        </FormWrapper>
        <View>
          <ServiceButton title="Update Phone" onPress={this.onSubmit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EditPhoneNumberScreen;
