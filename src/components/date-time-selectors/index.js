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

const formatTimeStr = time => {
  const hour = parseInt(time, 10);
  const min = time - hour;
  const timeStr =
    hour >= 12
      ? `${hour - 12 || 12}${min === 0.5 ? ":30" : ""}pm`
      : `${hour || 12}${min === 0.5 ? ":30" : ""}am`;
  return timeStr;
};

export const TimeSelector = ({ start, end, selected, onConfirm, ...rest }) => {
  return (
    <TimeSelectorWrapper selected={selected} {...rest}>
      <StyledText
        fontSize={16}
        color={selected ? colors.WHITE : colors.BLACK87}
        fontFamily={selected ? "FlamaMedium" : "Flama"}
      >
        {formatTimeStr(start)}
        {" - "}
        {formatTimeStr(end)}
      </StyledText>
      {selected ? (
        <ConfirmButton onPress={onConfirm}>
          <StyledText
            fontSize={16}
            fontFamily="FlamaMedium"
            color={colors.WHITE}
          >
            CONFIRM
          </StyledText>
        </ConfirmButton>
      ) : null}
    </TimeSelectorWrapper>
  );
};

TimeSelector.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired
};
