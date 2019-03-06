import { Dimensions } from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const colors = {
  WHITE: "#FFFFFF",
  PINK_50: "#FCE4EC",
  PINK_100: "#F8BBD0",
  PINK_200: "#F48FB1",
  PINK_300: "#F06292",
  PINK_400: "#EC407A",
  PINK_500: "#E91E63",

  BLACK: "#000000",
  BLACK87: "rgba(0, 0, 0, 0.87)",
  BLUE: "#2699fb",
  CARBON: "#1E1E1E",
  MIDGREY: "#6F6F6F",
  FLUORESCENT: "#D0FF00",
  VIVIDWHITE: "#FDFFFC",
  PURPLE: "#5100A8",
  DULLPURPLE: "#2D005C",
  CYAN: "#01BAEF",
  DARKBLUE: "#01295F",
  LIGHTBLUE: "#74D9F6",
  VIVIDORANGE: "#FC4214",
  DULLORANGE: "#D01217",
  GREEN: "#40be65",
  LIGHTGREEN: "rgb(118, 219, 148)",
  BADGE_TEXT_GREY: "rgba(0,0,0,0.6)",
  BADGE_BACKGROUND: "#efeff4",
  TEXT_GREY: "rgba(0,0,0,0.6)",
  TEXT_GREEN: "#54c374"
};

export { DEVICE_WIDTH, DEVICE_HEIGHT, colors };
