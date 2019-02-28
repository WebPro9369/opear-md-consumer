import React from "react";
import { Avatar, ButtonGroup } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import ServiceButton from "../../../components/service-button";
import {
  ContainerView,
  View,
  HeaderWrapper,
  FormWrapper,
  ScrollView,
  ViewCentered
} from "./styles";
import { colors } from "../../../utils/constants";

class EditCardScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const { goBack, navigate } = this.props.navigation;
    const buttons = ["Male", "Female", "Non-Binary"];
    const { selectedIndex } = this.state;
    return (
      <ContainerView behavior="padding" enabled={true}>
        <HeaderWrapper>
          <NavHeader
            title="Edit Child"
            size="medium"
            hasBackButton={true}
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <ScrollView>
          <ViewCentered>
            <Avatar
              rounded
              size={120}
              source={require("../../../../assets/images/FoxLarge.png")}
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
              <FormTextInput
                label="First Name"
                // leftIcon={
                //   <FontAwesome name="cc-visa" size={30} color={colors.BLUE} />
                // }
                // rightIcon={
                //   <FontAwesome
                //     name="camera"
                //     size={30}
                //     color={colors.LIGHTGREEN}
                //   />
                // }
                value="Henry"
              />
            </View>
            <View>
              <FormTextInput label="Last Name" value="Smith" />
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
              <FormTextInput label="Birth Date" value="05 / 19 / 2003" />
            </View>
            <View>
              <FormTextInput label="Birth History" value="Birth History" />
            </View>
            <View>
              <FormTextInput
                label="Surgical History"
                value="Surgical History"
              />
            </View>
            <View>
              <FormTextInput
                label="Current Medications"
                value="Current Medications"
              />
            </View>
            <View>
              <FormTextInput
                label="Hospitalizations"
                value="Hospitalizations"
              />
            </View>
            <View>
              <FormTextInput label="Allergies" value="Allergies" />
            </View>
            <View>
              <FormTextInput
                label="Current Medical Conditions"
                value="Current Medical Conditions"
              />
            </View>
          </FormWrapper>
          <ServiceButton title="Save Changes" onPress={() => goBack()} />
        </ScrollView>
      </ContainerView>
    );
  }
}

export default EditCardScreen;
