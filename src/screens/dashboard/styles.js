import styled from 'styled-components/native';
import ServiceButton from '../../components/service-button';

import { StyleSheet } from 'react-native';
import { colors } from '../../utils/constants';

export const ContainerView = styled.View`
	flex: 1;
`;

export const TitleText = styled.Text`
	color: ${colors.CYAN};
	flex: 1;
	padding: 20px;
	fontWeight: bold;
	fontSize: 20;
`;

export const MoreServicesButtonWrapper = styled.TouchableOpacity`
	flex: 1;
	justifyContent: center;
	alignItems: center;
	borderWidth: 1;
	borderRadius: 5;
	borderColor: ${colors.CYAN};
	margin: 20px;
	bottom: 0px;
	height: 30px;
`;