/* eslint-disable import/no-unresolved */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import InactiveUserBanner from "@components/banner";
import { updateParent } from "@services/opear-api";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { FlexView, FormWrapper } from "../../../components/views";

@inject("store")
@observer
class EditAddressScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore: { addresses }
      }
    } = props;

    const address = addresses.length ? addresses[addresses.length - 1] : {};
    const { name, street, city, zip } = address;

    this.state = {
      // id,
      name,
      street,
      city,
      // state,
      zip
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
        userStore: { id, address }
      }
    } = this.props;

    const { street, city, zip, name } = this.state;
    const data = {
      parent: {
        address: [
          {
            name,
            street,
            city,
            zip
          }
        ]
      }
    };

    const successHandler = () => {
      address
        .setName(name)
        .setStreet(street)
        .setCity(city)
        .setZipCode(zip);

      goBack();
    };

    updateParent(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;
    const { street, city, zip, name } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit Address"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <InactiveUserBanner userIsActive={userStore.active} />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Address"
              value={street}
              onChangeText={this.handleInputChange("street")}
              // rightIcon={ <FontAwesome name="map-marker" size={30} color={LIGHTGREEN} /> }
            />
          </FormInputView>
          <FormInputView>
            <FlexView>
              <FormTextInput
                label="City"
                style={{
                  width: 120,
                  marginRight: 40
                }}
                value={city}
                onChangeText={this.handleInputChange("city")}
              />
              <FormTextInput
                label="Zip"
                style={{
                  width: 120
                }}
                value={zip}
                onChangeText={this.handleInputChange("zip_code")}
              />
            </FlexView>
          </FormInputView>
          <FormInputView>
            <FormTextInput
              label="Location Name"
              value={name}
              onChangeText={this.handleInputChange("city")}
            />
          </FormInputView>
        </FormWrapper>
        <ServiceButton title="Update Address" onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

export default EditAddressScreen;
