import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar } from "react-native-elements";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText } from "../../../components/text";
import { ServiceButton } from "../../../components/service-button";
// import { NavHeader } from "../../../components/nav-header";
import { View } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { ProviderCard, BookedDetailCard } from "../../../components/cards";
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
      navigation,
      store: {
        userStore: {
          id,
          children,
          addresses
        }
      }
    } = props;

    const visitID = navigation.getParam('visitID', 0);
    const visits = navigation.getParam('visits', 0);

    const visit = visits[visitID-1];

    this.state = {
      username: "Michael",
      child: children[children.findIndex(p => p.id == visit.child_id)].name,
      address: addresses[addresses.findIndex(p => p.id == visit.address_id)].street,
      time: visit.appointment_time,
      providerData: {
        key: "1",
        avartarImg: doctorImg,
        name: "Dr. John Smith",
        bio: "Hi, this is my bio",
        history: "Hi, this is my work history, line two of my work history",
        rating: "4.5",
        badges: ["Specialty", "Credentials", "Experience"]
      }
    };
  }

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { username, providerData, child, address, time } = this.state;

    return (
      <ScrollView padding={0}>
        {/* <View
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 24,
            paddingBottom: 6
          }}
        >
          <NavHeader
            size="small"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </View> */}
        <View style={{ marginTop: 44 }}>
          <ContentWrapper>
            <StyledText fontFamily="FlamaMedium" fontSize={28} lineHeight={40}>
              {username}
              {", your visit has been booked!"}
            </StyledText>
          </ContentWrapper>
        </View>
        <View style={{ marginTop: 32 }}>
          <ContentWrapper style={{ marginTop: 8, marginBottom: 8 }}>
            <ProviderCard
              key={providerData.key}
              avatarImg={providerData.avartarImg}
              name={providerData.name}
              bio={providerData.bio}
              history={providerData.history}
              rating={providerData.rating}
              badges={providerData.badges}
              onPress={() => true}
            />
          </ContentWrapper>
          <ContentWrapper style={{ marginTop: 24 }}>
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

export default VisitBookedScreen;
