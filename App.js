import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ApplicationState from '@store/app/';
import RootContainer from './src/root-container'

import { AppLoading, SplashScreen, Font } from 'expo';
import { Provider, observer } from 'mobx-react';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '@utils/constants';

const AppSplashWrapper = styled.View`
	flex: 1;
	width: ${DEVICE_WIDTH};
	height: ${DEVICE_HEIGHT};
`;

const SplashImage = styled.Image`
	flex: 1;
	width: ${DEVICE_WIDTH};
	height: ${DEVICE_HEIGHT};
`;

@observer
export default class App extends React.Component {
	constructor(props){
		super(props);

		if(__DEV__) {
			import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
		}
	}

	componentDidMount(){
		Font.loadAsync({
			'Flama-Light': require('@fonts/FlamaLight_Regular.otf'),
			'Flama-Basic': require('@fonts/Flama_Regular.otf'),
			'Flama-Medium': require('@fonts/FlamaMedium_Regular.otf'),
		});
	}
	componentWillMount(){}
	componentWillUnmount(){}
	componentWillReceiveProps(){}
	componentWillUpdate(){}

	onStartAsync() {
		setTimeout(()=>{
			ApplicationState.AppGlobalState.SplashShowing =  false;
		}, 5000);
	}

	onError(){}

	onFinish() {
		SplashScreen.hide();
	}

	render() {
		if (ApplicationState.AppGlobalState.SplashShowing === false) {
			return (
				<Provider ApplicationState={ApplicationState}>
					<RootContainer />
				</Provider>
			);
		} else {
			return (
				<AppSplashWrapper>
					<AppLoading startAsync={this.onStartAsync} onError={this.onError} onFinish={this.onFinish} />
					<SplashImage resizeMode="cover" source={require('./assets/splash.png')} />
				</AppSplashWrapper>
			)
		}
	}
};