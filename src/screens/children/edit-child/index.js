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
import { getAge } from "@utils";

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
      id,
      age,
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
    } = props;

    const childID = navigation.getParam('childID', 0);

    this.state = {
      id,
      age,
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
    };

    const successHandler = res => {
      const {
        id,
        first_name,
        last_name,
        gender,
        dob,
        allergies
      } = res.data;

      var genderMap = 0;

      if(gender=="Male"){
        genderMap = 0;
      } else if (gender=="Female") {
        genderMap = 1;
      } else {
        console.tr
        genderMap = 2;
      }

      this.setState({
        id: id,
        firstName: first_name,
        lastName: last_name,
        gender: genderMap,
        birthDate: new Date(dob).toLocaleDateString("en-US"),
        age: getAge(dob),
        allergies: allergies.join(", ")
      });
    }

    getChild(childID, { successHandler });

    this.updateIndex = this.updateIndex.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  updateIndex(gender) {
    this.setState({ gender });
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
        userStore
      }
    } = this.props;

    const {
      firstName,
      lastName,
      gender,
      birthDate,
      allergies
    } = this.state;

    const childID = navigation.getParam('childID', 0);

    var genderMap = 0;

    if(gender == 0) {
      genderMap = "Male";
    } else if(gender == 1){
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
        allergies: allergies.split(", ")
        }
      };

    const successHandler = res => {
      const {
        id,
        first_name,
        last_name,
        gender,
        dob,
        allergies
      } = res.data;

      var editedChild = {
        id,
        name: first_name+" "+last_name,
        gender,
        birthDate: new Date(dob),
        age: getAge(dob),
        allergies: allergies
      }

      var index = userStore.children.map(function(o) { return o.id; }).indexOf(id);

      userStore.setChild(index,editedChild);

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
                selectedIndex={gender}
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
