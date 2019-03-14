import { createStackNavigator } from "react-navigation";
import UpcomingVisitsScreen from "../screens/children";

const VisitsNavigator = createStackNavigator(
  {
    VisitsDefault: {
      screen: UpcomingVisitsScreen
    }
  },
  {
    initialRouteName: "VisitsDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default VisitsNavigator;
