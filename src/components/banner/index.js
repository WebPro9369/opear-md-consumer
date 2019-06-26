import React from "react";
import PropTypes from "prop-types";
import { StyledText } from "../text";
import { MatchingMessageWrapper } from "./styles";

class InactiveUserBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userIsActive, fontSize, lineHeight, ...rest } = this.props;

    return !userIsActive ? (
      <MatchingMessageWrapper>
        <StyledText fontSize={fontSize} lineHeight={lineHeight}>
          Opear is not yet available in your area - check back soon!
        </StyledText>
      </MatchingMessageWrapper>
    ) : null;
  }
}

InactiveUserBanner.propTypes = {
  userIsActive: PropTypes.bool,
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number
};

InactiveUserBanner.defaultProps = {
  userIsActive: false,
  fontSize: 16,
  lineHeight: 24
};

export default InactiveUserBanner;
