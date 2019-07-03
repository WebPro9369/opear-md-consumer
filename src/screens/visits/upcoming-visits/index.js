/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withNavigation } from "react-navigation";
import { getVisits } from "@services/opear-api";
import { StyledText } from "../../../components/text";
import { ContainerView, View, ContentWrapper } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { VisitDetailCard } from "../../../components/cards";
import { colors } from "../../../utils/constants";
import { getAge } from "../../../utils";

const imgFox = require("../../../../assets/images/Fox.png");

@inject("store")
@observer
class UpcomingVisitsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  componentDidMount() {
    const {
      store: { visitsStore }
    } = this.props;

    getVisits({
      successHandler: res => {
        visitsStore.setVisits(Object.values(res.data).flat());
      }
    });
  }

  render() {
    const {
      navigation: { navigate },
      store: { visitsStore }
    } = this.props;

    const visits = visitsStore.visits
      .filter(v => v.state === "scheduled" || v.state === "in_progress")
      .sort(
        (a, b) => new Date(b.appointment_time) - new Date(a.appointment_time)
      );

    const visitsDisplayStack = [];
    const addedTimes = [];
    const dayOptions = { month: "long", day: "numeric" };
    const timeOptions = { day: undefined, hour: "numeric" };

    visits.map(visit => {
      const { appointment_time } = visit;
      const dateAsObject = new Date(appointment_time);

      const day = dateAsObject.toLocaleString("en-US", dayOptions);
      if (!addedTimes.includes(day)) {
        addedTimes.push(day);
        visitsDisplayStack.push(
          <StyledText key={day} fontSize={16} color={colors.BLACK60}>
            {day}
          </StyledText>
        );
      }

      const formattedTime = dateAsObject
        .toLocaleDateString("en-US", timeOptions)
        .split(", ");

      const childName = visit.child.first_name
        ? `${visit.child.first_name} ${visit.child.last_name}`
        : "N/A";

      return visitsDisplayStack.push(
        <View key={`visit-detail-wrapper-${visit.id}`} style={{ marginBottom: 9 }}>
          <VisitDetailCard
          key={`visit-detail-${visit.id}`}
            avatarImg={imgFox}
            name={childName}
            illness={visit.reason}
            time={formattedTime[1]}
            address={{ street: visit.address.street }}
            onPress={() =>
              navigate("VisitsVisitDetails", {
                visitID: visit.id
              })
            }
          />
        </View>
      );
    });

    return (
      <ContainerView style={{ marginTop: 0 }}>
        <ScrollView padding={0}>
          <View style={{ paddingTop: 24 }}>
            <ContentWrapper>{visitsDisplayStack}</ContentWrapper>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default withNavigation(UpcomingVisitsScreen);
