import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "react-native-elements";
import {
  AntDesign,
  MaterialIcons,
  EvilIcons,
  FontAwesome
} from "@expo/vector-icons";
import { View } from "react-native";
import { inject, observer } from "mobx-react";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, FlexView } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { ServiceButton } from "../../../components/service-button";
import { ContentButton } from "../../account/settings/styles";
import { ContentWrapper, AdditionalInput } from "./styles";
import { colors } from "../../../utils/constants";

const imgFoxLarge = require("../../../../assets/images/FoxLarge.png");

@inject("ProviderState")
@observer
class BookingReviewScreen extends React.Component {
  static propTypes = {
    ProviderState: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "Benjamin",
      address: "18 Mission St",
      date: "Sun Dec 31",
      time: "8am - 9am",
      // card: null,
      price: 150
    };
  }

  goToDashboard = () => {
    const {
      navigation: { navigate },
      ProviderState
    } = this.props;

    ProviderState.setAppointment(true);
    navigate("DashboardDefault");
  };

  render() {
    const {
      navigation: { goBack, push }
    } = this.props;
    const { name, address, date, time, price } = this.state;

    return (
      <ContainerView padding={0}>
        <View
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
        </View>
        <ScrollView padding={0}>
          <ContentWrapper>
            <StyledText fontFamily="Flama-Medium" fontSize={28} lineHeight={40}>
              Visit review:
            </StyledText>
            <StyledText
              fontFamily="Flama-Medium"
              fontSize={28}
              color={colors.TEXT_GREEN}
              lineHeight={40}
            >
              Respiratory
            </StyledText>
          </ContentWrapper>
          <ContentWrapper style={{ marginTop: 32 }}>
            <ContentButton onPress={() => push("DashboardPickChild")}>
              <FlexView>
                <Avatar rounded size={40} source={imgFoxLarge} />
                <StyledText
                  fontFamily="Flama-Basic"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  {name}
                </StyledText>
              </FlexView>
              <MaterialIcons name="edit" size={24} color={colors.BLACK87} />
            </ContentButton>
            <ContentButton onPress={() => push("DashboardPickVisitAddress")}>
              <FlexView>
                <EvilIcons name="location" size={40} color={colors.BLACK60} />
                <StyledText
                  fontFamily="Flama-Basic"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  {address}
                </StyledText>
              </FlexView>
              <MaterialIcons name="edit" size={24} color={colors.BLACK87} />
            </ContentButton>
            <ContentButton onPress={() => push("DashboardSelectDateTime")}>
              <FlexView>
                <FontAwesome
                  name="calendar-check-o"
                  size={40}
                  color={colors.BLACK60}
                />
                <StyledText
                  fontFamily="Flama-Basic"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  {date}
                  {", "}
                  {time}
                </StyledText>
              </FlexView>
              <MaterialIcons name="edit" size={24} color={colors.BLACK87} />
            </ContentButton>
            <FlexView>
              <View style={{ flex: 1, marginRight: 4 }}>
                <ContentButton onPress={() => push("DashboardAddCard")}>
                  <FlexView justifyContent="center">
                    <AntDesign
                      name="pluscircle"
                      size={24}
                      color={colors.LIGHTGREEN}
                      style={{
                        marginRight: 12
                      }}
                    />
                    <StyledText fontSize={16}>Add card</StyledText>
                  </FlexView>
                </ContentButton>
              </View>
              <View style={{ flex: 1, marginLeft: 4 }}>
                <ContentButton>
                  <StyledText
                    fontFamily="Flama-Medium"
                    fontSize={20}
                    color={colors.MIDGREY}
                  >
                    {"$"}
                    {price.toFixed(2)}
                  </StyledText>
                </ContentButton>
              </View>
            </FlexView>
          </ContentWrapper>
          <ContentWrapper>
            <View style={{ paddingTop: 12 }}>
              <AdditionalInput
                multiline
                placeholder="Enter additional notes..."
              />
            </View>
          </ContentWrapper>
          <ContentWrapper style={{ marginTop: 24, marginBottom: 24 }}>
            <ServiceButton
              title="Find a provider"
              onPress={this.goToDashboard}
            />
          </ContentWrapper>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default BookingReviewScreen;
