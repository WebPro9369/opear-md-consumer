import styled from "styled-components/native";

export const View = styled.View`
  padding-top: 24px;
  padding-bottom: 24px;
`;

export const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${props => {
    if (props.justifyContent === "center") return "center";
    if (props.justifyContent === "start") return "flex-start";
    if (props.justifyContent === "end") return "flex-end";
    return "space-between";
  }};
  align-items: center;
`;

export const FormWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: ${props => `${props.padding}px`};
  padding-bottom: 40px;
`;

FormWrapper.defaultProps = {
  padding: 16
};

export const ContainerView = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 0px;
`;

export const HeaderWrapper = styled.View`
  padding: 16px;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
  padding: ${props => `${props.padding}px`};
`;

ScrollView.defaultProps = {
  padding: 16
};

export const ViewCentered = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 50px;
`;
