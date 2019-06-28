import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { FlatList, View } from "react-native";
import { StyledText, StyledTextInput, FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView } from "../../../components/views";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { ScrollView } from "../../../components/views/scroll-view";
import { CustomCheckBox } from "../../../components/checkbox";
import { ServiceButton } from "../../../components/service-button";
import { ContentWrapper, CustomInput } from "./styles";
import { MatchingMessageWrapper } from "../styles";
import { colors } from "../../../utils/constants";

@inject("store")
@observer
class SelectSymptomsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasAppointment: false,
      checkListData: [
        { key: "1", string: "Fever", checked: false },
        { key: "2", string: "Headache", checked: false },
        { key: "3", string: "Neck pain", checked: false },
        { key: "4", string: "Swollen glands", checked: false },
        { key: "5", string: "Runny nose", checked: false },
        { key: "6", string: "Cough", checked: false },
        { key: "7", string: "Congestion", checked: false },
        { key: "8", string: "Sore throat", checked: false },
        { key: "9", string: "Stomach ache", checked: false },
        { key: "10", string: "Vomiting", checked: false },
        { key: "11", string: "Diarrhea", checked: false },
        { key: "12", string: "Eye pain/discharge", checked: false },
        { key: "13", string: "Rash", checked: false }
      ],
      otherInputText: ""
    };

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
      store: {
        userStore
      }
    } = this.props;

    const illness = navigation.getParam("illness");

    const { checkListData, otherInputText } = this.state;

    function removeBool(arr, boolState) {
      return arr.filter(e => e.checked !== boolState);
    }

    function removeTypes(arr, type) {
      return arr.filter(e => e.type !== type);
    }

    var symptoms = removeBool(checkListData, false);
    symptoms = removeTypes(symptoms, "input");
    symptoms = removeTypes(symptoms, "button");

    symptoms = symptoms.map(value => value.string);

    if(otherInputText != ""){
      symptoms.push(otherInputText);
    }

    console.tron.log(symptoms);

    userStore.setVisitRequestSymptoms(symptoms);
    userStore.setVisitRequestReason(illness);

    console.tron.log(userStore);

    navigation.navigate("DashboardPickChild");
  };

  render() {
    const { navigation } = this.props;
    const illness = navigation.getParam("illness");
    const { hasAppointment, checkListData, otherInputText } = this.state;

    return (
      <KeyboardAvoidingView padding={0} behavior="padding" startFromTop enabled>
        <View
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 24,
            paddingBottom: 6
          }}
        >
          <NavHeader
            size="small"
            hasBackButton
            onPressBackButton={() => navigation.goBack()}
          />
        </View>
        <ContainerView>
          <ContentWrapper>
            <StyledText fontFamily="FlamaMedium" fontSize={28} lineHeight={40}>
              Select symptoms:
            </StyledText>
            <StyledText
              fontFamily="FlamaMedium"
              fontSize={28}
              color={colors.TEXT_GREEN}
              lineHeight={40}
            >
              {illness}
            </StyledText>
          </ContentWrapper>
          {hasAppointment ? (
            <View>
              <MatchingMessageWrapper>
                <StyledText fontSize={16} lineHeight={24}>
                  We are currently matching you with your doctor, be in touch
                  soon!
                </StyledText>
              </MatchingMessageWrapper>
            </View>
          ) : null}
          <ScrollView>
            <ContentWrapper
              marginTop={hasAppointment ? 16 : 30}
              marginBottom={0}
            >
              <FlatList
                data={checkListData}
                renderItem={({ item }) => {
                  if (!item.type || item.type === "checkbox") {
                    return (
                      <CustomCheckBox
                        title={item.string}
                        checked={item.checked}
                        onPress={() => {
                          const newCheckListData = checkListData.map(
                            (val, index) => {
                              if (parseInt(item.key, 10) - 1 === index) {
                                return {
                                  ...val,
                                  checked: !val.checked
                                };
                              }
                              return val;
                            }
                          );
                          this.setState({
                            checkListData: newCheckListData
                          });
                        }}
                      />
                    );
                  }
                  return null;
                }}
              />
              <FormTextInput
                placeholder={"Other"}
                value = {otherInputText}
                onChangeText={this.handleInputChange("otherInputText")}
                />
              <View style={{ padding: 16 }}>
                <ServiceButton
                  title={"Next"}
                  onPress={this.onSubmit}
                />
              </View>
            </ContentWrapper>
          </ScrollView>
        </ContainerView>
      </KeyboardAvoidingView>
    );
  }
}

export default SelectSymptomsScreen;
