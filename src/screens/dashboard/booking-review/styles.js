import styled from "styled-components/native";
import { colors } from "../../../utils/constants";

export const ContentWrapper = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
`;

export const AdditionalInput = styled.TextInput`
  display: flex;
  justify-content: flex-start;
  height: 200px;
  padding: 16px;
  border-style: solid;
  border-color: ${colors.MIDGREY};
  border-width: 0.5px;
  border-radius: 8px;
`;
