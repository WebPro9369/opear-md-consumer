import DashboardScreen from '@screens/dashboard';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import { colors } from '@utils/constants';

const MainNavigator = createStackNavigator({
	Dashboard: {
    	screen: DashboardScreen,
    	navigationOptions: ({ navigation }) =>  ({
      		title: 'Dashboard'
    	}),
  	},
}, {
	initialRouteName: 'Dashboard',
	defaultNavigationOptions: {
		headerStyle: {
		  	backgroundColor: colors.WHITE,
		},
		headerTintColor: colors.CYAN,
		headerTitleStyle: {
			color: colors.CYAN  
		},
	},
  	cardStyle: {
    	backgroundColor: colors.WHITE,
  	},
});

const AppNavigationContainer = createAppContainer(MainNavigator);

export {
  AppNavigationContainer  
};