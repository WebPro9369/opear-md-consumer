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
import { DeeplinkHandler } from "@components/deeplink-handler";

@inject("store")
@observer
class EditNameScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore: { name }
      }
    } = props;
    this.state = {
      name
    };
  }

  handleChange = name => {
    this.setState({ name });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;

    const { id } = userStore;
    const { name } = this.state;
    const data = { name };

    const successHandler = () => {
      userStore.setName(name);
      goBack();
    };

    updateParent(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;

    const { name } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <DeeplinkHandler navigation={this.props.navigation}/>
        <NavHeader
          title="Edit name"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Name"
              value={name}
              onChangeText={this.handleChange}
            />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton title="Update Name" onPress={this.onSubmit} />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default EditNameScreen;
