import React from "react";
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

const avatarImages = [];
avatarImages[0] = require("../../../../assets/images/Fox.png");
avatarImages[1] = require("../../../../assets/images/chicken.png");
avatarImages[2] = require("../../../../assets/images/Dog.png");
avatarImages[3] = require("../../../../assets/images/Tiger.png");

class AddChildScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      firstName: null,
      lastName: null,
      birthDate: null,
      birthHistory: null,
      surgicalHistory: null,
      currentMedications: null,
      hospitalizations: null,
      currentMedicalConditions: null,
      allergies: null,
      avatarNumber: Math.floor(Math.random() * 4)
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const buttons = ["Male", "Female", "Non-Binary"];
    const {
      selectedIndex,
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
                placeholder="First Name"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Last Name"
                value={lastName}
                placeholder="Last Name"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 40 }}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Birth Date"
                value={birthDate}
                placeholder="xx / xx / xxxx"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Birth History"
                value={birthHistory}
                placeholder="Birth History"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Surgical History"
                value={surgicalHistory}
                placeholder="Surgical History"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medications"
                value={currentMedications}
                placeholder="Current Medications"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Hospitalizations"
                value={hospitalizations}
                placeholder="Hospitalizations"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Allergies"
                value={allergies}
                placeholder="Allergies"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medical Conditions"
                value={currentMedicalConditions}
                placeholder="Current Medical Conditions"
              />
            </FormInputWrapper>
          </FormWrapper>
          <FormInputWrapper style={{ marginBottom: 20 }}>
            <ServiceButton title="Add Child" onPress={() => goBack()} />
          </FormInputWrapper>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default AddChildScreen;
