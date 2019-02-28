import {
	createStackNavigator
} from 'react-navigation';
import AskLocationScreen from '@screens/onboarding/ask-location';
import {
	colors
} from '@utils/constants';

const OnboardingNavigator = createStackNavigator({
	AskLocation: {
    screen: AskLocationScreen,
    navigationOptions: {
      title: 'Welcome to opear'
    }
	}
}, {
  initialRouteName: 'AskLocation',
  defaultNavigationOptions: {
    headerLeft: null,
    headerTitleStyle: {
      textAlign: 'left'
    }
  }
});

export default OnboardingNavigator;
