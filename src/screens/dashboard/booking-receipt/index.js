import React from "react";
import { Avatar } from "react-native-elements";
import { EvilIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
// import { NavHeader } from "../../../components/nav-header";
import { View, FlexView } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { BookedDetailCard, ProviderStarsCard } from "../../../components/cards";
import { ContentWrapper } from "../select-symptoms/styles";
import { colors } from "../../../utils/constants";

const { BLACK60 } = colors;

const doctorImg = require("../../../../assets/images/Doctor.png");
const foxLargeImg = require("../../../../assets/images/FoxLarge.png");

class BookingReceiptScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      providerData: {
        key: "1",
        avartarImg: doctorImg,
        name: "Dr. John Smith",
        bio: "Hi, this is my bio",
        symptom: "Respiratory",
        rating: "4.5"
      },
      child: "Benjamin",
      address: "18 Mission St",
      time: "Sun Dec 31, 8am - 9am",
      card: "4985",
      price: "$150.00",
      stars: 0,
      starsEditable: false
    };
  }

  setStarsEditable = (value = true) => {
    this.setState({
      starsEditable: value
    });
  };

  setStars = event => {
    this.setState({
      stars: event.key + 1
    });
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const {
      providerData,
      child,
      address,
      time,
      card,
      price,
      starsEditable,
      stars
    } = this.state;

    const onPressStar = starsEditable ? this.setStars : this.setStarsEditable;

    return (
      <ScrollView padding={0} marginTop={24}>
        {/* <View
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 0,
            paddingBottom: 6
          }}
        >
          <NavHeader
            size="small"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </View> */}
        <View style={{ marginTop: 16 }}>
          <ContentWrapper>
            <FlexView justifyContent="center">
              <StyledText
                fontFamily="Flama-Medium"
                fontSize={28}
                lineHeight={40}
                color={colors.BLACK87}
              >
                {"Visit receipt: "}
              </StyledText>
              <StyledText
                fontFamily="Flama-Medium"
                fontSize={28}
                lineHeight={40}
                color={colors.TEXT_GREEN}
              >
                {providerData.symptom}
              </StyledText>
            </FlexView>
          </ContentWrapper>
        </View>
        <View style={{ marginTop: 16 }}>
          <ContentWrapper>
            <ProviderStarsCard
              avatarImg={providerData.avartarImg}
              name={providerData.name}
              bio={providerData.bio}
              rating={providerData.rating}
              stars={stars}
              editable
              onPressStar={onPressStar}
            />
          </ContentWrapper>
          {starsEditable ? (
            <ContentWrapper style={{ paddingTop: 16, paddingBottom: 16 }}>
              <StyledText fontSize={14}>
                Why was your review unsatisfactory?
              </StyledText>
              <StyledTextInput
                fontSize={16}
                lineHeight={20}
                multiline
                placeholder={
                  stars <= 3
                    ? "Enter review comments here"
                    : "Enter review comments here (optional)"
                }
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
          ) : null}
          <ContentWrapper
            style={{
              marginTop: 24,
              marginBottom: 24
            }}
          >
            <BookedDetailCard
              type="Child"
              text={child}
              icon={<Avatar rounded size={30} source={foxLargeImg} />}
            />
            <BookedDetailCard
              type="Address"
              text={address}
              icon={<EvilIcons name="location" size={30} color={BLACK60} />}
            />
            <BookedDetailCard
              type="Date &amp; Time"
              text={time}
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
                <FontAwesome name="cc-visa" color={colors.BLUE} size={30} />
                <StyledText fontSize={14} style={{ marginLeft: 20 }}>
                  {card}
                </StyledText>
              </FlexView>
              <FlexView>
                <StyledText
                  fontFamily="Flama-Medium"
                  style={{ marginRight: 20 }}
                >
                  {price}
                </StyledText>
                <MaterialIcons name="help" size={24} />
              </FlexView>
            </FlexView>
          </ContentWrapper>
          <ContentWrapper style={{ marginTop: 24 }}>
            <ServiceButton
              title="Back to dashboard"
              onPress={() => navigate("DashboardDefault")}
            />
          </ContentWrapper>
        </View>
      </ScrollView>
    );
  }
}

export default BookingReceiptScreen;
