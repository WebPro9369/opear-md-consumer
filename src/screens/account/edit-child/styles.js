import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { colors } from "../../../utils/constants";

export const ContainerView = styled.View`
	flex: 1;
	justifyContent: flex-start;
	padding: 0px;
`;

export const HeaderWrapper = styled.View`
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

export const ScrollView = styled.ScrollView`
	flex: 1;
	padding: 16px;
`;

export const ViewCentered = styled.View`
	justifyContent: center;
	alignItems: center;
	paddingTop: 12px;
	paddingBottom: 50px;
`;

export const FormWrapper = styled.View`
	display: flex;
	flex: 1;
	justifyContent: flex-start;
	padding: 16px;
	paddingBottom: 40px;
`;
