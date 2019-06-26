import { createStackNavigator } from "react-navigation";
import AccountScreen from "../screens/account";
import SettingsScreen from "../screens/account/settings";
import PaymentScreen from "../screens/account/payment";
import EditAddressScreen from "../screens/account/edit-address";
import EditNameScreen from "../screens/account/edit-name";
import EditEmailScreen from "../screens/account/edit-email";
import EditPhoneNumberScreen from "../screens/account/edit-phonenumber";
import AddCardScreen from "../screens/account/add-card";
import EditChildScreen from "../screens/children/edit-child";
import ScanCardScreen from "../screens/account/scan-card";
import ForgotPwdScreen from "../screens/auth/forgotPwd";
import NewPwdScreen from "../screens/auth/enterNewPwd";

const SettingsNavigator = createStackNavigator(
  {
    SettingsDefault: {
      screen: SettingsScreen
    },
    SettingsEditName: {
      screen: EditNameScreen
    },
    SettingsEditAdress: {
      screen: EditAddressScreen
    },
    SettingsEditEmail: {
      screen: EditEmailScreen
    },
    SettingsEditPhoneNumber: {
      screen: EditPhoneNumberScreen
    },
    SettingsEditChild: {
      screen: EditChildScreen
    },
    AccountForgotPwd: {
      screen: ForgotPwdScreen
    },
    AccountNewPwd: {
      screen: NewPwdScreen
    }
  },
  {
    initialRouteName: "SettingsDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

const PaymentNavigator = createStackNavigator(
  {
    PaymentDefault: {
      screen: PaymentScreen
    },
    PaymentAddCard: {
      screen: AddCardScreen
    },
    PaymentScanCard: {
      screen: ScanCardScreen
    }
  },
  {
    initialRouteName: "PaymentDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

const AccountNavigator = createStackNavigator(
  {
    AccountDefault: {
      screen: AccountScreen
    },
    AccountSettings: {
      screen: SettingsNavigator
    },
    AccountPayment: {
      screen: PaymentNavigator
    }
  },
  {
    initialRouteName: "AccountDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default AccountNavigator;
