import React from "react";
import PropTypes from "prop-types";
import { createBottomTabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AccountNavigator from "./account.navigator";
import DashboardNavigator from "./dashboard.navigator";
import VisitsNavigator from "./visits.navigator";
import ChildrenNavigator from "./children.navigator";
import { colors } from "../utils/constants";

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator,
      navigationOptions: () => ({
        title: "Dashboard",
        tabBarLabel: "Dashboard"
      })
    },
    Visits: {
      screen: VisitsNavigator,
      navigationOptions: () => ({
        title: "Visits",
        tabBarLabel: "Visits"
      })
    },
    Children: {
      screen: ChildrenNavigator,
      navigationOptions: () => ({
        title: "Children",
        tabBarLabel: "Children"
      })
    },
    Account: {
      screen: AccountNavigator,
      navigationOptions: () => ({
        title: "Account",
        tabBarLabel: "Account"
      })
    }
  },
  {
    initialRouteName: "Dashboard",
    defaultNavigationOptions: ({ navigation }) => {
      const TabBarIcon = ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;
        switch (routeName) {
          case "Dashboard":
            iconName = "home";
            break;
          case "Visits":
            IconComponent = Ionicons;
            iconName = "ios-briefcase";
            break;
          case "Children":
            iconName = "face";
            break;
          case "Account":
            iconName = "account";
            break;
          default:
            break;
        }
        IconComponent.propTypes = {
          tintColor: PropTypes.string
        };
        return <IconComponent name={iconName} size={24} color={tintColor} />;
      };
      TabBarIcon.propTypes = {
        tintColor: PropTypes.string.isRequired
      };
      return {
        tabBarIcon: TabBarIcon
      };
    },
    tabBarOptions: {
      activeTintColor: colors.LIGHTGREEN,
      inactiveTintColor: colors.MIDGREY
    }
  }
);

export default TabNavigator;
