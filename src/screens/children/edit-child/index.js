/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar, ButtonGroup } from "react-native-elements";
import InactiveUserBanner from "@components/banner";
import { getChild, updateChild } from "@services/opear-api";
import { FormTextInput } from "../../../components/text";
import { FormMaskedTextInput } from "@components/text-masked";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  ContainerView,
  FormInputWrapper,
  HeaderWrapper,
  FormWrapper,
  ViewCentered,
  View
} from "../../../components/views";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { colors, avatarImages } from "../../../utils/constants";
import { getAge, getValueById, getIndexByValue } from "@utils";
import { getFormattedDate } from "@utils/helpers";

const imgFoxLarge = require("../../../../assets/images/FoxLarge.png");

@inject("store")
@observer
class EditChildScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      navigation,
      store: {
        userStore: { children }
      }
    } = props;

    const childID = navigation.getParam("childID", 0);
    const child = getValueById(children, childID) || {};
    const nameSplitted = (child.name || "").split(" ");
    const firstName = nameSplitted[0];
    const lastName = nameSplitted.length > 1 ? nameSplitted[1] : "";
    const birthDate = getFormattedDate(new Date(child.birthDate));
    const avatarImageIndex = child.avatarImageIndex;

    this.state = {
      childID,
      ...child,
      firstName,
      lastName,
      birthDate,
      avatarImageIndex
    };

    this.updateIndex = this.updateIndex.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = name => value => {
    return this.setState({
      [name]: value
    });
  };

  onSubmit = () => {
    const {
      navigation,
      store: { userStore }
    } = this.props;

    const {
      childID,
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
      avatarImageIndex
    } = this.state;

    const dateRegex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const dateRegex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

    if (!dateRegex1.test(birthDate) && !dateRegex2.test(birthDate)) {
      return Alert.alert(
        "There was an issue",
        "Please enter Date of Birth in mm/dd/yyyy format");
    }

    let allergiesArray = [];

    if (allergies.indexOf(",") > -1) {
      allergiesArray = allergies.split(", ");
    } else {
      allergiesArray = allergies;
    }

    const data = {
      child: {
        first_name: firstName,
        last_name: lastName,
        gender,
        dob: birthDate,
        allergies: allergiesArray,
        birth_history: birthHistory,
        current_medications: currentMedications,
        current_medical_conditions: currentMedicalConditions,
        surgical_history: surgicalHistory,
        hospitalizations,
        avatar_image_index: avatarImageIndex
      }
    };

    const successHandler = res => {
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
        hospitalizations,
        avatar_image_index
      } = res.data;

      const editedChild = {
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
        hospitalizations: hospitalizations || "",
        avatarImageIndex: avatar_image_index || 0,
      };

      const index = getIndexByValue(userStore.children, childID);

      userStore.setChild(index, editedChild);
      navigation.goBack();
    };

    updateChild(childID, data, { successHandler });
  };

  updateIndex(index) {
    const buttons = ["Male", "Female", "Non-Binary"];
    this.setState({ gender: buttons[index] });
  }

  render() {
    const { navigation,
      store:
      {
        userStore: { active }
      }
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
      avatarImageIndex
    } = this.state;

    return (
      <ContainerView behavior="padding" enabled>
        <HeaderWrapper>
          <NavHeader
            title="Edit Child"
            size="medium"
            hasBackButton
            onPressBackButton={() => navigation.goBack()}
          />
        </HeaderWrapper>
        <InactiveUserBanner userIsActive={active} />
        <KeyboardScrollView>
          <ViewCentered>
            <Avatar
              rounded
              size={120}
              source={avatarImages[avatarImageIndex]}
              showEditButton={false}
            />
          </ViewCentered>
          <FormWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="First Name"
                value={firstName}
                onChangeText={this.handleInputChange("firstName")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Last Name"
                value={lastName}
                onChangeText={this.handleInputChange("lastName")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={buttons.indexOf(gender)}
                buttons={buttons}
                containerStyle={{ height: 40 }}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormMaskedTextInput
                label="Birth Date"
                value={birthDate}
                keyboardType="number-pad"
                maskOptions={{ mask: "99/99/9999" }}
                onChangeText={this.handleInputChange("birthDate")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Birth History"
                value={birthHistory}
                onChangeText={this.handleInputChange("birthHistory")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Surgical History"
                value={surgicalHistory}
                onChangeText={this.handleInputChange("surgicalHistory")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medications"
                value={currentMedications}
                onChangeText={this.handleInputChange("currentMedications")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Hospitalizations"
                value={hospitalizations}
                onChangeText={this.handleInputChange("hospitalizations")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Allergies"
                value={allergies.join(", ")}
                onChangeText={this.handleInputChange("allergies")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medical Conditions"
                value={currentMedicalConditions}
                onChangeText={this.handleInputChange(
                  "currentMedicalConditions"
                )}
              />
            </FormInputWrapper>
          </FormWrapper>
          <View style={{ marginBottom: 20 }}>
            <ServiceButton title="Save Changes" onPress={this.onSubmit} />
          </View>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default EditChildScreen;
