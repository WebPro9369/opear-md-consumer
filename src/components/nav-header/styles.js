import styled from "styled-components/native";

import { colors } from "../../utils/constants";

export const Wrapper = styled.View`
  width: auto;
  height: auto;
  display: flex;
  flexDirection: row;
  paddingTop: ${props => props.size === "small" ? "12px" : "24px"};
  paddingBottom: ${props => props.size === "small" ? "12px" : "24px"};
`;

export const StyledTouchableButtonWrapper = styled.TouchableOpacity`
  backgroundColor: ${colors.WHITE};
  height: 24px;
  paddingTop: 4px;
  paddingBottom: 4px;
`;

export const ServiceText = styled.Text`
  color: ${colors.BLACK};
  fontFamily: "Flama-Medium";
  textAlign: left;
  fontSize: ${props => props.size === "small" ? "20px" : "28px"};
  lineHeight: ${props => props.size === "small" ? "30px" : "36px"};
`;

export const StyledBackButtonIcon = styled.Image`
  width: 25px;
  height: 16px;
`;

StyledBackButtonIcon.defaultProps = {
  source: require("../../../assets/images/Back.png")
};
