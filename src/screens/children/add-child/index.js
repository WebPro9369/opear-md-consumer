/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar, ButtonGroup } from "react-native-elements";
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
import { colors } from "../../../utils/constants";
import { registerChild } from "@services/opear-api";
import { getAge } from "@utils";

const avatarImages = [];
avatarImages[0] = require("../../../../assets/images/Fox.png");
avatarImages[1] = require("../../../../assets/images/chicken.png");
avatarImages[2] = require("../../../../assets/images/Dog.png");
avatarImages[3] = require("../../../../assets/images/Tiger.png");

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
      firstName: "",
      lastName: "",
      birthDate: null,
      birthHistory: "",
      surgicalHistory: "",
      currentMedications: "",
      hospitalizations: "",
      currentMedicalConditions: "",
      allergies: [],
      avatarNumber: Math.floor(Math.random() * 4)
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
      firstName,
      lastName,
      birthDate,
      birthHistory,
      surgicalHistory,
      currentMedications,
      hospitalizations,
      currentMedicalConditions,
      allergies
    } = this.state;

    let allergiesArray = [];

    if (allergies.indexOf(",") > -1) {
      allergiesArray = allergies.split(", ");
    } else {
      allergiesArray = allergies;
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
        first_name: firstName,
        last_name: lastName,
        gender: genderMap,
        dob: birthDate,
        allergies: allergiesArray,
        birth_history: birthHistory,
        current_medications: currentMedications,
        current_medical_conditions: currentMedicalConditions,
        surgical_history: surgicalHistory,
        hospitalizations
      }
    };

    // const age = getAge(birthDate);

    const successHandler = response => {
      const {
        id,
        // parent_id,
        first_name,
        last_name,
        gender,
        dob,
        allergies,
        birth_history,
        current_medications,
        current_medical_conditions,
        surgical_history,
        hospitalizations
      } = response.data;

      const newChild = {
        id,
        age: getAge(dob),
        gender,
        name: `${first_name} ${last_name}`,
        birthDate: new Date(dob),
        allergies: (allergies || "").split(", "),
        birthHistory: birth_history || "",
        surgicalHistory: surgical_history || "",
        currentMedications: current_medications || "",
        currentMedicalConditions: current_medical_conditions || "",
        hospitalizations: hospitalizations || ""
      };

      userStore.addChild(newChild);
      goBack();
    };

    registerChild(data, { successHandler });
  };

  updateIndex(gender) {
    this.setState({ gender });
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const buttons = ["Male", "Female", "Non-Binary"];
    const {
      gender,
      firstName,
      lastName,
      birthDate,
      birthHistory,
      surgicalHistory,
      currentMedications,
      hospitalizations,
      currentMedicalConditions,
      allergies,
      avatarNumber
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
        <KeyboardScrollView>
          <ViewCentered>
            <Avatar
              rounded
              size={120}
              source={avatarImages[avatarNumber]}
              showEditButton
              editButton={{
                iconStyle: {
                  color: colors.WHITE
                },
                size: 24
              }}
            />
          </ViewCentered>
          <FormWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="First Name"
                value={firstName}
                onChangeText={this.handleInputChange("firstName")}
                placeholder="First Name"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Last Name"
                value={lastName}
                onChangeText={this.handleInputChange("lastName")}
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
              <FormTextInput
                label="Birth Date"
                value={birthDate}
                placeholder="xx / xx / xxxx"
                onChangeText={this.handleInputChange("birthDate")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Birth History"
                value={birthHistory}
                placeholder="Birth History"
                onChangeText={this.handleInputChange("birthHistory")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Surgical History"
                value={surgicalHistory}
                placeholder="Surgical History"
                onChangeText={this.handleInputChange("surgicalHistory")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medications"
                value={currentMedications}
                placeholder="Current Medications"
                onChangeText={this.handleInputChange("currentMedications")}
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
                value={currentMedicalConditions}
                placeholder="Current Medical Conditions"
                onChangeText={this.handleInputChange(
                  "currentMedicalConditions"
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
