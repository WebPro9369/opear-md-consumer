import React from "react";
import PropTypes from "prop-types";
import { Avatar, Badge } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { View, FlexView } from "../views";
import { StyledText } from "../text";
import {
  ProviderCardWrapper,
  BookedDetailCardWrapper,
  CardContentContainer,
  styles
} from "./styles";
import { colors } from "../../utils/constants";

export const ProviderCard = ({
  avatarImg,
  name,
  bio,
  history,
  rating,
  badges,
  ...rest
}) => (
  <ProviderCardWrapper {...rest}>
    <FlexView alignItems="stretch">
      <FlexView>
        <Avatar rounded size={80} source={avatarImg} />
        <View style={{ paddingLeft: 20 }}>
          <StyledText
            fontSize={16}
            fontFamily="Flama-Medium"
            color={colors.BLACK87}
          >
            {name}
          </StyledText>
          <StyledText fontSize={16} color={colors.BLACK87}>
            {bio}
          </StyledText>
          <StyledText
            fontSize={14}
            lineHeight={18}
            color={colors.BLACK38}
            style={{ maxWidth: 170 }}
          >
            {history}
          </StyledText>
        </View>
      </FlexView>
      <FlexView
        alignItems="center"
        style={{
          width: 30,
          height: 16,
          paddingTop: 0
        }}
      >
        <AntDesign name="star" color={colors.DARKYELLOW} size={12} />
        <StyledText
          fontFamily="Flama-Medium"
          fontSize={11}
          color={colors.DARKYELLOW}
          lineHeight={12}
        >
          {rating}
        </StyledText>
      </FlexView>
    </FlexView>
    <FlexView style={{ paddingTop: 30 }}>
      {badges.map(badge => (
        <Badge
          key={badge}
          value={badge}
          textStyle={styles.badgeText}
          badgeStyle={styles.badge}
        />
      ))}
    </FlexView>
  </ProviderCardWrapper>
);

ProviderCard.propTypes = {
  avatarImg: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  history: PropTypes.string,
  rating: PropTypes.string,
  badges: PropTypes.arrayOf(PropTypes.string)
};

ProviderCard.defaultProps = {
  bio: "",
  history: "",
  rating: null,
  badges: []
};

export const BookedDetailCard = ({ type, text, icon, ...rest }) => (
  <BookedDetailCardWrapper {...rest}>
    <StyledText fontSize={14} color={colors.BADGE_TEXT_GREY} lineHeight={18}>
      {type}
    </StyledText>
    <CardContentContainer>
      <StyledText fontSize={16} color={colors.BLACK87} lineHeight={20}>
        {text}
      </StyledText>
      {icon}
    </CardContentContainer>
  </BookedDetailCardWrapper>
);

BookedDetailCard.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element
};

BookedDetailCard.defaultProps = {
  icon: null
};
