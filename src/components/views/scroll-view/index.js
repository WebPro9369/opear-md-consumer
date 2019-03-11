import styled from "styled-components/native";

export const View = styled.View`
  padding-top: 24px;
  padding-bottom: 24px;
`;

export const ContainerView1 = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 0px;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
  padding: ${props => `${props.padding}px`};
`;

ScrollView.defaultProps = {
  padding: 16
};
