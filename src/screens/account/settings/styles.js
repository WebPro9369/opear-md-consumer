import styled from "styled-components/native";
import { colors } from "../../../utils/constants";

export const TouchableView = styled.TouchableOpacity`
  display: flex;
`;

export const ContentButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 6px;
  border: 0.5px solid ${colors.MIDGREY};
  border-radius: 5px;
`;
