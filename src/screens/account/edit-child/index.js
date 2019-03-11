import React from "react";
import { Avatar, ButtonGroup } from "react-native-elements";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import {
  ContainerView,
  View,
  HeaderWrapper,
  FormWrapper,
  ViewCentered
} from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
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
        <ScrollView>
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
            <View>
              <FormTextInput label="First Name" value={firstName} />
            </View>
            <View>
              <FormTextInput label="Last Name" value={lastName} />
            </View>
            <View>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 40 }}
              />
            </View>
            <View>
              <FormTextInput label="Birth Date" value={birthDate} />
            </View>
            <View>
              <FormTextInput label="Birth History" value={birthHistory} />
            </View>
            <View>
              <FormTextInput label="Surgical History" value={surgicalHistory} />
            </View>
            <View>
              <FormTextInput
                label="Current Medications"
                value={currentMedications}
              />
            </View>
            <View>
              <FormTextInput
                label="Hospitalizations"
                value={hospitalizations}
              />
            </View>
            <View>
              <FormTextInput label="Allergies" value={allergies} />
            </View>
            <View>
              <FormTextInput
                label="Current Medical Conditions"
                value={currentMedicalConditions}
              />
            </View>
          </FormWrapper>
          <View style={{ marginBottom: 20 }}>
            <ServiceButton title="Save Changes" onPress={() => goBack()} />
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default EditChildScreen;
