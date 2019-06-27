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

const imgFox = require("../../../../assets/images/Fox.png");

@inject("store")
@observer
class UpcomingVisitsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: { userStore }
    } = props;

    this.state = {
      visits: []
    };

    getVisits({
      successHandler: res => {
        const visits = res.data;

        this.setState({ visits });
      }
    });
  }

  render() {
    const { visits } = this.state;
    const {
      navigation: { navigate }
    } = this.props;

    const dates = Object.keys(visits);

    const visitsDisplayStack = [];
    const dayOptions = { month: "long", day: "numeric" };
    const timeOptions = { day: undefined, hour: "numeric" };

    for (const date of dates) {
      const visitsOnDate = visits[date];

      const dateAsObject = new Date(date);

      visitsDisplayStack.push(
        <StyledText fontSize={16} color={colors.BLACK60}>
          {dateAsObject.toLocaleString("en-US", dayOptions)}
        </StyledText>
      );

      for (const visitOnDate of visitsOnDate) {
        let formattedTime = new Date(
          visitOnDate.appointment_time
        ).toLocaleDateString("en-US", timeOptions);
        formattedTime = formattedTime.split(", ");

        const { child, reason, address, id } = visitOnDate;

        visitsDisplayStack.push(
          <View style={{ marginBottom: 9 }}>
            <VisitDetailCard
              avatarImg={imgFox}
              name={(child && child.first_name) || "N/A"}
              illness={reason}
              time={formattedTime[1]}
              address={(address && address.street) || "N/A"}
              onPress={() =>
                navigate("VisitsVisitBooked", {
                  visitID: id,
                  visit: visitOnDate
                })
              }
            />
          </View>
        );
      }
    }

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
