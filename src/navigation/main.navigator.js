import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "../screens/authLoading";
import TabNavigator from "./tab.navigator";
import SignInScreen from "../screens/auth/signin";
import ForgotPwdScreen from "../screens/auth/forgotPwd";
import NewPwdScreen from "../screens/auth/enterNewPwd";
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
    AccountForgotPwd: {
      screen: ForgotPwdScreen
    },
    AccountNewPwd: {
      screen: NewPwdScreen
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
