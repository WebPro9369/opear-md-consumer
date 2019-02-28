import styled from "styled-components/native";
import { colors } from "../../utils/constants";

export const WrapperView = styled.View`
	flex: 1;
`;

export const Wrapper = styled.View`
	display: flex;
`;

export const FlexView = styled.View`
	display: flex;
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	paddingTop: 10px;
	paddingBottom: 10px;
	borderStyle: solid;
	borderBottomWidth: 0.5px;
	borderColor: ${colors.BLACK};
`;

export const LeftFlexView = styled.View`
	display: flex;
	flexDirection: row;
	justifyContent: flex-start;
	alignItems: center;
`;

export const StyledText = styled.Text`
	color: ${props => props.color};
	fontFamily: ${props => props.fontFamily};
	fontSize: ${props => props.fontSize};
	lineHeight: ${props => props.lineHeight};
	textAlign: ${props => props.textAlign};
`;

StyledText.defaultProps = {
	color: colors.BLACK,
	fontSize: 20,
	fontFamily: 'Flama-Basic',
	lineHeight: 30,
	textAlign: 'left'
}

export const StyledTextInput = styled.TextInput`
	color: ${props => props.color};
	fontFamily: ${props => props.fontFamily};
	fontSize: ${props => props.fontSize};
	lineHeight: ${props => props.lineHeight};
	textAlign: ${props => props.textAlign};	
`;

StyledTextInput.defaultProps = {
	color: colors.BLACK,
	fontSize: 20,
	fontFamily: 'Flama-Basic',
	lineHeight: 30,
	textAlign: 'left'
}
