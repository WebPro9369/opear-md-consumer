/* eslint-disable global-require */
import { Dimensions } from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const colors = {
  WHITE: "#FFFFFF",
  VIVIDWHITE: "#FDFFFC",
  PINK_50: "#FCE4EC",
  PINK_100: "#F8BBD0",
  PINK_200: "#F48FB1",
  PINK_300: "#F06292",
  PINK_400: "#EC407A",
  PINK_500: "#E91E63",
  BLACK: "#000000",
  BLACK87: "rgba(0, 0, 0, 0.87)",
  BLACK38: "rgba(0, 0, 0, 0.38)",
  BLACK60: "rgba(0, 0, 0, 0.6)",
  BLUE: "#2699fb",
  DARKBLUE: "#01295F",
  LIGHTBLUE: "#74D9F6",
  DARKSKYBLUE: "#238ce5",
  GREEN: "#40be65",
  LIGHTGREEN: "#76db94",
  TEXT_GREEN: "#54c374",
  MIDGREY: "#6F6F6F",
  BADGE_BACKGROUND: "#efeff4",
  DARKYELLOW: "#ffbd49",
  CARBON: "#1E1E1E",
  FLUORESCENT: "#D0FF00",
  PURPLE: "#5100A8",
  DULLPURPLE: "#2D005C",
  DULLORANGE: "#D01217",
  CYAN: "#01BAEF",
  VIVIDORANGE: "#FC4214"
};

const avatarImages = [
  require("../../assets/images/Fox.png"),
  require("../../assets/images/chicken.png"),
  require("../../assets/images/Dog.png"),
  require("../../assets/images/Tiger.png")
];

const MAX_STARS = 5;

const SUBSCRIPTIONS_ACTIVE_START_DATE = new Date("2019-09-30");

export {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  MAX_STARS,
  colors,
  avatarImages,
  SUBSCRIPTIONS_ACTIVE_START_DATE
};
