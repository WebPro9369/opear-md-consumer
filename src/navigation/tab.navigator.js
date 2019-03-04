import React from "react";
import PropTypes from "prop-types";
import { createBottomTabNavigator } from "react-navigation";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AccountNavigator from "./account.navigator";
import DashboardScreen from "../screens/dashboard";
import VisitsScreen from "../screens/visits";
import ChildrenScreen from "../screens/children";
import { colors } from "../utils/constants";

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: () => ({
        title: "Dashboard",
        tabBarLabel: "Dashboard"
      })
    },
    Visits: {
      screen: VisitsScreen,
      navigationOptions: () => ({
        title: "Visits",
        tabBarLabel: "Visits"
      })
    },
    Children: {
      screen: ChildrenScreen,
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
    initialRouteName: "Account",
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
