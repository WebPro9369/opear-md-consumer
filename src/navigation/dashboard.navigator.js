import { createStackNavigator } from "react-navigation";
import DashboardScreen from "../screens/dashboard";
import SelectSymptomsScreen from "../screens/dashboard/select-symptoms";
import PickChildScreen from "../screens/dashboard/pick-child";
import AddChildScreen from "../screens/dashboard/add-child";
import PickVisitAddressScreen from "../screens/dashboard/pick-visit-address";
import AddAddressScreen from "../screens/dashboard/add-address";
import SelectDateTimeScreen from "../screens/dashboard/select-date-time";
import BookingReviewScreen from "../screens/dashboard/booking-review";
import SelectProviderScreen from "../screens/dashboard/select-provider";
import VisitBookedScreen from "../screens/dashboard/visit-booked";
import UpcomingVisitScreen from "../screens/dashboard/upcoming-visit";

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
    },
    SelectDateTime: {
      screen: SelectDateTimeScreen
    },
    BookingReview: {
      screen: BookingReviewScreen
    },
    SelectProvider: {
      screen: SelectProviderScreen
    },
    VisitBooked: {
      screen: VisitBookedScreen
    },
    UpcomingVisit: {
      screen: UpcomingVisitScreen
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
