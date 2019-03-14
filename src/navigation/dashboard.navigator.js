import { createStackNavigator } from "react-navigation";
import DashboardScreen from "../screens/dashboard";
import SelectSymptomsScreen from "../screens/dashboard/select-symptoms";
import PickChildScreen from "../screens/dashboard/pick-child";
import AddChildScreen from "../screens/children/add-child";
import PickVisitAddressScreen from "../screens/dashboard/pick-visit-address";
import AddAddressScreen from "../screens/dashboard/add-address";
import SelectDateTimeScreen from "../screens/dashboard/select-date-time";
import BookingReviewScreen from "../screens/dashboard/booking-review";
import SelectProviderScreen from "../screens/dashboard/select-provider";
import VisitBookedScreen from "../screens/dashboard/visit-booked";
import UpcomingVisitScreen from "../screens/dashboard/upcoming-visit";
import BookingReceiptScreen from "../screens/dashboard/booking-receipt";
import AddCardScreen from "../screens/account/add-card";

const DashboardNavigator = createStackNavigator(
  {
    DashboardDefault: {
      screen: DashboardScreen
    },
    DashboardSelectSymptoms: {
      screen: SelectSymptomsScreen
    },
    DashboardPickChild: {
      screen: PickChildScreen
    },
    DashboardAddChild: {
      screen: AddChildScreen
    },
    DashboardPickVisitAddress: {
      screen: PickVisitAddressScreen
    },
    DashboardAddAddress: {
      screen: AddAddressScreen
    },
    DashboardSelectDateTime: {
      screen: SelectDateTimeScreen
    },
    DashboardBookingReview: {
      screen: BookingReviewScreen
    },
    DashboardSelectProvider: {
      screen: SelectProviderScreen
    },
    DashboardVisitBooked: {
      screen: VisitBookedScreen
    },
    DashboardUpcomingVisit: {
      screen: UpcomingVisitScreen
    },
    DashboardBookingReceipt: {
      screen: BookingReceiptScreen
    },
    DashboardAddCard: {
      screen: AddCardScreen
    }
  },
  {
    initialRouteName: "DashboardDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default DashboardNavigator;
