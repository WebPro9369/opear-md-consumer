import styled from "styled-components/native";

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: ${props =>
    props.startFromTop ? "flex-start" : "space-between"};
  padding: ${props => `${props.padding}px`};
  margin-bottom: 30px;
`;

KeyboardAvoidingView.defaultProps = {
  startFromTop: false,
  padding: 16
};

export const FormInputView = styled.View`
  padding-top: 24px;
  padding-bottom: 24px;
`;

export const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FormWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: 16px;
  padding-bottom: 40px;
`;

export const ContainerView = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 0px;
`;
