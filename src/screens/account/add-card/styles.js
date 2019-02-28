import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { colors } from "../../../utils/constants";

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
	flex: 1;
	justifyContent: space-between;
	padding: 16px;
`;

export const View = styled.View`
	paddingTop: 24px;
	paddingBottom: 24px;
`;

export const FlexView = styled.View`
	display: flex;
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
`;

export const FormWrapper = styled.View`
	display: flex;
	flex: 1;
	justifyContent: flex-start;
	padding: 16px;
	paddingBottom: 40px;
`;
