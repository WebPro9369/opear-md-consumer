/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-unused-state */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Animated from "react-native-reanimated";
import { TabView, SceneMap } from "react-native-tab-view";
import { StyledText } from "../../components/text";
import { View, FlexView } from "../../components/views";
import { tabViewStyles, TabItem } from "./styles";
import { colors } from "../../utils/constants";
import UpcomingVisitsScreen from "./upcoming-visits";
import PastVisitsScreen from "./past-visits";
import { getVisits } from "../../services/opear-api";
import { getAge } from "../../utils";

const FirstRoute = () => <UpcomingVisitsScreen />;
const SecondRoute = () => <PastVisitsScreen />;

@inject("store")
@observer
class ManageVisitsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  state = {
    index: 0,
    routes: [
      { key: "upcoming", title: "UPCOMING" },
      { key: "past", title: "PAST" }
    ]
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", route => {
      console.tron.log("Visits screen will focus: ", route);
      getVisits({ successHandler: this.handleFetchedVisits });
      getVisits({ past: true, successHandler: this.handleFetchedVisits });
    });
  }

  handleFetchedVisits = res => {
    const {
      store: { visitsStore }
    } = this.props;
    const { data } = res;

    if (!data || typeof data !== "object") {
      console.tron.log("Invalid data: ", data);
      return false;
    }

    visitsStore.setVisits(Object.values(data).flat());

    return true;
  };

  renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={tabViewStyles.tabBar}>
        <View style={{ paddingTop: 24, paddingBottom: 16, paddingLeft: 16 }}>
          <StyledText fontSize={28} fontFamily="FlamaMedium" lineHeight={36}>
            Manage Visits
          </StyledText>
        </View>
        <FlexView>
          {props.navigationState.routes.map((route, i) => {
            const color = Animated.color(
              35,
              140,
              Animated.round(
                Animated.interpolate(props.position, {
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i ? 229 : 0
                  )
                })
              )
            );
            const { index } = this.state;
            const active = index === i;

            return (
              <TabItem
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                active={active}
                onPress={() => this.setState({ index: i })}
              >
                <Animated.Text
                  style={{
                    color: active ? color : colors.MIDGREY,
                    fontSize: 14,
                    fontFamily: active ? "FlamaMedium" : "Flama"
                  }}
                >
                  {route.title}
                </Animated.Text>
              </TabItem>
            );
          })}
        </FlexView>
      </View>
    );
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          upcoming: FirstRoute,
          past: SecondRoute
        })}
        renderTabBar={this.renderTabBar}
        onIndexChange={index => this.setState({ index })}
        // initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

export default ManageVisitsScreen;
