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
        <TitleText>How can we help?</TitleText>
        <View style={{ marginHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            <ServiceButton title="a" />
            <ServiceButton title="b" />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            <ServiceButton title="c" />
            <ServiceButton title="d" />
          </View>
        </View>
        <MoreServicesButtonWrapper>
          <Text>
            More Services{" "}
            <Ionicons name="ios-arrow-down" size={14} color={colors.CYAN} />
          </Text>
        </MoreServicesButtonWrapper>
      </ContainerView>
    );
  }
}

export default DashboardScreen;
