/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar } from "react-native-elements";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getValueById } from "@utils";
import { getCareProvider } from "@services/opear-api";
import { addressToString, formatAMPM } from "@utils/helpers";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { avatarImages } from "@utils/constants";
import { NavHeader } from "@components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { StyledText } from "../../../components/text";
import { View, FlexView, HeaderWrapper } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { BookedDetailCard, ProviderStarsCard } from "../../../components/cards";
import { ContentWrapper } from "../select-symptoms/styles";
import { colors } from "../../../utils/constants";

const { BLACK60 } = colors;

@inject("store")
@observer
class BookingReceiptScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      navigation,
      store: { visitsStore }
    } = props;

    const visitID = navigation.getParam("visitID", 0);
    const visit = getValueById(visitsStore.visits, visitID);
    // TODO: error if visitID = 0
    this.state = {
      visitID,
      providerData: null
    };

    const successHandler = res => {
      const {
        name,
        biography,
        work_history,
        rating,
        specialties,
        avatar
      } = res.data;

      this.setState({
        providerData: {
          name,
          bio: biography,
          history: work_history.join(", "),
          rating,
          avatar,
          badges: specialties
        }
      });
    };

    getCareProvider(visit.care_provider_id, { successHandler });
  }

  render() {
    const {
      navigation,
      store: { visitsStore }
    } = this.props;
    const { navigate } = navigation;
    const { providerData, visitID } = this.state;
    const visit = getValueById(visitsStore.visits, visitID);

    if (!providerData) {
      return (
        <ScrollView>
          <HeaderWrapper>
            <NavHeader title="Loading..." size="medium" />
          </HeaderWrapper>
        </ScrollView>
      );
    }

    return (
      <ScrollView padding={0} marginTop={24}>
        <DeeplinkHandler navigation={navigation} />
        <View style={{ marginTop: 16 }}>
          <ContentWrapper>
            <FlexView justifyContent="center">
              <StyledText
                fontFamily="FlamaMedium"
                fontSize={28}
                lineHeight={40}
                color={colors.BLACK87}
              >
                {"Visit receipt: "}
              </StyledText>
              <StyledText
                fontFamily="FlamaMedium"
                fontSize={28}
                lineHeight={40}
                color={colors.TEXT_GREEN}
              >
                {visit.reason}
              </StyledText>
            </FlexView>
          </ContentWrapper>
        </View>
        <View style={{ marginTop: 16 }}>
          <ContentWrapper>
            <ProviderStarsCard
              avatarImg={{ uri: providerData.avatar }}
              name={providerData.name}
              bio={providerData.bio}
              rating={providerData.rating}
              stars={visit.review ? visit.review.rating : 0}
              editable={!visit.review}
              onPressStar={() =>
                navigate("DashboardBookingReceiptComment", {
                  visitID,
                  providerData
                })
              }
            />
          </ContentWrapper>
          <ContentWrapper
            style={{
              marginTop: 24,
              marginBottom: 24
            }}
          >
            <BookedDetailCard
              type="Child"
              text={`${visit.child.first_name} ${visit.child.last_name}`}
              icon={
                <Avatar
                  rounded
                  size={30}
                  source={avatarImages[visit.child.avatar_image_index]}
                />
              }
            />
            <BookedDetailCard
              type="Address"
              text={addressToString(visit.address)}
              icon={<EvilIcons name="location" size={30} color={BLACK60} />}
            />
            <BookedDetailCard
              type="Date &amp; Time"
              text={formatAMPM(new Date(visit.appointment_time))}
              icon={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <FontAwesome
                  name="calendar-check-o"
                  size={30}
                  color={BLACK60}
                />
              }
            />
          </ContentWrapper>
          <ContentWrapper>
            <FlexView
              style={{
                padding: 16,
                borderColor: colors.MIDGREY,
                borderWidth: 0.5,
                borderRadius: 8
              }}
            >
              <FlexView>
                <StyledText
                  fontFamily="FlamaMedium"
                  style={{ marginRight: 20 }}
                >
                  {visit.payment_amount}
                </StyledText>
              </FlexView>
            </FlexView>
          </ContentWrapper>
          <ContentWrapper style={{ marginTop: 24 }}>
            <ServiceButton
              title={visit.review ? "Update Review" : "Review Visit"}
              onPress={() =>
                navigate("DashboardBookingReceiptComment", {
                  visitID,
                  providerData
                })
              }
            />
          </ContentWrapper>
        </View>
      </ScrollView>
    );
  }
}

export default BookingReceiptScreen;
