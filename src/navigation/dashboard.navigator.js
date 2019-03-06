import { createStackNavigator } from "react-navigation";
import DashboardScreen from "../screens/dashboard";
import SelectSymptomsScreen from "../screens/dashboard/select-symptoms";
import PickChildScreen from "../screens/dashboard/pick-child";
import AddChildScreen from "../screens/dashboard/add-child";
import PickVisitAddressScreen from "../screens/dashboard/pick-visit-address";
import AddAddressScreen from "../screens/dashboard/add-address";

const DashboardNavigator = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen
    },
    SelectSymptoms: {
      screen: SelectSymptomsScreen
    },
    PickChild: {
      screen: PickChildScreen
    },
    AddChild: {
      screen: AddChildScreen
    },
    PickVisitAddress: {
      screen: PickVisitAddressScreen
    },
    AddAddress: {
      screen: AddAddressScreen
    }
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default DashboardNavigator;
