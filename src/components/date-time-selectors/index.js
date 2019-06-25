import React from "react";
import PropTypes from "prop-types";
import { colors } from "../../utils/constants";
import { StyledText } from "../text";
import {
  DateCircleWrapper,
  TimeSelectorWrapper,
  ConfirmButton
} from "./styles";

export const DateCircle = ({ day, date, selected, ...rest }) => (
  <DateCircleWrapper selected={selected} {...rest}>
    <StyledText
      fontSize={14}
      lineHeight={24}
      fontFamily="FlamaMedium"
      color={selected ? colors.WHITE : colors.BLACK87}
    >
      {day}
    </StyledText>
    <StyledText
      fontSize={14}
      lineHeight={24}
      color={selected ? colors.WHITE : colors.BLACK60}
    >
      {date}
    </StyledText>
  </DateCircleWrapper>
);

DateCircle.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
};

export const TimeSelector = ({ start, end, selected, onConfirm, ...rest }) => (
  <TimeSelectorWrapper selected={selected} {...rest}>
    <StyledText
      fontSize={16}
      color={selected ? colors.WHITE : colors.BLACK87}
      fontFamily={selected ? "FlamaMedium" : "Flama"}
    >
      {start >= 12 ? `${start - 12 || 12}pm` : `${start || 12}am`}
      {" - "}
      {end >= 12 ? `${end - 12 || 12}pm` : `${end || 12}am`}
    </StyledText>
    {selected ? (
      <ConfirmButton onPress={onConfirm}>
        <StyledText fontSize={16} fontFamily="FlamaMedium" color={colors.WHITE}>
          CONFIRM
        </StyledText>
      </ConfirmButton>
    ) : null}
  </TimeSelectorWrapper>
);

TimeSelector.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired
};
