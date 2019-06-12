import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "../screens/authLoading";
import TabNavigator from "./tab.navigator";
import SignInScreen from "../screens/auth/signin";
import OnboardingNavigator from "./onboarding.navigator";

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen
    },
    Tabs: {
      screen: TabNavigator
    },
    AccountSignIn: {
      screen: SignInScreen
    },
    Onboarding: {
      screen: OnboardingNavigator
    }
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppNavigationContainer = createAppContainer(MainNavigator);

export default AppNavigationContainer;
