import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Alert, FlatList } from "react-native";
import { DateTime } from "luxon";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View } from "../../../components/views";
import {
  DateCircle,
  TimeSelector
} from "../../../components/date-time-selectors";
import { colors } from "../../../utils/constants";

@inject("store")
@observer
class SelectDateTimeScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    let luxonDate = DateTime.local();
    const dates = [];
    for (let i = 0; i < 14; i += 1) {
      dates.push({
        key: `${i + 1}`,
        day: luxonDate.weekdayShort,
        date: luxonDate.toFormat("LLL d"),
        year: luxonDate.toFormat("yyyy"),
        selected: false
      });
      luxonDate = luxonDate.plus({ days: 1 });
    }
    this.state = {
      selectedDate: "",
      selectedTime: "",
      startHour: 6,
      endHour: 23.5,
      dates
    };
  }

  onSubmit = () => {
    const {
      navigation: { getParam, navigate },
      store: { visitRequestStore }
    } = this.props;

    const { selectedDate, selectedTime } = this.state;

    visitRequestStore.setVisitRequestDateTime(selectedDate, selectedTime);

    const screenRef = getParam("screenRef", null);

    if (!selectedDate || !selectedTime) {
      return Alert.alert("Missing Date", "Please pick a date for your visit.");
    }

    if (screenRef) {
      return navigate("DashboardBookingReview");
    }

    return navigate("DashboardBookingReview");
  };

  render() {
    const { navigation } = this.props;
    const { goBack } = navigation;
    const {
      // eslint-disable-next-line no-unused-vars
      selectedDate,
      selectedTime,
      dates,
      startHour,
      endHour
    } = this.state;
    const hours = [];
    for (let i = startHour; i < endHour; i += 0.5) {
      hours.push({ key: `${i}`, value: i });
    }

    if (endHour === 23.5) {
      hours.push({ key: `${23.5}`, value: 23.98 });
    }

    return (
      <ContainerView>
        <DeeplinkHandler navigation={navigation} />
        <View
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 24,
            paddingBottom: 6
          }}
        >
          <NavHeader
            title=""
            size="small"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            <StyledText
              fontFamily="FlamaMedium"
              fontSize={28}
              color={colors.BLACK87}
              lineHeight={30}
            >
              Select date and time
            </StyledText>
          </View>
          <View
            style={{
              paddingTop: 32,
              paddingBottom: 20,
              paddingLeft: 16,
              paddingRight: 16
            }}
          >
            <FlatList
              horizontal
              data={dates}
              renderItem={({ item }) => (
                <DateCircle
                  key={item.key}
                  day={item.day}
                  date={item.date}
                  selected={item.selected}
                  onPress={() => {
                    const newDates = dates.map(date => {
                      if (item.key === date.key) {
                        this.setState({
                          selectedDate: `${date.date} ${date.year}`
                        });
                        return {
                          ...date,
                          selected: true
                        };
                      }
                      return {
                        ...date,
                        selected: false
                      };
                    });
                    this.setState({ dates: newDates });
                  }}
                />
              )}
              style={{ padding: 12 }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 0,
              marginBottom: 0,
              paddingLeft: 0,
              paddingRight: 0
            }}
          >
            <FlatList
              data={hours}
              renderItem={({ item }) => (
                <TimeSelector
                  key={item.key}
                  start={item.value}
                  end={
                    item.value + 0.5 > 24
                      ? item.value - 24 + 0.5
                      : item.value + 0.5
                  }
                  selected={item.value === selectedTime}
                  onPress={() => {
                    this.setState({
                      selectedTime: item.value
                    });
                  }}
                  onConfirm={this.onSubmit}
                />
              )}
              style={{ paddingLeft: 16, paddingRight: 16 }}
            />
          </View>
        </View>
      </ContainerView>
    );
  }
}

export default SelectDateTimeScreen;
