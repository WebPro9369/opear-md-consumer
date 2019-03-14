import { createStackNavigator } from "react-navigation";
import ChildrenScreen from "../screens/children";
import AddChildScreen from "../screens/children/add-child";
import EditChildScreen from "../screens/children/edit-child";

const ChildrenNavigator = createStackNavigator(
  {
    ChildrenDefault: {
      screen: ChildrenScreen
    },
    ChildrenAddChild: {
      screen: AddChildScreen
    },
    ChildrenEditChild: {
      screen: EditChildScreen
    }
  },
  {
    initialRouteName: "ChildrenDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default ChildrenNavigator;
