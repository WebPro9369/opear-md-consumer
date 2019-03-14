import { createStackNavigator } from "react-navigation";
import ChildrenScreen from "../screens/children";

const ChildrenNavigator = createStackNavigator(
  {
    Children: {
      screen: ChildrenScreen
    }
  },
  {
    initialRouteName: "Children",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default ChildrenNavigator;
