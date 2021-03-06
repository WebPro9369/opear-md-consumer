/* eslint-disable react/sort-comp */
/* eslint-disable import/no-unresolved */
import React from "react";
import PropTypes from "prop-types";
import { inject, observer, PropTypes as MobXPropTypes } from "mobx-react";
import { Alert } from "react-native";
import MapView from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TwilioVoice from "react-native-twilio-programmable-voice";
import { NavHeader } from "@components/nav-header";
import { LargeBookedDetailCard, VisitDetailCard } from "@components/cards";
import { ServiceButton } from "@components/service-button";
import { ContainerView, HeaderWrapper, View } from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { colors } from "@utils/constants";
import { updateVisit, getCareProvider, getVisits } from "@services/opear-api";
import { getValueById, getIndexByValue } from "@utils";
import { formatAMPM } from "@utils/helpers";
import { addressToString } from "../../../utils/helpers";
import { GoogleMapsService } from "@services";
import { DeeplinkHandler } from "@components/deeplink-handler";

const imgDog = require("../../../../assets/images/Dog.png");

@inject("store")
@observer
class VisitDetailsScreen extends React.Component {
  static propTypes = {
    store: MobXPropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      navigation,
      store: { visitsStore }
    } = props;
    let visitID = navigation.getParam("visitID", false);
    // TODO: if (!visitID) error!
    const routeInfo = navigation.getParam("routeInfo", false);

    if (!visitID) {
      const splitRoute = routeInfo.split("/");
      visitID = parseInt(splitRoute[1].split("=")[1], 10);
    }

    this.state = {
      visitID,
      map: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

        currentLatitude: 37.78925,
        currentLongitude: -122.4924,
        distance: 0
      },
      loaded: true,
      careProviderPhone: 0
    };

    if (routeInfo || !getValueById(visitsStore.visits, visitID)) {
      getVisits({
        successHandler: res => {
          visitsStore.setVisits(Object.values(res.data).flat());
          this.careProviderHandler();
          this.getGeoHandler();
        }
      });
    } else {
      this.careProviderHandler();
      this.getGeoHandler();
    }
  }

  careProviderHandler() {
    const {
      store: { visitsStore }
    } = this.props;
    const { visitID } = this.state;
    const visit = getValueById(visitsStore.visits, visitID);
    if (visit.care_provider_id) {
      const careProviderSuccess = res => {
        this.setState({
          careProviderPhone: res.data.phone
        });
      };

      getCareProvider(visit.care_provider_id, {
        successHandler: careProviderSuccess
      });
    }
  }

  getGeoHandler() {
    const {
      store: { visitsStore }
    } = this.props;
    const { map, visitID } = this.state;
    const visit = getValueById(visitsStore.visits, visitID);

    GoogleMapsService.getGeo(
      addressToString(visit.address),
      innerRes => {
        const { data } = innerRes;
        if (data && data.results && data.results[0].geometry) {
          const { lat, lng } = data.results[0].geometry.location;
          this.setState({
            map: {
              ...map,
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09
            }
          });
        } else {
          this.setState({
            map: null
          });
        }
      },
      () => {
        this.setState({
          map: null
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  reviewVisit = visitID => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("DashboardBookingReceipt", { visitID });
  };

  cancelVisit = () => {
    const {
      navigation: { navigate },
      store: { visitsStore }
    } = this.props;

    const { visitID } = this.state;
    const { visits } = visitsStore;

    const data = {
      state: "canceled"
    };

    const successHandler = () => {
      const index = getIndexByValue(visits, visitID);
      visitsStore.setVisitState(index, "canceled");
      navigate("DashboardDefault");
    };

    const errorHandler = () => {
      Alert.alert("Visit Update Error", "Failed to cancel the visit.");
    };

    updateVisit(visitID, data, { successHandler, errorHandler });
  };

  render() {
    const {
      navigation,
      store: { visitsStore }
    } = this.props;
    const { goBack } = navigation;
    const { visitID, loaded, map, careProviderPhone } = this.state;

    const visit = getValueById(visitsStore.visits, visitID);
    const past = visit.state === "completed";
    const {
      child,
      address,
      parent,
      symptoms,
      appointment_time,
      reason,
      parent_notes,
      visit_notes
    } = visit;

    const childName = child.first_name
      ? `${child.first_name} ${child.last_name}`
      : "N/A";

    const time = formatAMPM(new Date(appointment_time));

    if (!loaded) {
      return (
        <ContainerView>
          <HeaderWrapper>
            <NavHeader title="Loading..." size="medium" />
          </HeaderWrapper>
        </ContainerView>
      );
    }

    return (
      <ContainerView>
        <DeeplinkHandler navigation={navigation} />
        <HeaderWrapper>
          <NavHeader
            title="Visit Details"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <ScrollView padding={0}>
          {map && (
            <MapView
              style={{ alignSelf: "stretch", height: 200 }}
              region={map}
              initialRegion={map}
            />
          )}
          <View style={{ padding: 16, marginTop: 16 }}>
            <VisitDetailCard
              avatarImg={imgDog}
              name={childName}
              illness={symptoms.join(", ")}
              time={time}
              address={address}
              disabled
            />
            <View style={{ marginTop: 32 }}>
              <LargeBookedDetailCard
                type="Parent Name"
                text={parent.name || "N/A"}
                icon={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <FontAwesome
                    name="phone"
                    size={36}
                    style={{
                      backgroundColor: "transparent",
                      color: colors.DARKSKYBLUE
                    }}
                  />
                }
                disabled
                onPress={() => {
                  TwilioVoice.connect({ To: careProviderPhone });
                }}
              />
              <LargeBookedDetailCard
                type="Visit Reason"
                text={reason}
                disabled
              />
              <LargeBookedDetailCard
                type="Allergies"
                text={child.allergies}
                disabled
              />
              <LargeBookedDetailCard
                type="Parent Notes"
                text={parent_notes}
                disabled
              />
              {past ? (
                <LargeBookedDetailCard
                  type="Visit Notes"
                  text={visit_notes}
                  disabled
                />
              ) : null}
            </View>
          </View>
          {!past ? (
            <View style={{ marginTop: 48, paddingLeft: 16, paddingRight: 16 }}>
              <View style={{ paddingTop: 6, paddingBottom: 6 }}>
                <ServiceButton
                  grey
                  title="Cancel Visit"
                  onPress={() => this.cancelVisit()}
                />
              </View>
            </View>
          ) : null}
          {past ? (
            <View style={{ marginTop: 48, paddingLeft: 16, paddingRight: 16 }}>
              <View style={{ paddingTop: 6, paddingBottom: 6 }}>
                <ServiceButton
                  grey
                  title="Review Visit"
                  onPress={() => this.reviewVisit(visitID)}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </ContainerView>
    );
  }
}

export default VisitDetailsScreen;
