import styled from "styled-components/native";
import { colors } from "../../../utils/constants";

export const FormView = styled.View`
  padding-bottom: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  border-style: solid;
  border-bottom-width: 0.5px;
  border-color: ${colors.BLACK};
`;

export const View = styled.View`
  display: flex;
  margin-bottom: 40px;
`;

export const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
