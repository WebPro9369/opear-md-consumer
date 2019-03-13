import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";

import { StyledText } from "../../components/text";
import { NavHeader } from "../../components/nav-header";
import {
  ContainerView,
  View,
  HeaderWrapper,
  FlexView
} from "../../components/views";
import { IllnessCard, ContentWrapper, MatchingMessageWrapper } from "./styles";
import { colors } from "../../utils/constants";

const imgRightArrow = require("../../../assets/images/Right_arrow.png");

@inject("ProviderState")
@observer
class DashboardScreen extends React.Component {
  static propTypes = {
    ProviderState: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      // selectedIllness: null,
      user: {
        name: "Michael"
      },
      illnessList: [
        { key: "1", string: "General", color: "#f9b44d" },
        { key: "2", string: "Respiratory", color: "#0e7092" },
        { key: "3", string: "Abdominal", color: "#d7707d" },
        { key: "4", string: "Ear Nose Throat", color: "#6b82a3" }
      ]
    };
  }

  render() {
    const {
      navigation: { navigate },
      ProviderState
    } = this.props;
    const { providerData } = ProviderState;
    const {
      appointment,
      readyProviders,
      outstandingAppointment
    } = providerData;

    // if (appointment) {
    //   setTimeout(() => {
    //     ProviderState.setOutstandingAppointment(true);
    //   }, 3000);
    // }
    const { user, illnessList } = this.state;

    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader title="" size="medium" hasBackButton={false} />
        </HeaderWrapper>
        <ContentWrapper>
          <StyledText fontSize={28} fontFamily="Flama-Medium">
            {"Hi, "}
            {user.name}
            {"!"}
          </StyledText>
        </ContentWrapper>
        {!outstandingAppointment && !readyProviders && appointment ? (
          <MatchingMessageWrapper>
            <StyledText fontSize={16} lineHeight={24}>
              We are currently matching you with your doctor, be in touch soon!
            </StyledText>
          </MatchingMessageWrapper>
        ) : null}
        {!outstandingAppointment && readyProviders ? (
          <TouchableOpacity onPress={() => navigate("SelectProvider")}>
            <MatchingMessageWrapper>
              <FlexView style={{ paddingTop: 16, paddingBottom: 16 }}>
                <StyledText fontSize={16} lineHeight={24}>
                  Your doctor recommendations are ready!
                </StyledText>
                <Image source={imgRightArrow} width={25} />
              </FlexView>
            </MatchingMessageWrapper>
          </TouchableOpacity>
        ) : null}
        {outstandingAppointment ? (
          <TouchableOpacity onPress={() => navigate("UpcomingVisit")}>
            <MatchingMessageWrapper>
              <FlexView style={{ paddingTop: 10, paddingBottom: 10 }}>
                <StyledText fontSize={16} lineHeight={24}>
                  Your doctor is on the way! Review details
                </StyledText>
                <Image source={imgRightArrow} width={25} />
              </FlexView>
            </MatchingMessageWrapper>
          </TouchableOpacity>
        ) : null}
        <View style={{ marginTop: appointment ? 16 : 48, marginBottom: 40 }}>
          <ContentWrapper>
            <StyledText>What&apos;s affecting your child?</StyledText>
            <View>
              <FlatList
                data={illnessList}
                renderItem={({ item }) => (
                  <IllnessCard
                    bgColor={item.color}
                    onPress={() =>
                      navigate("SelectSymptoms", { illness: item.string })
                    }
                  >
                    <StyledText
                      fontSize={16}
                      color={colors.WHITE}
                      lineHeight={24}
                    >
                      {item.string}
                    </StyledText>
                  </IllnessCard>
                )}
                horizontal
                style={{ paddingTop: 12, paddingBottom: 12 }}
              />
            </View>
          </ContentWrapper>
        </View>
        <View>
          <ContentWrapper>
            <StyledText>What to expect</StyledText>
            <StyledText
              fontSize={16}
              lineHeight={30}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                color: colors.TEXT_GREY
              }}
            >
              1.&nbsp;&nbsp;&nbsp;&nbsp;Let us know what is affecting your child
            </StyledText>
            <StyledText
              fontSize={16}
              lineHeight={30}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                color: colors.TEXT_GREY
              }}
            >
              2.&nbsp;&nbsp;&nbsp;&nbsp;Select a date and location to meet
            </StyledText>
            <StyledText
              fontSize={16}
              lineHeight={30}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                color: colors.TEXT_GREY
              }}
            >
              3.&nbsp;&nbsp;&nbsp;&nbsp;Choose a pediatrician!
            </StyledText>
          </ContentWrapper>
        </View>
      </ContainerView>
    );
  }
}
export default DashboardScreen;
