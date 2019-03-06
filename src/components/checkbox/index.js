import React from "react";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomCheckBoxWrapper } from "./styles";
import { StyledText } from "../text";
import { colors } from "../../utils/constants";

export const CustomCheckBox = ({ title, checked, onPress }) => (
  <CustomCheckBoxWrapper onPress={onPress}>
    <StyledText fontSize={16} lineHeight={20} color={colors.BLACK87}>
      {title}
    </StyledText>
    {checked ? (
      <MaterialIcons name="check-box" size={20} color={colors.GREEN} />
    ) : (
      <MaterialIcons
        name="check-box-outline-blank"
        size={20}
        color={colors.MIDGREY}
      />
    )}
  </CustomCheckBoxWrapper>
);

CustomCheckBox.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onPress: PropTypes.func
};

CustomCheckBox.defaultProps = {
  checked: false,
  onPress: null
};
