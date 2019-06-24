import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { StyledText } from "../../components/text";
import { ContainerView, View, FlexView } from "../../components/views";
import { ChildCard } from "../../components/cards";
import { colors } from "../../utils/constants";
import InactiveUserBanner from "@components/banner"

const imgFox = require("../../../assets/images/Fox.png");
const imgDog = require("../../../assets/images/Dog.png");
const imgTiger = require("../../../assets/images/Tiger.png");

@inject("store")
@observer
class ManageChildrenScreen extends React.Component {
  static propTypes = {
      store: PropTypes.observableObject.isRequired
    };

    constructor(props) {
      super(props);

      const {
        store: {
          userStore: {
            children
          }
        }
      } = props;

      this.state = {
        children
      };
  }

  render() {
    const {
      navigation: { push },
      store: { userStore }
    } = this.props;
    const { children } = this.state;
    return (
      <ContainerView>
        <View style={{ paddingTop: 44 }}>
          <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            <StyledText
              fontFamily="FlamaMedium"
              fontSize={28}
              color={colors.BLACK87}
              lineHeight={30}
            >
              Manage children
            </StyledText>
          </View>
          <InactiveUserBanner userIsActive={userStore.active} />
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
                avatarImg={eval(child.avatarImg)}
                onPress={() => push("ChildrenEditChild",{childID:child.id})}
              />
            ))}
            <View style={{ marginTop: 16, marginLeft: 28 }}>
              <TouchableOpacity onPress={() => push("ChildrenAddChild")}>
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
                    Add child
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

export default ManageChildrenScreen;
