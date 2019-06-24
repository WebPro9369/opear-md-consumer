import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import {
  ContainerView,
  HeaderWrapper,
  FlexView,
  FormWrapper
} from "../../../components/views";
import { FormInputView } from "../../../components/views/keyboard-view";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";

import { colors } from "../../../utils/constants";
import { updateParent } from "@services/opear-api"

const { LIGHTGREEN } = colors;

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
          userStore: {
            address: { name, street, city, zip_code }
          }
        }
      } = props;

      this.state = {
        name,
        street,
        city,
        zip_code
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

    const { street, city, zip_code, name } = this.state;
    const data = {
      parent: {
        address: [
          {
            name,
            street,
            city,
            zip: zip_code
          }
        ]
      }
    };

    const successHandler = () => {
      address
        .setName(name)
        .setStreet(street)
        .setCity(city)
        .setZipCode(zip_code);

      goBack();
    };

    updateParent(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { street, city, zip_code, name } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit Address"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Address"
              value={street}
              onChangeText={this.handleInputChange("street")}
              rightIcon={
                <FontAwesome name="map-marker" size={30} color={LIGHTGREEN} />
              }
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
                value={zip_code}
                onChangeText={this.handleInputChange("zip_code")}
              />
            </FlexView>
          </FormInputView>
          <FormInputView>
            <FormTextInput label="Location Name" value={name}
            onChangeText={this.handleInputChange("city")} />
          </FormInputView>
        </FormWrapper>
        <ServiceButton title="Update Address" onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

export default EditAddressScreen;
