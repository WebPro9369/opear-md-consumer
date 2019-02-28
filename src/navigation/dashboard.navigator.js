import {
	createStackNavigator
} from 'react-navigation';
import DashboardScreen from '@screens/dashboard';
import {
	colors
} from '@utils/constants';

const DashboardNavigator = createStackNavigator({
	Dashboard: {
		screen: DashboardScreen,
		navigationOptions: ({
			navigation
		}) => ({
			title: 'Dashboard'
		}),
	}
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

export default DashboardNavigator;
