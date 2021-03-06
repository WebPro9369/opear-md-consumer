/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import React from "react";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar, ButtonGroup } from "react-native-elements";
import { registerChild } from "@services/opear-api";
import InactiveUserBanner from "@components/banner";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { FormMaskedTextInput } from "@components/text-masked";
import { FormTextInput } from "../../../components/text";
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
import { avatarImages } from "../../../utils/constants";

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
      allergies: "",
      avatar_image_index: Math.floor(Math.random() * 4)
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateIndex = this.updateIndex.bind(this);

    this.inputRefs = {};
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
        "Please enter Date of Birth in mm/dd/yyyy format"
      );
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
        dob: new Date(dob),
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

    return registerChild(data, { successHandler });
  };

  updateIndex(gender) {
    this.setState({ gender });
  }

  render() {
    const {
      navigation,
      store: { userStore }
    } = this.props;
    const { goBack } = navigation;

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
        <DeeplinkHandler navigation={navigation} />
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
                returnKeyType="next"
                blurOnSubmit={false}
                ref={input => (this.inputRefs.firstName = input)}
                onSubmitEditing={() =>
                  this.inputRefs.lastName.getInnerRef().focus()
                }
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Last Name"
                value={last_name}
                onChangeText={this.handleInputChange("last_name")}
                placeholder="Last Name"
                returnKeyType="next"
                blurOnSubmit={false}
                ref={input => (this.inputRefs.lastName = input)}
                onSubmitEditing={() =>
                  this.inputRefs.birthDate.getInnerRef().focus()
                }
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
                returnKeyType="next"
                blurOnSubmit={false}
                ref={input => (this.inputRefs.birthDate = input)}
                onSubmitEditing={() =>
                  this.inputRefs.birthHistory.getInnerRef().focus()
                }
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Birth History"
                value={birth_history}
                placeholder="Birth History"
                onChangeText={this.handleInputChange("birth_history")}
                returnKeyType="next"
                blurOnSubmit={false}
                ref={input => (this.inputRefs.birthHistory = input)}
                onSubmitEditing={() =>
                  this.inputRefs.surgicalHistory.getInnerRef().focus()
                }
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Surgical History"
                value={surgical_history}
                placeholder="Surgical History"
                onChangeText={this.handleInputChange("surgical_history")}
                returnKeyType="next"
                blurOnSubmit={false}
                ref={input => (this.inputRefs.surgicalHistory = input)}
                onSubmitEditing={() =>
                  this.inputRefs.currentMedications.getInnerRef().focus()
                }
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medications"
                value={current_medications}
                placeholder="Current Medications"
                onChangeText={this.handleInputChange("current_medications")}
                returnKeyType="next"
                blurOnSubmit={false}
                ref={input => (this.inputRefs.currentMedications = input)}
                onSubmitEditing={() =>
                  this.inputRefs.hospitalizations.getInnerRef().focus()
                }
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Hospitalizations"
                value={hospitalizations}
                placeholder="Hospitalizations"
                onChangeText={this.handleInputChange("hospitalizations")}
                returnKeyType="next"
                blurOnSubmit={false}
                ref={input => (this.inputRefs.hospitalizations = input)}
                onSubmitEditing={() =>
                  this.inputRefs.allergies.getInnerRef().focus()
                }
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Allergies"
                value={allergies}
                placeholder="Allergies"
                onChangeText={this.handleInputChange("allergies")}
                returnKeyType="next"
                blurOnSubmit={false}
                ref={input => (this.inputRefs.allergies = input)}
                onSubmitEditing={() =>
                  this.inputRefs.currentMedicalConditions.getInnerRef().focus()
                }
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
                ref={input => (this.inputRefs.currentMedicalConditions = input)}
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
