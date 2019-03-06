import styled from "styled-components/native";

export const ContainerView = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: ${props => `${props.padding}px`};
`;

ContainerView.defaultProps = {
  padding: 16
};

export const View = styled.View`
  justify-content: flex-start;
`;

export const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FormWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: 16px;
  padding-bottom: 40px;
`;

export const HeaderWrapper = styled.View`
  padding: 16px;
`;

export const ViewCentered = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 50px;
`;
