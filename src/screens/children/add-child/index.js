/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import React from "react";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar, ButtonGroup } from "react-native-elements";
import { registerChild } from "@services/opear-api";
import InactiveUserBanner from "@components/banner";
import { FormTextInput } from "../../../components/text";
import { FormMaskedTextInput } from "@components/text-masked";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  ContainerView,
  FormInputWrapper,
  HeaderWrapper,
  FormWrapper,
  ViewCentered
} from "../../../components/views";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { colors, avatarImages } from "../../../utils/constants";
import { getAge } from "@utils";

@inject("store")
@observer
class AddChildScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      gender: "",
      first_name: "",
      last_name: "",
      dob: null,
      birth_history: "",
      surgical_history: "",
      current_medications: "",
      hospitalizations: "",
      current_medical_conditions: "",
      allergies: ","
      avatar_image_index: Math.floor(Math.random() * 4)
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
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

    const {
      gender,
      first_name,
      last_name,
      dob,
      birth_history,
      surgical_history,
      current_medications,
      hospitalizations,
      current_medical_conditions,
      allergies,
      avatar_image_index
    } = this.state;

    const dateRegex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const dateRegex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

    if (!dateRegex1.test(dob) && !dateRegex2.test(dob)) {
      return Alert.alert(
        "There was an issue",
        "Please enter Date of Birth in mm/dd/yyyy format");
    }

    let genderMap = 0;

    if (gender === 0) {
      genderMap = "Male";
    } else if (gender === 1) {
      genderMap = "Female";
    } else {
      genderMap = "Non-Binary";
    }

    const data = {
      child: {
        first_name,
        last_name,
        gender: genderMap,
        dob,
        allergies,
        birth_history,
        current_medications,
        current_medical_conditions,
        surgical_history,
        hospitalizations,
        avatar_image_index
      }
    };

    const successHandler = response => {
      userStore.addChild(response.data);
      goBack();
    };

    registerChild(data, { successHandler });
  };

  updateIndex(gender) {
    this.setState({ gender });
  }

  render() {
    const {
      navigation: { goBack },
      store: { userStore }
    } = this.props;
    const buttons = ["Male", "Female", "Non-Binary"];
    const {
      gender,
      first_name,
      last_name,
      dob,
      birth_history,
      surgical_history,
      current_medications,
      hospitalizations,
      current_medical_conditions,
      allergies,
      avatar_image_index
    } = this.state;

    return (
      <ContainerView behavior="padding" enabled>
        <HeaderWrapper>
          <NavHeader
            title="Add Child"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <InactiveUserBanner userIsActive={userStore.active} />
        <KeyboardScrollView>
          <ViewCentered>
            <Avatar
              rounded
              size={120}
              source={avatarImages[avatar_image_index]}
              showEditButton={false}
            />
          </ViewCentered>
          <FormWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="First Name"
                value={first_name}
                onChangeText={this.handleInputChange("first_name")}
                placeholder="First Name"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Last Name"
                value={last_name}
                onChangeText={this.handleInputChange("last_name")}
                placeholder="Last Name"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={gender}
                buttons={buttons}
                containerStyle={{ height: 40 }}
              />
            </FormInputWrapper>
            <FormInputWrapper>
            <FormMaskedTextInput
              label="Birth Date"
              value={dob}
              placeholder="mm/dd/yyyy"
              keyboardType="number-pad"
              maskOptions={{ mask: "99/99/9999" }}
              onChangeText={this.handleInputChange("dob")}
            />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Birth History"
                value={birth_history}
                placeholder="Birth History"
                onChangeText={this.handleInputChange("birth_history")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Surgical History"
                value={surgical_history}
                placeholder="Surgical History"
                onChangeText={this.handleInputChange("surgical_history")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medications"
                value={current_medications}
                placeholder="Current Medications"
                onChangeText={this.handleInputChange("current_medications")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Hospitalizations"
                value={hospitalizations}
                placeholder="Hospitalizations"
                onChangeText={this.handleInputChange("hospitalizations")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Allergies"
                value={allergies}
                placeholder="Allergies"
                onChangeText={this.handleInputChange("allergies")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medical Conditions"
                value={current_medical_conditions}
                placeholder="Current Medical Conditions"
                onChangeText={this.handleInputChange(
                  "current_medical_conditions"
                )}
              />
            </FormInputWrapper>
          </FormWrapper>
          <FormInputWrapper style={{ marginBottom: 20 }}>
            <ServiceButton title="Add Child" onPress={this.onSubmit} />
          </FormInputWrapper>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default AddChildScreen;
