import React from 'react';
import styled from 'styled-components/native';
import { AppNavigationContainer } from './navigation/main.navigator';

import { StatusBar, Platform } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { colors } from './utils/constants';

const Root = styled.View`
	flex: 1;
	background-color: ${ props => props.theme.WHITE };
`;

const StatusBarAndroid = styled.View`
	height: 24;
	background-color: ${ props => props.theme.WHITE };
`;

export default class RootContainer extends React.Component {
	render() {
		return (
			<ThemeProvider theme={colors}>
				<Root>
					<StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
					{ Platform.OS === 'android' && Platform.Version >= 20 && <StatusBarAndroid /> }
					<AppNavigationContainer />
				</Root>
			</ThemeProvider>
		);
	}
};