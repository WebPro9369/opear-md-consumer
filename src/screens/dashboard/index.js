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
      store: { userStore, visitsStore }
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
      visitState: ""
    };

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
    this.timer = setInterval(() => this.getVisits(), 30000);

    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.setState({ visitState: "" });
      this.getVisits();
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getVisits = () => {
    const getVisitsSuccessHandler = res => {
      const visits = res.data;
      const { store: { visitsStore } } = this.props;

      visitsStore.setVisits(Object.values(visits).flat());
      const dates = Object.keys(visits);

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
    };

    getVisits({ successHandler: getVisitsSuccessHandler });
  };

  render() {
    const {
      navigation: { navigate },
      store
    } = this.props;
    const { providerStore } = store;
    const { appointment } = providerStore;

    const { userStore, illnessList, visitID, visitState } = this.state;

    return (
      <ContainerView>
        <DeeplinkHandler navigation={this.props.navigation}/>
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
              We are currently matching you with your care provider, be in touch
              soon!
            </StyledText>
          </MatchingMessageWrapper>
        ) : null}
        {visitState === "matched" ? (
          <TouchableOpacity
            onPress={() =>
              navigate("DashboardSelectProvider", { visitID: visitID })
            }
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
        ) : null}
        {visitState === "approving" ? (
          <MatchingMessageWrapper>
            <StyledText fontSize={16} lineHeight={24}>
              Your visit request has been sent to the care provider - check back
              soon!
            </StyledText>
          </MatchingMessageWrapper>
        ) : null}
        {visitState === "scheduled" ? (
          <TouchableOpacity
            onPress={() =>
              navigate("DashboardUpcomingVisit", { visitID: visitID })
            }
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
        ) : null}
        {visitState === "in_progress" ? (
          <TouchableOpacity
            onPress={() =>
              navigate("DashboardUpcomingVisit", { visitID: visitID })
            }
          >
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
