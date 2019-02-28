import React from "react";
import PropTypes from "prop-types";

import { Text } from "react-native";
import { pure } from "recompose";
import { Wrapper, TouchableButtonWrapper, ServiceText, Label } from "./styles";

const InputButton = ({ label, value, icon, onPress, ...rest }) => (
  <Wrapper {...rest}>
    <Label>{label}</Label>
    <TouchableButtonWrapper onPress={onPress}>
      <ServiceText>{value}</ServiceText>
      {icon}
    </TouchableButtonWrapper>
  </Wrapper>
);

InputButton.propTypes = {};

export { InputButton };
