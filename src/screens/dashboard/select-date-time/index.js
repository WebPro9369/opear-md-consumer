import React from "react";
import { FlatList } from "react-native";
import { DateTime } from "luxon";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View } from "../../../components/views";
import { DateCircle, TimeSelector } from "./styles";
import { colors } from "../../../utils/constants";

class SelectDateTimeScreen extends React.Component {
  constructor(props) {
    super(props);
    let luxonDate = DateTime.local();
    const dates = [];
    for (let i = 0; i < 10; i += 1) {
      dates.push({
        key: `${i + 1}`,
        day: luxonDate.weekdayShort,
        date: luxonDate.toFormat("LLL d"),
        selected: false
      });
      luxonDate = luxonDate.plus({ days: 1 });
    }
    this.state = {
      selectedDate: null,
      selectedTime: null,
      startHour: 8,
      endHour: 18,
      dates
    };
  }

  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    const {
      selectedDate,
      selectedTime,
      dates,
      startHour,
      endHour
    } = this.state;
    const hours = [];
    for (let i = startHour; i <= endHour; i += 1) {
      hours.push({ key: `${i}`, value: i });
    }

    return (
      <ContainerView>
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
              fontFamily="Flama-Medium"
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
                          selectedDate: date.date
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
                  end={item.value + 1}
                  selected={item.value === selectedTime}
                  onPress={() => {
                    this.setState({
                      selectedTime: item.value
                    });
                  }}
                  onConfirm={() => navigate("BookingReview")}
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
