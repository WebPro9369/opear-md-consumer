import React from "react";
import PropTypes from "prop-types";
import {
  StyledText,
  StyledTextInput,
  Wrapper,
  FlexView,
  LeftFlexView
} from "./styles";

const FormTextInput = ({ label, value, leftIcon, rightIcon, placeholder, ...rest }) => (
  <Wrapper {...rest}>
    <StyledText fontSize={14} lineHeight={18}>
      {label}
    </StyledText>
    <FlexView>
      <LeftFlexView>
        {leftIcon ? (
          <Wrapper style={{ marginRight: 16 }}>{leftIcon}</Wrapper>
        ) : null}
        <StyledTextInput placeholder={placeholder} fontSize={20} lineHeight={24} value={value} />
      </LeftFlexView>
      {rightIcon}
    </FlexView>
  </Wrapper>
);

export { StyledText, StyledTextInput, FormTextInput };
