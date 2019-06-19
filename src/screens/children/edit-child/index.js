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
  ViewCentered,
  View
} from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";

import { getChild, updateChild } from "@services/opear-api";

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
        userStore: {
          children
        },
        childStore
      }
    } = props;

    const childID = navigation.getParam('childID', 0);

    const successHandler = res => {
      const {
        id,
        first_name,
        last_name,
        gender,
        dob,
        allergies
      } = res.data;

      console.tron.log(allergies);

      childStore
        .setFirstName(first_name)
        .setLastName(last_name)
        .setBirthDate(dob)
        .setGenderIndex(parseInt(gender));

        if(allergies) {
          childStore.setAllergies(allergies);
        }

        this.setState({
          genderIndex:parseInt(gender),
          firstName: first_name,
          lastName: last_name,
          birthDate: dob,
          allergies: allergies.join(", ")
        })

        console.tron.log(childStore);
    }

    getChild(childID, { successHandler });

    this.state = {
      children,
      childStore,
      genderIndex: 0,
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
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  updateIndex(genderIndex) {
    this.setState({ genderIndex });
  }

  handleInputChange = name => value => {
    return this.setState({
      [name]: value
    });
  };

  onSubmit = () => {
    const {
      navigation,
      store: {
        childStore
      }
    } = this.props;

    const {
      firstName,
      lastName,
      genderIndex,
      birthDate,
      allergies
    } = this.state;

    const childID = navigation.getParam('childID', 0);

    const data = {
      child: {
        first_name: firstName,
        last_name: lastName,
        gender: genderIndex,
        dob: birthDate,
        allergies: allergies.split(", ")
        }
      };

    const successHandler = () => {
      childStore
        .setFirstName(first_name)
        .setLastName(last_name)
        .setBirthDate(dob)
        .setGenderIndex(parseInt(gender));

        if(allergies) {
          childStore.setAllergies(allergies.split(", "));
        }

      navigation.goBack();
    };

    updateChild(childID, data, { successHandler });
  };

  render() {
    const {
      navigation
    } = this.props;
    const buttons = ["Male", "Female", "Non-Binary"];
    const {
      genderIndex,
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
            onPressBackButton={() => navigation.goBack()}
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
            <FormInputWrapper>
              <FormTextInput label="First Name"
              value={firstName}
              onChangeText={this.handleInputChange("firstName")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Last Name"
              value={lastName}
              onChangeText={this.handleInputChange("lastName")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={genderIndex}
                buttons={buttons}
                containerStyle={{ height: 40 }}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Birth Date" value={birthDate}
              onChangeText={this.handleInputChange("birthDate")} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Birth History" value={birthHistory}
              onChangeText={this.handleInputChange("birthHistory")} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput label="Surgical History" value={surgicalHistory}
              onChangeText={this.handleInputChange("surgicalHistory")} />
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
              <FormTextInput label="Allergies" value={allergies}
              onChangeText={this.handleInputChange("allergies")} />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Current Medical Conditions"
                value={currentMedicalConditions}
                onChangeText={this.handleInputChange("currentMedicalConditions")}
              />
            </FormInputWrapper>
          </FormWrapper>
          <View style={{ marginBottom: 20 }}>
            <ServiceButton title="Save Changes" onPress={this.onSubmit} />
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default EditChildScreen;
