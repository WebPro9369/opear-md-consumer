import styled from 'styled-components/native';

import { colors } from '@utils/constants';

export const Wrapper = styled.View`
    width: 80px;
    height: 80px;
`;

export const ServiceTouchableButtonWrapper = styled.TouchableOpacity`
	backgroundColor: #CCC;
`;

export const ServiceText = styled.Text`
	color: ${colors.CYAN};
	fontSize: 16;
`;