import styled from "styled-components/native";
import { StyleSheet } from "react-native";
// import { Constants } from "expo";
import { colors } from "../../utils/constants";

export const tabViewStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    // flexDirection: "row",
    paddingTop: 24
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: colors.DARKSKYBLUE
  }
});

export const TabItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 16px;
  border-bottom-width: ${props => (props.active ? "3px" : "0px")};
  border-bottom-color: ${colors.DARKSKYBLUE};
`;
