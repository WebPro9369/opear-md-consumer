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
import InactiveUserBanner from "@components/banner";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { isVisitActive, doesVisitNeedView } from "@utils";

const imgRightArrow = require("../../../assets/images/Right_arrow.png");

@inject("store")
@observer
class DashboardScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      illnessList: [
        { key: "1", string: "General", color: "#49AF67" },
        { key: "2", string: "Respiratory", color: "#0e7092" },
        { key: "3", string: "Abdominal", color: "#d7707d" },
        { key: "4", string: "Ear Nose Throat", color: "#6b82a3" }
      ]
    };

    const {
      store: { userStore }
    } = this.props;

    const getChildrenSuccessHandler = res => {
      userStore.setChildren(res.data);
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
    this.getVisits();

    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      clearTimeout(this.timer);
      this.getVisits();
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  getVisits = () => {
    const getVisitsSuccessHandler = res => {
      const visitsData = res.data;
      const {
        store: { visitsStore }
      } = this.props;

      const visits = Object.values(visitsData).flat();
      visitsStore.setVisits(visits);

      this.timer = setTimeout(() => this.getVisits(), 30000);
    };

    getVisits({ successHandler: getVisitsSuccessHandler });
  };

  getBanner = () => {
    const { navigation, store } = this.props;
    const { navigate } = navigation;
    const { userStore, visitsStore } = store;
    if (!userStore.active) {
      return <InactiveUserBanner userIsActive={userStore.active} />;
    }

    const activeVisit = visitsStore.visits.find(isVisitActive);
    if (activeVisit) {
      const visitID = activeVisit.id;
      switch (activeVisit.state) {
        case "pending":
          return (
            <MatchingMessageWrapper>
              <StyledText fontSize={16} lineHeight={24}>
                We are currently matching you with your care provider, be in
                touch soon!
              </StyledText>
            </MatchingMessageWrapper>
          );
        case "matched":
          return (
            <TouchableOpacity
              onPress={() => navigate("DashboardSelectProvider", { visitID })}
            >
              <MatchingMessageWrapper>
                <FlexView style={{ paddingTop: 16, paddingBottom: 16 }}>
                  <StyledText fontSize={16} lineHeight={24}>
                    Your care provider recommendations are ready!
                  </StyledText>
                  <Image source={imgRightArrow} width={25} />
                </FlexView>
              </MatchingMessageWrapper>
            </TouchableOpacity>
          );
        case "approving":
          return (
            <MatchingMessageWrapper>
              <StyledText fontSize={16} lineHeight={24}>
                Your visit request has been sent to the care provider - check
                back soon!
              </StyledText>
            </MatchingMessageWrapper>
          );
        case "scheduled":
          return (
            <TouchableOpacity
              onPress={() => navigate("DashboardUpcomingVisit", { visitID })}
            >
              <MatchingMessageWrapper>
                <FlexView style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <StyledText fontSize={16} lineHeight={24}>
                    Your care provider is on the way! Review details
                  </StyledText>
                  <Image source={imgRightArrow} width={25} />
                </FlexView>
              </MatchingMessageWrapper>
            </TouchableOpacity>
          );
        case "in_progress":
          return (
            <TouchableOpacity
              onPress={() => navigate("DashboardUpcomingVisit", { visitID })}
            >
              <MatchingMessageWrapper>
                <StyledText fontSize={16} lineHeight={24}>
                  Your Care Provider is on their way!
                </StyledText>
              </MatchingMessageWrapper>
            </TouchableOpacity>
          );
        default:
          break;
      }
    }

    const reviewableVisit = visitsStore.visits.find(doesVisitNeedView);
    if (reviewableVisit) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigate("DashboardBookingReceipt", { visitID: reviewableVisit.id })
          }
        >
          <MatchingMessageWrapper>
            <StyledText fontSize={16} lineHeight={24}>
              Leave a review for your last visit!
            </StyledText>
          </MatchingMessageWrapper>
        </TouchableOpacity>
      );
    }

    return null;
  };

  render() {
    const { navigation, store } = this.props;
    const { navigate } = navigation;
    const { userStore, providerStore, visitsStore } = store;
    const { appointment } = providerStore;

    const { illnessList } = this.state;

    const isVisitInProgress =
      visitsStore.visits.length > 0 && visitsStore.visits.some(isVisitActive);

    return (
      <ContainerView>
        <DeeplinkHandler navigation={navigation} />
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

        {this.getBanner()}

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
                        if (!isVisitInProgress) {
                          navigate("DashboardSelectSymptoms", {
                            illness: item.string
                          });
                        } else {
                          Alert.alert(
                            "Unavailable",
                            "You currently have a visit in progress."
                          );
                        }
                      } else {
                        Alert.alert(
                          "Unavailable",
                          "We're currently not in your area. Please check back later"
                        );
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
