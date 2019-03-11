import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View, FlexView } from "../../../components/views";
import ServiceButton from "../../../components/service-button";
import { ContentButton } from "./styles";
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
              <ContentButton
                key={child.id}
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
              >
                <FlexView justifyContent="start">
                  <Avatar rounded size={40} source={imgFoxLarge} />
                  <StyledText
                    fontFamily="Flama-Basic"
                    fontSize={16}
                    style={{ marginLeft: 12 }}
                  >
                    {child.name}
                  </StyledText>
                </FlexView>
                <StyledText fontFamily="Flama-Basic" fontSize={16}>
                  {child.age}
                  {" yrs"}
                </StyledText>
              </ContentButton>
            ))}
            <View style={{ marginTop: 16, marginLeft: 28 }}>
              <TouchableOpacity onPress={() => navigate("AddChild")}>
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
                onPress={() => navigate("PickVisitAddress")}
              />
            </View>
          ) : null}
        </View>
      </ContainerView>
    );
  }
}

export default PickChildScreen;
