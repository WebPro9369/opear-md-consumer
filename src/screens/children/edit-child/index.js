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
  ViewCentered,
  View
} from "../../../components/views";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { colors } from "../../../utils/constants";

const imgFoxLarge = require("../../../../assets/images/FoxLarge.png");

class EditChildScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      firstName: "Henry",
      lastName: "Smith",
      birthDate: "05 / 19 / 2003",
      birthHistory: "Birth History",
      surgicalHistory: "Surgical History",
      currentMedications: "Current Medications",
      hospitalizations: "Hospitalizations",
      currentMedicalConditions: "Current Medical Conditions",
      allergies: "Allergies"
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
      allergies
    } = this.state;
    return (
      <ContainerView behavior="padding" enabled>
        <HeaderWrapper>
          <NavHeader
            title="Edit Child"
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
              source={imgFoxLarge}
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
              <FormTextInput label="First Name" value={firstName} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Last Name" value={lastName} />
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
              <FormTextInput label="Birth Date" value={birthDate} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Birth History" value={birthHistory} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Surgical History" value={surgicalHistory} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medications"
                value={currentMedications}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Hospitalizations"
                value={hospitalizations}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Allergies" value={allergies} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medical Conditions"
                value={currentMedicalConditions}
              />
            </FormInputWrapper>
          </FormWrapper>
          <View style={{ marginBottom: 20 }}>
            <ServiceButton title="Save Changes" onPress={() => goBack()} />
          </View>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default EditChildScreen;
