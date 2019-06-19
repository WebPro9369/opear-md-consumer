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
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";

import { registerChild, updateParent } from "@services/opear-api";

const imgFoxLarge = require("../../../../assets/images/FoxLarge.png");

@inject("store")
@observer
class AddChildScreen extends React.Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

  constructor(props) {
    super(props);

    const {
      store: {
        childStore: {
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
        },
        userStore
      }
    } = props;

    this.state = {
      genderIndex: 0,
      firstName: "",
      lastName: "",
      birthDate: null,
      birthHistory: "",
      surgicalHistory: "",
      currentMedications: "",
      hospitalizations: "",
      currentMedicalConditions: "",
      allergies: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
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
      navigation: { goBack },
      store: {
        childStore,
        userStore
      }
    } = this.props;

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

    var allergiesArray = allergies;

    const newChildID = 0;

    if (allergies.indexOf(",") != -1) {
      allergiesArray = allergies.split(", ");
    }

    const data =
    {
      child:
      {
        first_name: firstName,
        last_name: lastName,
        gender: genderIndex,
        dob: birthDate,
        allergies: allergiesArray
      }
    }

    var birthDateDate = new Date(birthDate);
    var currentDate = new Date();
    var diffDate = currentDate-birthDateDate;
    var age = Math.floor(diffDate/31557600000);

    const successHandler = () => {
      const { id } = response.data;

      userStore.addChild({
        id,
        name:firstName,
        age
      });

      const parentData = {
        parent: {
          children: userStore.children
        }
      }

      updateParent(userStore.id, parentData);
      goBack();
    };

    registerChild(data, { successHandler });

  }

  render() {
    const {
      navigation: { goBack }
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
            title="Add Child"
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
                selectedIndex={genderIndex}
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
                onChangeText={this.handleInputChange("currentMedicalConditions")}
              />
            </FormInputWrapper>
          </FormWrapper>
          <FormInputWrapper style={{ marginBottom: 20 }}>
            <ServiceButton title="Add Child" onPress={this.onSubmit} />
          </FormInputWrapper>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default AddChildScreen;
