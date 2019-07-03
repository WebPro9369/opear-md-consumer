/* eslint-disable no-eval */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { StyledText } from "../../components/text";
import { View, FlexView } from "../../components/views";
import { ScrollView } from "../../components/views/scroll-view";
import { ChildCard } from "../../components/cards";
import { colors, avatarImages } from "../../utils/constants";
import { getAge } from "../../utils";
import { getChildren } from "@services/opear-api";
import InactiveUserBanner from "@components/banner"

@inject("store")
@observer
class ManageChildrenScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  componentWillMount() {
    const {
      store: { userStore }
    } = this.props;

    const getChildrenSuccessHandler = res => {
      userStore.setChildren(res.data);
    };

    getChildren({ successHandler: getChildrenSuccessHandler });
  }

  render() {
    const {
      navigation: { push },
      store: { userStore }
    } = this.props;
    const { children } = userStore;
    return (
      <ScrollView>
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
                name={`${child.first_name} ${child.last_name}`}
                age={getAge(child.dob)}
                avatarImg={avatarImages[child.avatar_image_index]}
                onPress={() => push("ChildrenEditChild", { childID: child.id })}
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
      </ScrollView>
    );
  }
}

export default ManageChildrenScreen;
