import React from "react";
import PropTypes from "prop-types";
import { Wrapper, ServiceTouchableButtonWrapper, ServiceText } from "./styles";
import { colors } from "../../utils/constants";

export const ServiceButton = ({
  grey,
  title,
  icon,
  backgroundColor,
  borderColor,
  color,
  onPress,
  ...rest
}) => (
  <Wrapper {...rest}>
    <ServiceTouchableButtonWrapper
      grey={grey}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onPress={onPress}
    >
      <ServiceText color={grey ? colors.BLACK38 : color || colors.WHITE}>
        {title}
      </ServiceText>
    </ServiceTouchableButtonWrapper>
  </Wrapper>
);

ServiceButton.propTypes = {
  grey: PropTypes.bool,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

ServiceButton.defaultProps = {
  grey: false,
  icon: null,
  backgroundColor: null,
  borderColor: null,
  color: null
};

ServiceButton.propTypes = {};
