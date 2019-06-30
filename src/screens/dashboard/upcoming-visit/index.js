/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar } from "react-native-elements";
import MapView from "react-native-maps";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ServiceButton } from "@components/service-button";
import { getVisit, getCareProvider } from "@services/opear-api";
import TwilioVoice from "react-native-twilio-programmable-voice";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { View, ViewCentered, FlexView } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { BookedDetailCard } from "../../../components/cards";
import { ContentWrapper } from "../select-symptoms/styles";
import { colors } from "../../../utils/constants";

const { BLACK60 } = colors;

const doctorImg = require("../../../../assets/images/Doctor.png");
const foxLargeImg = require("../../../../assets/images/FoxLarge.png");

@inject("store")
@observer
class VisitBookedScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: { userStore },
      navigation
    } = props;

    const visitID = navigation.getParam("visitID", 0);

    // TODO: Replace dummy data
    this.state = {
      providerData: {
        avartarImg: doctorImg,
        name: "Dr. test John Smith",
        eta: "8:30am - 8:40am",
        phone: "+17174663337"
      },
      providerID: 0,
      child: "Benjamin",
      reason: "",
      address: "18 Mission St",
      time: "Sun Dec 31, 8am - 9am",
      map: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };

    careProviderSuccess = res => {
      const {
        name,
        phone
      } = res.data;

      this.setState({
        providerData: {
          name: name,
          phone: phone
        }
      })

    };

    const successHandler = res => {
      const {
        care_provider_id,
        child,
        address,
        appointment_time,
        reason
      } = res.data;

      const dateOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric"
      };

      this.setState({
        providerID: care_provider_id,
        child: child.first_name,
        address: address.street,
        time: new Date(appointment_time).toLocaleDateString(
          "en-US",
          dateOptions
        ),
        reason: reason
      });

      getCareProvider(this.state.providerID, { successHandler: careProviderSuccess });
    };

    getVisit(userStore.id, visitID, { successHandler });

  }

  componentDidMount() {}

  onCall = () => {
    const {
      providerData: { phone }
    } = this.state;
    TwilioVoice.connect({ To: phone });
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { providerData, child, address, time, map, reason } = this.state;

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
            <StyledText fontFamily="FlamaMedium" fontSize={28} lineHeight={40}>
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
                  fontFamily="FlamaMedium"
                  fontSize={20}
                  lineHeight={24}
                  color={colors.BLACK87}
                  textAlign="center"
                >
                  Your doctor should arrive by {time}.
                </StyledText>
              </View>
              <View style={{ marginTop: 40, marginBottom: 10 }}>
                <FlexView justifyContent="center">
                  <StyledText
                    fontFamily="FlamaMedium"
                    fontSize={20}
                    lineHeight={24}
                    color={colors.BLACK87}
                  >
                    {providerData.name}
                    {": "}
                  </StyledText>
                  <StyledText
                    fontFamily="FlamaMedium"
                    fontSize={20}
                    lineHeight={24}
                    color={colors.TEXT_GREEN}
                  >
                    {reason}
                  </StyledText>
                </FlexView>
              </View>
            </ViewCentered>
          </ContentWrapper>
          <ContentWrapper>
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
            <View style={{ paddingTop: 50, paddingBottom: 10 }}>
              <ServiceButton
                title="Contact Care Provider"
                onPress={this.onCall}
              />
            </View>
          </ContentWrapper>
        </View>
      </ScrollView>
    );
  }
}

export default VisitBookedScreen;
