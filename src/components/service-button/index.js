import React from "react";
import PropTypes from "prop-types";

import { Text } from "react-native";
import { pure } from "recompose";
import { Wrapper, ServiceTouchableButtonWrapper, ServiceText } from "./styles";

const ServiceButton = ({ title, subTitle, icon, onPress, ...rest }) => (
  <Wrapper {...rest}>
    <ServiceTouchableButtonWrapper onPress={onPress}>
      <ServiceText>{title}</ServiceText>
    </ServiceTouchableButtonWrapper>
  </Wrapper>
);

ServiceButton.propTypes = {};

export default ServiceButton;
