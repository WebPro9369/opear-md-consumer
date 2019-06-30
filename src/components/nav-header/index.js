import React from "react";
import PropTypes from "prop-types";

import {
  Wrapper,
  StyledBackButtonIcon,
  StyledTouchableButtonWrapper,
  ServiceText
} from "./styles";

export const NavHeader = ({
  title,
  size,
  hasBackButton,
  backButtonIcon,
  backgroundColor,
  serviceTextStyle,
  onPressBackButton,
  ...rest
}) => (
  <Wrapper size={size} {...rest}>
    {hasBackButton ? (
      <StyledTouchableButtonWrapper
        backgroundColor={backgroundColor}
        onPress={onPressBackButton}
      >
        {backButtonIcon || <StyledBackButtonIcon />}
      </StyledTouchableButtonWrapper>
    ) : null}
    <ServiceText size={size} {...serviceTextStyle}>
      {title}
    </ServiceText>
  </Wrapper>
);

NavHeader.propTypes = {
  title: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  hasBackButton: PropTypes.bool,
  backButtonIcon: PropTypes.element,
  backgroundColor: PropTypes.string,
  serviceTextStyle: PropTypes.instanceOf(Object),
  onPressBackButton: PropTypes.func
};

NavHeader.defaultProps = {
  title: "",
  size: "small",
  hasBackButton: false,
  backButtonIcon: null,
  backgroundColor: "#ffffff",
  serviceTextStyle: {},
  onPressBackButton: null
};

NavHeader.propTypes = {};
