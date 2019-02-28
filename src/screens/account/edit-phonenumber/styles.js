import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { colors } from "../../../utils/constants";

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
	flex: 1;
	justifyContent: space-between;
	padding: 16px;
`;

export const FormView = styled.View`
	paddingBottom: 16px;
	marginTop: 24px;
	marginBottom: 24px;
	borderStyle: solid;
	borderBottomWidth: 0.5px;
	borderColor: ${colors.BLACK};
`;

export const View = styled.View`
	display: flex;
	marginBottom: 40px;
`;

export const FlexView = styled.View`
	display: flex;
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
`;

export const FormWrapper = styled.View`
	flex: 1;
	display: flex;
	justifyContent: flex-start;
	padding: 16px;
	marginBottom: 30px;
`;
