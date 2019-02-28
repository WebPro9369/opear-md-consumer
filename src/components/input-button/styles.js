import styled from 'styled-components/native';
import { colors } from '../../utils/constants';

export const Wrapper = styled.View`
    width: auto;
    height: 56px;
`;

export const TouchableButtonWrapper = styled.TouchableOpacity`
	backgroundColor: ${colors.WHITE};
	display: flex;
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	paddingTop: 9px;
	paddingBottom: 9px;
	borderStyle: solid;
	borderBottomWidth: 0.5px;
	borderColor: #000;
`;

export const Label = styled.Text`
	fontFamily: "Flama-Medium";
	fontSize: 14px;
	color: rgba(0, 0, 0, 0.6);
`;

export const ServiceText = styled.Text`
	color: ${colors.BLACK};
	fontFamily: 'Flama-Basic';
	fontSize: 20px;
	lineHeight: 24px;
	textAlign: left;
`;