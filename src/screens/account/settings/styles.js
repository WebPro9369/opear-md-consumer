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
	justifyContent: flex-start;
`;

export const ViewCentered = styled.View`
	justifyContent: center;
	alignItems: center;
	paddingTop: 12px;
	paddingBottom: 50px;
`;

export const FlexView = styled.View`
	display: flex;
	flexDirection: row;
	justifyContent: flex-start;
	alignItems: center;
`;

export const ScrollView = styled.ScrollView`
	flex: 1;
	padding: 16px;
`;

export const TouchableView = styled.TouchableOpacity`
	display: flex;
`;

export const ContentButton = styled.TouchableOpacity`
	display: flex;
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	paddingTop: 16px;
	paddingBottom: 16px;
	paddingLeft: 24px;
	paddingRight: 24px;
	marginTop: 6px;
	border: 0.5px solid ${colors.MIDGREY};
	borderRadius: 5px;
`;
