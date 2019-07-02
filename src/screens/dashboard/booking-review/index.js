/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View, Alert } from "react-native";
import { inject, observer } from "mobx-react";
import { formatTimeStr } from "@utils/helpers";
import { registerVisit } from "@services/opear-api";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, FlexView } from "../../../components/views";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { ServiceButton } from "../../../components/service-button";
import { ContentButton } from "../../account/settings/styles";
import { ContentWrapper, AdditionalInput } from "./styles";
import { colors } from "../../../utils/constants";
import { getIndexByValue } from "@utils";

const imgFoxLarge = require("../../../../assets/images/FoxLarge.png");

@inject("store")
@observer
class BookingReviewScreen extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore: { children, addresses, visitRequest }
      }
    } = props;

    const childName =
      children[getIndexByValue(children, visitRequest.pickedChild)].name;
    const addressStreet =
      addresses[getIndexByValue(addresses, visitRequest.pickedAddress)].street;

    this.state = {
      name: childName,
      address: addressStreet,
      date: visitRequest.date,
      time: visitRequest.time,
      // card: null,
      price: visitRequest.cost,
      parentNotes: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = name => value => {
    return this.setState({
      [name]: value
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: {
        providerStore,
        userStore: { visitRequest, payment_accounts }
      }
    } = this.props;

    const { parentNotes } = this.state;

    if (!payment_accounts || payment_accounts.length === 0) {
      return Alert.alert(
        "Missing Payment",
        "Please select a valid payment method."
      );
    }

    const formattedDate = new Date(visitRequest.date);

    const hour = Math.floor(visitRequest.time);
    let minutes = 0;

    if (visitRequest.time % 1 === 0.5) {
      minutes = 30;
    }
    const completedDate = new Date(
      formattedDate.getFullYear(),
      formattedDate.getMonth(),
      formattedDate.getDate(),
      hour,
      minutes
    );

    const data = {
      visit: {
        child_id: visitRequest.pickedChild,
        address_id: visitRequest.pickedAddress,
        reason: visitRequest.reason,
        symptoms: visitRequest.symptoms,
        appointment_time: completedDate,
        parent_notes: parentNotes,
        payment_amount: visitRequest.cost,
        payment_account_id: payment_accounts[payment_accounts.length - 1].id // TODO: only allows one account
      }
    };

    const successHandler = () => {
      providerStore.setAppointment(true);
      navigate("DashboardDefault");
    };

    return registerVisit(data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack, push },
      store: {
        userStore: { payment_accounts }
      }
    } = this.props;
    const { name, address, date, time, price, parentNotes } = this.state;

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
        <KeyboardScrollView padding={0}>
          <ContentWrapper>
            <StyledText fontFamily="FlamaMedium" fontSize={28} lineHeight={40}>
              Visit review:
            </StyledText>
            <StyledText
              fontFamily="FlamaMedium"
              fontSize={28}
              color={colors.TEXT_GREEN}
              lineHeight={40}
            >
              Respiratory
            </StyledText>
          </ContentWrapper>
          <ContentWrapper style={{ marginTop: 32 }}>
            <ContentButton
              onPress={() =>
                push("DashboardPickChild", { screenRef: "booking-review" })
              }
            >
              <FlexView>
                <Avatar rounded size={40} source={imgFoxLarge} />
                <StyledText
                  fontFamily="Flama"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  {name}
                </StyledText>
              </FlexView>
              <MaterialIcons name="edit" size={24} color={colors.BLACK87} />
            </ContentButton>
            <ContentButton
              onPress={() =>
                push("DashboardPickVisitAddress", {
                  screenRef: "booking-review"
                })
              }
            >
              <FlexView>
                <EvilIcons name="location" size={40} color={colors.BLACK60} />
                <StyledText
                  fontFamily="Flama"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  {address}
                </StyledText>
              </FlexView>
              <MaterialIcons name="edit" size={24} color={colors.BLACK87} />
            </ContentButton>
            <ContentButton
              onPress={() =>
                push("DashboardSelectDateTime", { screenRef: "booking-review" })
              }
            >
              <FlexView>
                <FontAwesome
                  name="calendar-check-o"
                  size={40}
                  color={colors.BLACK60}
                />
                <StyledText
                  fontFamily="Flama"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  {date}
                  {", "}
                  {formatTimeStr(time)}
                </StyledText>
              </FlexView>
              <MaterialIcons name="edit" size={24} color={colors.BLACK87} />
            </ContentButton>
            <FlexView>
              <View style={{ flex: 1, marginRight: 4 }}>
                {(!payment_accounts || payment_accounts.length === 0) && (
                  <ContentButton
                    onPress={() =>
                      push("DashboardPaymentDefault", {
                        screenRef: "booking-review"
                      })
                    }
                  >
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
                )}
                {payment_accounts && payment_accounts.length > 0 && (
                  <ContentButton onPress={() => {}} disabled>
                    <FlexView justifyContent="center">
                      <AntDesign
                        name="creditcard"
                        size={24}
                        color={colors.LIGHTGREEN}
                        style={{
                          marginRight: 12
                        }}
                      />
                      <StyledText fontSize={16}>
                        {`****${
                          payment_accounts[payment_accounts.length - 1].last4
                        }`}
                      </StyledText>
                    </FlexView>
                  </ContentButton>
                )}
              </View>
              <View style={{ flex: 1, marginLeft: 4 }}>
                <ContentButton disabled>
                  <StyledText
                    fontFamily="FlamaMedium"
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
                value={parentNotes}
                onChangeText={this.handleInputChange("parentNotes")}
              />
            </View>
          </ContentWrapper>
          <ContentWrapper style={{ marginTop: 24, marginBottom: 24 }}>
            <ServiceButton title="Find a provider" onPress={this.onSubmit} />
          </ContentWrapper>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default BookingReviewScreen;
