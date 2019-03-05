import styled from "styled-components/native";
import { colors } from "../../utils/constants";

export const ContainerView = styled.View`
  flex: 1;
`;

export const TitleText = styled.Text`
  color: ${colors.CYAN};
  flex: 1;
  padding: 20px;
  font-weight: bold;
  font-size: 20;
`;

export const MoreServicesButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-width: 1;
  border-radius: 5;
  border-color: ${colors.CYAN};
  margin: 20px;
  bottom: 0px;
  height: 30px;
`;
