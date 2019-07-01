import { createStackNavigator } from "react-navigation";
import VisitsScreen from "../screens/visits";
import BookingReceiptScreen from "../screens/dashboard/booking-receipt";
import VisitBookedScreen from "../screens/dashboard/visit-booked";
import VisitDetailsScreen from "../screens/visits/visit-details";

const VisitsNavigator = createStackNavigator(
  {
    VisitsDefault: {
      screen: VisitsScreen
    },
    VisitsBookingReceipt: {
      screen: BookingReceiptScreen
    },
    VisitsVisitBooked: {
      screen: VisitBookedScreen
    },
    VisitsVisitDetails: {
      screen: VisitDetailsScreen
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
