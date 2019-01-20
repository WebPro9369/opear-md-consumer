import DashboardScreen from '../screens/dashboard';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import { colors } from '../utils/constants';

const MainNavigator = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) =>  ({
      title: 'Logo',
      swipeEnabled: true,
      header: null,
      headerStyle: {
        backgroundColor: colors.CYAN,
      },
      headerTitleStyle: {
        color: colors.VIVIDWHITE,
        backgroundColor: colors.BLACK,
      },
      cardStyle: {
        backgroundColor: colors.BLACK,
      }
    }),
  },
}, {
  cardStyle: {
    backgroundColor: colors.BLACK,
  },
  mode: 'modal',
});

const AppNavigationContainer = createAppContainer(MainNavigator);

export {
  AppNavigationContainer  
};