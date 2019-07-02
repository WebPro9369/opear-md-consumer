/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import React from "react";
import { Alert, FlatList, Image, TouchableOpacity } from "react-native";
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
import { getChildren, getAddresses, getVisits } from "@services/opear-api";
import { getAge } from "@utils";
import InactiveUserBanner from "@components/banner";

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
      store: { userStore, providerStore }
    } = props;

    this.state = {
      userStore,
      illnessList: [
        { key: "1", string: "General", color: "#49AF67" },
        { key: "2", string: "Respiratory", color: "#0e7092" },
        { key: "3", string: "Abdominal", color: "#d7707d" },
        { key: "4", string: "Ear Nose Throat", color: "#6b82a3" }
      ],
      visitId: null,
      visitState: "",
    };

    const getChildrenSuccessHandler = res => {
      const childAdjustedArray = res.data.map(row => ({
        id: row.id,
        age: getAge(row.dob),
        gender: row.gender || "",
        name: `${row.first_name} ${row.last_name}`,
        allergies: Array.isArray(row.allergies)
          ? row.allergies
          : [row.allergies || ""],
        birthDate: new Date(row.dob),
        birthHistory: row.birth_history || "",
        surgicalHistory: row.surgical_history || "",
        currentMedications: row.current_medications || "",
        hospitalizations: row.hospitalizations || "",
        currentMedicalConditions: row.current_medical_conditions || "",
        avatarImageIndex: row.avatar_image_index || 0
      }));

      // console.tron.log("Children list: ", childAdjustedArray);
      userStore.setChildren(childAdjustedArray);
    };

    getChildren({ successHandler: getChildrenSuccessHandler });

    const getAddressesSuccessHandler = res => {
      const addressAdjustedArray = res.data.map(row => ({
        id: row.id,
        name: row.name || "",
        street: row.street || "",
        city: row.city || "",
        state: row.state || "",
        zip: row.zip || ""
      }));

      userStore.setAddresses(addressAdjustedArray);
    };

    getAddresses({ successHandler: getAddressesSuccessHandler });
  }

  componentDidMount() {
    this.getVisit();
    this.timer = setInterval(() => this.getVisits(), 30000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getVisits = () => {
    const getVisitsSuccessHandler = res => {
      const visits = res.data;

      const dates = Object.keys(res.data);

      for (const date of dates) {
        const visitsOnDate = visits[date];

        for (const visitOnDate of visitsOnDate) {

          switch (visitOnDate.state) {
            case "pending":
            case "matched":
            case "approving":
            case "scheduled":
            case "in_progress":
                this.setState({ visitID: visitOnDate.id, visitState: visitOnDate.state });
                break;
          }
        }
      }
    }

    getVisits({ successHandler: getVisitsSuccessHandler });
  };

  render() {
    const {
      navigation: { navigate },
      store
    } = this.props;
    const { providerStore } = store;
    const {
      appointment
    } = providerStore;

    const { userStore, illnessList, visitID, visitState } = this.state;

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
        {visitState === "pending" ? (
          <MatchingMessageWrapper>
            <StyledText fontSize={16} lineHeight={24}>
              We are currently matching you with your care provider, be in touch soon!
            </StyledText>
          </MatchingMessageWrapper>
      ) : null}
        {visitState === "matched" ? (
          <TouchableOpacity onPress={() => navigate("DashboardSelectProvider", {visitID: visitID})}>
            <MatchingMessageWrapper>
              <FlexView style={{ paddingTop: 16, paddingBottom: 16 }}>
                <StyledText fontSize={16} lineHeight={24}>
                  Your care provider recommendations are ready!
                </StyledText>
                <Image source={imgRightArrow} width={25} />
              </FlexView>
            </MatchingMessageWrapper>
          </TouchableOpacity>
        ) : null}
        {visitState === "approving" ? (
          <MatchingMessageWrapper>
            <StyledText fontSize={16} lineHeight={24}>
              Your visit request has been sent to the care provider - check back soon!
            </StyledText>
          </MatchingMessageWrapper>
        ) : null}
        {visitState === "scheduled" ? (
          <TouchableOpacity onPress={() => navigate("DashboardUpcomingVisit",{visitID: visitID})}>
            <MatchingMessageWrapper>
              <FlexView style={{ paddingTop: 10, paddingBottom: 10 }}>
                <StyledText fontSize={16} lineHeight={24}>
                  Your care provider is on the way! Review details
                </StyledText>
                <Image source={imgRightArrow} width={25} />
              </FlexView>
            </MatchingMessageWrapper>
          </TouchableOpacity>
        ) : null}
        {visitState === "in_progress" ? (
          <TouchableOpacity onPress={() => navigate("DashboardUpcomingVisit",{visitID: visitID})}>
            <MatchingMessageWrapper>
              <StyledText fontSize={16} lineHeight={24}>
                Your Care Provider is on their way!
              </StyledText>
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
                    onPress={() => {
                      if (userStore.active) {
                        navigate("DashboardSelectSymptoms", {
                          illness: item.string
                        });
                      } else {
                        Alert.alert(
                          "Unavailable",
                          "We're currently not in your area. Please check back later");
                      }
                    }}
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
