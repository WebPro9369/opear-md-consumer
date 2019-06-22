import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { getParent } from "@services/opear-api";
import { userFromResult } from "@utils";
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
    const {
      store: {
        userStore
      }
    } = props;

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

  render() {
    const {
      navigation: { navigate },
      store: {
        userStore: { payment_accounts }
      }
    } = this.props;
    const { loading } = this.state;
    return (
      <ContainerView padding={16}>
        <NavHeader
          title="Payment settings"
          size="medium"
          hasBackButton
          onPressBackButton={() => navigate("AccountDefault")}
        />
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
                    onPress={() => navigate("PaymentAddCard", { last4: pm.last4 })}
                  >
                    <FlexView justifyContent="start">
                      <FontAwesome
                        name="cc-visa"
                        size={30}
                        color={colors.BLUE}
                        style={{ marginRight: 16 }}
                      />
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
              <TouchableWrapper onPress={() => navigate("PaymentAddCard")}>
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
