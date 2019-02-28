import React from "react";
import PropTypes from "prop-types";

import {
  Wrapper,
  StyledBackButtonIcon,
  StyledTouchableButtonWrapper,
  ServiceText
} from "./styles";

const NavHeader = ({
  title,
  size,
  hasBackButton,
  backButtonIcon,
  onPressBackButton,
  ...rest
}) => (
  <Wrapper size={size} {...rest}>
    {hasBackButton ? (
      <StyledTouchableButtonWrapper onPress={onPressBackButton}>
        <StyledBackButtonIcon/>
      </StyledTouchableButtonWrapper>
    ) : null}
    <ServiceText size={size}>{title}</ServiceText>
  </Wrapper>
);

NavHeader.propTypes = {};

export { NavHeader };
