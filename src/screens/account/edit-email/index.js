import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { updateParent } from "@services/opear-api";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FormWrapper } from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import InactiveUserBanner from "@components/banner"

@inject("store")
@observer
class EditEmailScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore: { email }
      }
    } = props;

    this.state = { email };
  }

  handleChange = email => {
    this.setState({ email });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;

    const { id } = userStore;
    const { email } = this.state;
    const data = { email };

    const successHandler = () => {
      userStore.setEmail(email);

      goBack();
    };

    updateParent(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;
    const { email } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit email"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <InactiveUserBanner userIsActive={userStore.active} />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Email"
              value={email}
              onChangeText={this.handleChange}
            />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton title="Update Email" onPress={this.onSubmit} />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default EditEmailScreen;
