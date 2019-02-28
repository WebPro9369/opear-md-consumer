import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AccountNavigator from "./account.navigator";
import DashboardScreen from "../screens/dashboard";
import VisitsScreen from "../screens/visits";
import ChildrenScreen from "../screens/children";
import { colors } from "../utils/constants";

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Dashboard",
        tabBarLabel: "Dashboard"
      })
    },
    Visits: {
      screen: VisitsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Visits",
        tabBarLabel: "Visits"
      })
    },
    Children: {
      screen: ChildrenScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Children",
        tabBarLabel: "Children"
      })
    },
    Account: {
      screen: AccountNavigator,
      navigationOptions: ({ navigation }) => ({
        title: "Account",
        tabBarLabel: "Account"
      })
    }
  },
  {
    initialRouteName: "Account",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;
        switch (routeName) {
          case "Dashboard":
            // IconComponent = Entypo;
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

        return <IconComponent name={iconName} size={24} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.LIGHTGREEN,
      inactiveTintColor: colors.MIDGREY
    }
  }
);

export default TabNavigator;
