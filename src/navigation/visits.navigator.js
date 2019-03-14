import { createStackNavigator } from "react-navigation";
import UpcomingVisitsScreen from "../screens/visits";
import BookingReceiptScreen from "../screens/dashboard/booking-receipt";
import VisitBookedScreen from "../screens/dashboard/visit-booked";

const VisitsNavigator = createStackNavigator(
  {
    VisitsDefault: {
      screen: UpcomingVisitsScreen
    },
    VisitsBookingReceipt: {
      screen: BookingReceiptScreen
    },
    VisitsVisitBooked: {
      screen: VisitBookedScreen
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
