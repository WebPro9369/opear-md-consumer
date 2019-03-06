import styled from "styled-components/native";
import { colors } from "../../../utils/constants";

export const ContentButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 6px;
  border-style: solid;
  border-width: ${props => (props.selected ? "2px" : "1px")};
  border-color: ${props => (props.selected ? colors.BLUE : colors.MIDGREY)};
  border-radius: 5px;
`;
