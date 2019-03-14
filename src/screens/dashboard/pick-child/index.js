import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View, FlexView } from "../../../components/views";
import { ServiceButton } from "../../../components/service-button";
import { ChildCard } from "../../../components/cards";
import { colors } from "../../../utils/constants";

const imgFoxLarge = require("../../../../assets/images/FoxLarge.png");

class PickChildScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedChild: null,
      children: [
        { id: "1", name: "Benjamin", age: 6, selected: false },
        { id: "2", name: "Audrey", age: 8, selected: false },
        { id: "3", name: "Tara", age: 12, selected: false }
      ]
    };
  }

  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    const { pickedChild, children } = this.state;
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
              fontFamily="Flama-Medium"
              fontSize={28}
              color={colors.BLACK87}
              lineHeight={30}
            >
              Pick a child
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
            {children.map(child => (
              <ChildCard
                key={child.id}
                name={child.name}
                age={child.age}
                avatarImg={imgFoxLarge}
                selected={child.selected}
                onPress={() => {
                  let selectedChild = null;
                  const newChildren = children.map(ch => {
                    if (child.id === ch.id) {
                      selectedChild = ch.id;
                      return {
                        ...ch,
                        selected: true
                      };
                    }
                    return {
                      ...ch,
                      selected: false
                    };
                  });
                  this.setState({
                    pickedChild: selectedChild,
                    children: newChildren
                  });
                }}
              />
            ))}
            <View style={{ marginTop: 16, marginLeft: 28 }}>
              <TouchableOpacity onPress={() => navigate("DashboardAddChild")}>
                <FlexView justifyContent="start">
                  <AntDesign
                    name="pluscircle"
                    size={24}
                    color={colors.LIGHTGREEN}
                    style={{
                      marginRight: 24
                    }}
                  />
                  <StyledText fontFamily="Flama-Medium" fontSize={16}>
                    Add child
                  </StyledText>
                </FlexView>
              </TouchableOpacity>
            </View>
          </View>
          {pickedChild ? (
            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
              <ServiceButton
                title="Select Children"
                onPress={() => navigate("DashboardPickVisitAddress")}
              />
            </View>
          ) : null}
        </View>
      </ContainerView>
    );
  }
}

export default PickChildScreen;
