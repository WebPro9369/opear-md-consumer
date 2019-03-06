import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { StyledTextInput } from "../../../components/text";
import { colors } from "../../../utils/constants";

export const ContentWrapper = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0px;
  padding-bottom: 0px;
`;

export const CustomInput = ({ value, placeholder }) => (
  <StyledTextInput
    value={value}
    placeholder={placeholder}
    style={{
      height: 30,
      borderBottomColor: colors.BLACK,
      borderBottomWidth: 0.5,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 16
    }}
  />
);

CustomInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string
};

CustomInput.defaultProps = {
  value: "",
  placeholder: ""
};
