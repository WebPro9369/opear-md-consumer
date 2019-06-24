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
import { getChildren } from "@services/opear-api";
import { getAge } from "@utils"
import InactiveUserBanner from "@components/banner"

const imgRightArrow = require("../../../assets/images/Right_arrow.png");

@inject("store")
@observer
class DashboardScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore
      }
    } = props;

    this.state = {
      // selectedIllness: null,
      userStore,
      illnessList: [
        { key: "1", string: "General", color: "#49AF67" },
        { key: "2", string: "Respiratory", color: "#0e7092" },
        { key: "3", string: "Abdominal", color: "#d7707d" },
        { key: "4", string: "Ear Nose Throat", color: "#6b82a3" }
      ]
    };

    const successHandler = res => {

        var childAdjustedArray = res.data.map(
          function(row)
        {
          return {
          id: row.id,
          age: getAge(row.dob),
          gender: row.gender,
          name: row.first_name+" "+row.last_name,
          allergies: row.allergies,
          birthDate: new Date(row.dob)};
        });

        userStore.setChildren(childAdjustedArray);

      };

      getChildren( { successHandler });

  }

  render() {
    const {
      navigation: { navigate },
      store
    } = this.props;
    const { providerStore } = store;
    const {
      appointment,
      readyProviders,
      outstandingAppointment,
      providerEnRoute
    } = providerStore;

    const { userStore, illnessList } = this.state;

    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader title="" size="medium" hasBackButton={false} />
        </HeaderWrapper>
        <ContentWrapper>
          <StyledText fontSize={28} fontFamily="FlamaMedium">
            {"Hi, "}
            {userStore.name}
            {"!"}
          </StyledText>
        </ContentWrapper>

        <InactiveUserBanner userIsActive={userStore.active} />
        {!outstandingAppointment && !readyProviders && appointment && userStore.active ? (
          <MatchingMessageWrapper>
            <StyledText fontSize={16} lineHeight={24}>
              We are currently matching you with your doctor, be in touch soon!
            </StyledText>
          </MatchingMessageWrapper>
        ) : null}
        {!outstandingAppointment && readyProviders && userStore.active ? (
          <TouchableOpacity onPress={() => navigate("DashboardSelectProvider")}>
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
        {outstandingAppointment && !providerEnRoute && userStore.active ? (
          /*TODO: swap hardcoded visit id when logic is*/
          <TouchableOpacity onPress={() => navigate("DashboardUpcomingVisit",{visitID:3})}>
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
        {outstandingAppointment && providerEnRoute && userStore.active ? (
          <MatchingMessageWrapper>
            <StyledText fontSize={16} lineHeight={24}>
              Your Care Provider is on their way!
            </StyledText>
          </MatchingMessageWrapper>
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
                    onPress={() => {
                      if(userStore.active){
                        navigate("DashboardSelectSymptoms", {
                          illness: item.string
                        });
                      }}
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
                color: colors.BLACK60
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
                color: colors.BLACK60
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
                color: colors.BLACK60
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
