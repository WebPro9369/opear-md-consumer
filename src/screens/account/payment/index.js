/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";
import { getParent } from "@services/opear-api";
import { userFromResult } from "@utils";
import InactiveUserBanner from "@components/banner";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import {
  TouchableWrapper,
  ListTouchableButtonWrapper,
  ListButtonText
} from "./styles";
import { ContainerView, View, FlexView } from "../../../components/views";
import { colors } from "../../../utils/constants";

@inject("store")
@observer
class PaymentScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.getParentInfo();
  }

  getParentInfo() {
    this.setState({ loading: true });
    const {
      store: { userStore }
    } = this.props;
    getParent(userStore.id, {
      successHandler: res => {
        if (res.status === 200) {
          userFromResult(res, userStore);
          this.setState({
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
        }
      },
      errorHandler: () => {
        this.setState({
          loading: false
        });
      }
    });
  }

  previousScreen() {
    const {
      navigation: { getParam, navigate }
    } = this.props;

    const screenRef = getParam("screenRef", null);

    if (screenRef) {
      navigate("DashboardBookingReview", { cardAdded: true });
    } else {
      navigate("AccountDefault");
    }
  }

  render() {
    const {
      navigation: { navigate, getParam },
      store: {
        userStore: { payment_accounts, active }
      }
    } = this.props;
    const { loading } = this.state;
    const screenRef = getParam("screenRef", null);

    return (
      <ContainerView padding={16}>
        <NavHeader
          title="Payment settings"
          size="medium"
          hasBackButton
          onPressBackButton={() => this.previousScreen()}
        />
        <InactiveUserBanner userIsActive={active} />
        <View>
          {loading && (
            <ActivityIndicator size="small" color={colors.SEAFOAMBLUE} />
          )}
          {!loading && payment_accounts && payment_accounts.length > 0 && (
            <View style={{ paddingTop: 16, paddingBottom: 16 }}>
              {payment_accounts.map(pm => {
                return (
                  <ListTouchableButtonWrapper
                    key={pm.last4}
                    onPress={() =>
                      navigate("PaymentAddCard", { last4: pm.last4 })
                    }
                  >
                    <FlexView justifyContent="start">
                      <ListButtonText>{`****${pm.last4}`}</ListButtonText>
                    </FlexView>
                    <FontAwesome
                      name="angle-right"
                      color={colors.MIDGREY}
                      size={24}
                    />
                  </ListTouchableButtonWrapper>
                );
              })}
            </View>
          )}
          {!loading && !payment_accounts.length && (
            <View style={{ marginTop: 16, marginLeft: 28 }}>
              <TouchableWrapper
                onPress={() => navigate("PaymentAddCard", { screenRef })}
              >
                <FlexView justifyContent="start">
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color={colors.LIGHTGREEN}
                    style={{
                      marginRight: 24
                    }}
                  />
                  <StyledText fontFamily="FlamaMedium" fontSize={16}>
                    Add payment method
                  </StyledText>
                </FlexView>
              </TouchableWrapper>
            </View>
          )}
        </View>
      </ContainerView>
    );
  }
}

export default PaymentScreen;
