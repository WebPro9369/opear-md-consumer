import React from "react";
import { FlatList, View } from "react-native";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import {
  ContainerView,
  KeyboardAvoidingView
} from "../../../components/views/keyboard-view";
import { CustomCheckBox } from "../../../components/checkbox";
import ServiceButton from "../../../components/service-button";
import { ContentWrapper, CustomInput } from "./styles";
import { MatchingMessageWrapper } from "../styles";
import { colors } from "../../../utils/constants";

class SelectSymptomsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAppointment: true,
      checkListData: [
        { key: "1", string: "Fever", checked: true },
        { key: "2", string: "Headache", checked: false },
        { key: "3", string: "Neck pain", checked: false },
        { key: "4", string: "Swollen glands", checked: false },
        { key: "5", string: "Runny nose", checked: false },
        { key: "6", string: "Cough", checked: false },
        { key: "7", string: "Congestion", checked: false },
        { key: "8", string: "Sore throat", checked: false },
        { key: "9", string: "Stomachache", checked: false },
        { key: "10", string: "Vomiting", checked: false },
        { key: "11", string: "Diarrhea", checked: false },
        { key: "12", string: "Eye pain/discharge", checked: false },
        { key: "13", string: "Rash", checked: false },
        { key: "14", type: "input", string: "Other" },
        { key: "15", type: "button", string: "Next" }
      ]
    };
  }

  render() {
    const { navigation } = this.props;
    const illness = navigation.getParam("illness");
    const { hasAppointment, checkListData } = this.state;

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
            onPressBackButton={() => navigation.navigate("Dashboard")}
          />
        </View>
        <ContainerView>
          <ContentWrapper>
            <StyledText fontFamily="Flama-Medium" fontSize={28} lineHeight={40}>
              Select symptoms:
            </StyledText>
            <StyledText
              fontFamily="Flama-Medium"
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
          <ContentWrapper
            marginTop={hasAppointment ? 16 : 48}
            marginBottom={0}
            style={{ flex: 1 }}
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
                if (item.type === "input") {
                  return <CustomInput placeholder={item.string} />;
                }
                if (item.type === "button") {
                  return (
                    <ServiceButton
                      title={item.string}
                      style={{ marginTop: 50 }}
                      onPress={() => navigation.navigate("PickChild")}
                    />
                  );
                }
                return null;
              }}
            />
          </ContentWrapper>
        </ContainerView>
      </KeyboardAvoidingView>
    );
  }
}

export default SelectSymptomsScreen;
