import React from "react";
import ServiceButton from "../../components/service-button";

import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@utils/constants";
import { ContainerView, TitleText, MoreServicesButtonWrapper } from "./styles";

class DashboardScreen extends React.PureComponent {
  render() {
    const serviceButtonNames = [
      "Strep Throat",
      "Ear Infection",
      "Fever",
      "Vital Signs"
    ];
    return (
      <ContainerView>
        <TitleText>Dashboard Screen Coming Soon</TitleText>
      </ContainerView>
    );
  }
}

export default DashboardScreen;
