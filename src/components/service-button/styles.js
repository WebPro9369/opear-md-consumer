import styled from 'styled-components/native';

import { colors } from '@utils/constants';

export const Wrapper = styled.View`
    width: auto;
    height: 56px;
`;

export const ServiceTouchableButtonWrapper = styled.TouchableOpacity`
	backgroundColor: rgb(35, 140, 229);
	display: flex;
	justifyContent: center;
	alignItems: center;
	height: 100%;
	padding: 13px;
`;

export const ServiceText = styled.Text`
	color: ${colors.WHITE};
	fontFamily: 'Flama-Medium';
	fontSize: 20px;
	lineHeight: 30px;
	textAlign: center;
`;