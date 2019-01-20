import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'react-native';

import {
	Wrapper
} from './styles';

class DashboardScreen extends React.PureComponent {
	render () {
		return (
			<Wrapper>
				<Text>This is Dashboard</Text>
			</Wrapper>
		)
	}
};

export default DashboardScreen;
