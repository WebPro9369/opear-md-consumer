import styled from "styled-components/native";
import { colors } from "../../utils/constants";

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

export const DateCircleWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  background-color: ${props => (props.selected ? colors.BLUE : colors.WHITE)};
  color: ${props => (props.selected ? colors.WHITE : colors.BLACK)};
  border-radius: 36px;
  border-width: 0.5px;
  border-color: ${colors.MIDGREY};
  margin-left: 10px;
  margin-right: 10px;
`;

export const TimeSelectorWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  background-color: ${props =>
    props.selected ? colors.DARKSKYBLUE : colors.WHITE};
  border-radius: 8px;
  border-width: 0.5px;
  border-color: ${colors.MIDGREY};
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 28px;
  padding-right: 28px;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 93px;
  height: 40px;
  border-radius: 8px;
  border-color: ${colors.WHITE};
  border-width: 0.5px;
`;
