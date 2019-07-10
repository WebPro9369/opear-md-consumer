/* eslint-disable import/no-unresolved */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View, FlexView } from "../../../components/views";
import { ServiceButton } from "../../../components/service-button";
import { ChildCard } from "../../../components/cards";
import { colors } from "../../../utils/constants";
import { getAge } from "../../../utils";
import { avatarImages } from "@utils/constants";

@inject("store")
@observer
class PickChildScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        userStore: { children }
      }
    } = props;

    this.state = {
      pickedChild: null,
      children
    };
  }

  onSubmit = () => {
    const {
      navigation: { getParam, navigate },
      store: { userStore }
    } = this.props;

    const { pickedChild } = this.state;

    userStore.setVisitRequestPickedChild(pickedChild);

    const screenRef = getParam("screenRef", null);

    if (screenRef) {
      return navigate("DashboardBookingReview");
    }

    return navigate("DashboardPickVisitAddress");
  };

  render() {
    const { navigation } = this.props;
    const { goBack, navigate } = navigation;
    const { pickedChild, children } = this.state;

    return (
      <ContainerView>
        <DeeplinkHandler navigation={navigation} />
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
                name={`${child.first_name} ${child.last_name}`}
                age={getAge(child.dob)}
                selected={pickedChild && child.id === pickedChild}
                avatarImg={avatarImages[child.avatar_image_index]}
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
                  <StyledText fontFamily="FlamaMedium" fontSize={16}>
                    Add child
                  </StyledText>
                </FlexView>
              </TouchableOpacity>
            </View>
          </View>
          {pickedChild ? (
            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
              <ServiceButton title="Select Child" onPress={this.onSubmit} />
            </View>
          ) : null}
        </View>
      </ContainerView>
    );
  }
}

export default PickChildScreen;
