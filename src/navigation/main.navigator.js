import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation';
import DashboardScreen from '@screens/dashboard';
import AuthLoadingScreen from '@screens/authLoading';
import {
	colors
} from '@utils/constants';
import DashboardNavigator from './dashboard.navigator';
import OnboardingNavigator from './onboarding.navigator';

const MainNavigator = createSwitchNavigator({
	AuthLoading: {
		screen: AuthLoadingScreen
	},
	Onboarding: {
		screen: OnboardingNavigator
	},
	Dashboard: {
		screen: DashboardNavigator
	},
}, {
	initialRouteName: 'AuthLoading',
});

const AppNavigationContainer = createAppContainer(MainNavigator);

export {
	AppNavigationContainer
};
