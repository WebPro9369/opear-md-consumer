import React from 'react';
import ServiceButton from '../../components/service-button';

import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@utils/constants';
import {
	ContainerView,
	TitleText,
	MoreServicesButtonWrapper,
	ServicesListView,
	styles
} from './styles';

class DashboardScreen extends React.PureComponent {

	renderItem({ item, idx }) {
		return <ServiceButton title={item} />
	}

	render () {
		const serviceButtonNames = ["Strep Throat", "Ear Infection", "Fever", "Vital Signs"];
		return (
			<ContainerView>
				<TitleText>How can we help?</TitleText>
				<ServicesListView
					contentContainerStyle={styles.servicesList} 
					data={serviceButtonNames}
					keyExtractor={(item, idx) => idx.toString()}
					renderItem={this.renderItem}
					numColumns={2}
				/>
				<MoreServicesButtonWrapper>
					<Text>More Services <Ionicons name="ios-arrow-down" size={14} color={colors.CYAN} /></Text>
				</MoreServicesButtonWrapper>
			</ContainerView>
		)
	}
};

export default DashboardScreen;
