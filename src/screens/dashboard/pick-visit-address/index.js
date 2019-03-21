import React from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View, FlexView } from "../../../components/views";
import { ContentButton } from "./styles";
import { colors } from "../../../utils/constants";

class PickVisitAddressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitAddresses: [
        { id: "1", name: "Home", address: "22341 Prospect Ave #23" },
        { id: "2", name: "Work", address: "18 Mission St" },
        { id: "3", name: "Dad's", address: "23 Santa St Apt 730" }
      ]
    };
  }

  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    const { visitAddresses } = this.state;
    return (
      <ContainerView>
        <View
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 24,
            paddingBottom: 6
          }}
        >
          <NavHeader
            title=""
            size="small"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </View>
        <View>
          <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            <StyledText
              fontFamily="FlamaMedium"
              fontSize={28}
              color={colors.BLACK87}
              lineHeight={30}
            >
              Pick visit address
            </StyledText>
          </View>
          <View
            style={{
              marginTop: 64,
              marginBottom: 64,
              paddingLeft: 16,
              paddingRight: 16
            }}
          >
            {visitAddresses.map(address => (
              <ContentButton
                key={address.id}
                onPress={() => navigate("DashboardSelectDateTime")}
              >
                <FlexView justifyContent="start">
                  <EvilIcons
                    size={40}
                    name="location"
                    style={{ marginLeft: 6, marginRight: 24 }}
                  />
                  <View style={{ padding: 6 }}>
                    <StyledText
                      fontFamily="FlamaMedium"
                      fontSize={14}
                      lineHeight={24}
                    >
                      {address.name}
                    </StyledText>
                    <StyledText
                      fontFamily="Flama"
                      fontSize={14}
                      lineHeight={24}
                    >
                      {address.address}
                    </StyledText>
                  </View>
                </FlexView>
              </ContentButton>
            ))}
            <View style={{ marginTop: 16, marginLeft: 28 }}>
              <TouchableOpacity onPress={() => navigate("DashboardAddAddress")}>
                <FlexView justifyContent="start">
                  <AntDesign
                    name="pluscircle"
                    size={24}
                    color={colors.LIGHTGREEN}
                    style={{
                      marginRight: 24
                    }}
                  />
                  <StyledText fontFamily="FlamaMedium" fontSize={16}>
                    Add address
                  </StyledText>
                </FlexView>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ContainerView>
    );
  }
}

export default PickVisitAddressScreen;
