import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FormWrapper } from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { updateParent } from "@services/opear-api"

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

    this.state = {
      email
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
        userStore: { id, email }
      }
    } = this.props;

    const data = {
      parent: {
        email
      }
    };

    const successHandler = () => {
      userStore.setEmail(email);

      goBack();
    };

    updateParent(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack }
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
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Email"
              value={email}
              onChangeText={this.handleInputChange("email")}
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
