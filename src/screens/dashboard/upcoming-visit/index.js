import React from "react";
import { Avatar } from "react-native-elements";
import { MapView } from "expo";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { View, ViewCentered, FlexView } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { BookedDetailCard } from "../../../components/cards";
import { ContentWrapper } from "../select-symptoms/styles";
import { colors } from "../../../utils/constants";

const { BADGE_TEXT_GREY } = colors;

const doctorImg = require("../../../../assets/images/Doctor.png");
const foxLargeImg = require("../../../../assets/images/FoxLarge.png");

class VisitBookedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      providerData: {
        key: "1",
        avartarImg: doctorImg,
        name: "Dr. John Smith",
        symptom: "Respiratory",
        eta: "8:30am - 8:40am"
      },
      child: "Benjamin",
      address: "18 Mission St",
      time: "Sun Dec 31, 8am - 9am",
      map: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { providerData, child, address, time, map } = this.state;

    return (
      <ScrollView padding={0} marginTop={24}>
        <View
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
        </View>
        <View style={{ marginTop: 0 }}>
          <ContentWrapper>
            <StyledText fontFamily="Flama-Medium" fontSize={28} lineHeight={40}>
              Upcoming visit
            </StyledText>
          </ContentWrapper>
        </View>
        <View style={{ marginTop: 16 }}>
          <MapView
            style={{ alignSelf: "stretch", height: 200 }}
            initialRegion={map}
          />
          <ContentWrapper style={{ marginTop: -60 }}>
            <ViewCentered>
              <Avatar rounded size={150} source={doctorImg} />
              <View style={{ marginTop: 16, maxWidth: 240 }}>
                <StyledText
                  fontFamily="Flama-Medium"
                  fontSize={20}
                  lineHeight={24}
                  color={colors.BLACK87}
                  textAlign="center"
                >
                  Your doctor will arrive in 10 minutes!
                </StyledText>
              </View>
              <View style={{ marginTop: 40, marginBottom: 60 }}>
                <FlexView justifyContent="center">
                  <StyledText
                    fontFamily="Flama-Medium"
                    fontSize={20}
                    lineHeight={24}
                    color={colors.BLACK87}
                  >
                    {providerData.name}
                    {": "}
                  </StyledText>
                  <StyledText
                    fontFamily="Flama-Medium"
                    fontSize={20}
                    lineHeight={24}
                    color={colors.TEXT_GREEN}
                  >
                    {providerData.symptom}
                  </StyledText>
                </FlexView>
                <FlexView justifyContent="center">
                  <StyledText
                    fontSize={20}
                    lineHeight={24}
                    color={colors.BLACK87}
                  >
                    {"ETA "}
                  </StyledText>
                  <StyledText fontSize={20} lineHeight={24} color={colors.BLUE}>
                    {providerData.eta}
                  </StyledText>
                </FlexView>
              </View>
            </ViewCentered>
          </ContentWrapper>
          <ContentWrapper
            style={{
              marginTop: 24
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
              icon={
                <EvilIcons name="location" size={30} color={BADGE_TEXT_GREY} />
              }
            />
            <BookedDetailCard
              type="Date &amp; Time"
              text={time}
              icon={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <FontAwesome
                  name="calendar-check-o"
                  size={30}
                  color={BADGE_TEXT_GREY}
                />
              }
            />
          </ContentWrapper>
        </View>
      </ScrollView>
    );
  }
}

export default VisitBookedScreen;
