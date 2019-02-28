import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { colors } from "../../../utils/constants";

export const ContainerView = styled.View`
	flex: 1;
	justifyContent: flex-start;
	padding: 16px;
`;

export const View = styled.View`
	justifyContent: flex-start;
`;

export const FlexView = styled.View`
	display: flex;
	flexDirection: row;
	justifyContent: flex-start;
	alignItems: center;
`;

export const TouchableWrapper = styled.TouchableOpacity`
	width: auto;
`;

export const ListTouchableButtonWrapper = styled.TouchableOpacity`
	backgroundColor: ${colors.WHITE};
	display: flex;
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	height: auto;
	padding: 24px;
	marginBottom: 12px;
	border: 0.5px solid rgba(0, 0, 0, 0.38);
	borderRadius: 5px;
`;

export const ListButtonText = styled.Text`
	fontSize: 20px;
	lineHeight: 24px;
`;
