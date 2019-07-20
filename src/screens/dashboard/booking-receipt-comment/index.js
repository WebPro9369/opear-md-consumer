/* eslint-disable no-nested-ternary */
import React from "react";
import { Avatar } from "react-native-elements";
import { inject, observer, PropTypes } from "mobx-react";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { addressToString, formatAMPM } from "@utils/helpers";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { avatarImages } from "@utils/constants";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import { registerReview, updateReview } from "@services/opear-api";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { View, FlexView } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { BookedDetailCard, ProviderStarsCard } from "../../../components/cards";
import { ContentWrapper } from "../select-symptoms/styles";
import { colors } from "../../../utils/constants";
import { getValueById, getIndexByValue } from "../../../utils";

const { BLACK60 } = colors;

@inject("store")
@observer
class BookingReceiptCommentScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const { navigation } = props;
    const visitID = navigation.getParam("visitID", 0);
    const providerData = navigation.getParam("providerData", null);

    this.state = {
      providerData,
      visitID,
      visitReviewStore: {
        rating: null,
        body: null
      }
    };
  }

  saveReview = () => {
    const {
      navigation,
      store: { visitsStore }
    } = this.props;
    const { goBack } = navigation;
    const { visitReviewStore, visitID } = this.state;
    const visit = getValueById(visitsStore.visits, visitID);
    const stars = isNull(visitReviewStore.rating)
      ? (visit.review ? visit.review.rating : 0)
      : visitReviewStore.rating;
    const body = isNull(visitReviewStore.body)
      ? (visit.review ? visit.review.body : "")
      : visitReviewStore.body;

    if (stars < 3 && isEmpty(body)) {
      return Alert.alert(
        "Error",
        "Please let us know what was wrong with your visit"
      );
    }

    const successHandler = res => {
      visit.review = res.data;
      goBack();
    };

    const errorHandler = () => {
      return Alert.alert("Error", "We had an issue saving your review.");
    };

    if (visit.review) {
      return updateReview(
        visit.review.id,
        {
          review: {
            visit_id: visitID,
            body,
            rating: stars,
            parent_id: visit.parent_id,
            care_provider_id: visit.care_provider_id
          }
        },
        { successHandler, errorHandler }
      );
    }

    return registerReview(
      {
        review: {
          visit_id: visitID,
          body,
          rating: stars,
          parent_id: visit.parent_id,
          care_provider_id: visit.care_provider_id
        }
      },
      { successHandler, errorHandler }
    );
  };

  setStars = event => {
    const { visitReviewStore } = this.state;
    this.setState({
      visitReviewStore: {
        ...visitReviewStore,
        rating: event.key + 1
      }
    });
  };

  render() {
    const {
      navigation,
      store: { visitsStore }
    } = this.props;
    const { goBack } = navigation;
    const { visitReviewStore, providerData, visitID } = this.state;
    const visit = getValueById(visitsStore.visits, visitID);
    const stars = isNull(visitReviewStore.rating)
      ? (visit.review ? visit.review.rating : 0)
      : visitReviewStore.rating;
    const body = isNull(visitReviewStore.body)
      ? (visit.review ? visit.review.body : "")
      : visitReviewStore.body;
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
              stars={stars}
              editable
              onPressStar={this.setStars}
            />
          </ContentWrapper>
          <ContentWrapper style={{ paddingTop: 16, paddingBottom: 16, minHeight: 160 }}>
            {stars > 0 && stars <= 3 && (
              <StyledText fontSize={14}>
                Why was your review unsatisfactory?
              </StyledText>
            )}
            <StyledTextInput
              fontSize={16}
              lineHeight={20}
              multiline
              placeholder={
                stars <= 3
                  ? "Enter review comments here"
                  : "Enter review comments here (optional)"
              }
              value={body}
              onChangeText={value => {
                this.setState({
                  visitReviewStore: {
                    ...visitReviewStore,
                    body: value
                  }
                });
              }}
              style={{
                minHeight: 160,
                padding: 20,
                borderStyle: "solid",
                borderColor: colors.MIDGREY,
                borderWidth: 0.5,
                borderRadius: 8
              }}
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
                <MaterialIcons name="help" size={24} />
              </FlexView>
            </FlexView>
          </ContentWrapper>
          <ContentWrapper style={{ marginTop: 24 }}>
            {(!isNull(visitReviewStore.rating) || !isNull(visitReviewStore.body)) && (
              <ServiceButton
                title={visit.review ? "Update Review" : "Submit Review"}
                style={{ marginBottom: 12 }}
                onPress={() => this.saveReview()}
              />
            )}
            <ServiceButton
              title={
                (!isNull(visitReviewStore.rating) || !isNull(visitReviewStore.body))
                  ? "Cancel Changes"
                  : "Back to Receipt"
              }
              onPress={() => goBack()}
            />
          </ContentWrapper>
        </View>
      </ScrollView>
    );
  }
}

export default BookingReceiptCommentScreen;
