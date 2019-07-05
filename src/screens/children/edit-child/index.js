/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from "react";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar, ButtonGroup } from "react-native-elements";
import InactiveUserBanner from "@components/banner";
import { updateChild } from "@services/opear-api";
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
import { avatarImages } from "../../../utils/constants";
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
    const birthDate = getFormattedDate(new Date(child.dob));

    this.state = {
      childID,
      ...child,
      birthDate
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
      first_name,
      last_name,
      birthDate,
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

    if (!dateRegex1.test(birthDate) && !dateRegex2.test(birthDate)) {
      return Alert.alert(
        "There was an issue",
        "Please enter Date of Birth in mm/dd/yyyy format");
    }

    const data = {
      child: {
        first_name,
        last_name,
        gender,
        dob: birthDate.toISOString(),
        allergies,
        birth_history,
        current_medications,
        current_medical_conditions,
        surgical_history,
        hospitalizations,
        avatar_image_index
      }
    };

    const successHandler = res => {
      const index = getIndexByValue(userStore.children, childID);

      userStore.setChild(index, res.data);
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
      first_name,
      last_name,
      birthDate,
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
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Last Name"
                value={last_name}
                onChangeText={this.handleInputChange("last_name")}
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
                value={birth_history}
                onChangeText={this.handleInputChange("birth_history")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Surgical History"
                value={surgical_history}
                onChangeText={this.handleInputChange("surgical_history")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medications"
                value={current_medications}
                onChangeText={this.handleInputChange("current_medications")}
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
                value={allergies}
                onChangeText={this.handleInputChange("allergies")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medical Conditions"
                value={current_medical_conditions}
                onChangeText={this.handleInputChange(
                  "current_medical_conditions"
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
