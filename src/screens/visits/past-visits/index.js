import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withNavigation } from "react-navigation";
import { StyledText } from "../../../components/text";
import { ContainerView, View, ContentWrapper } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { VisitDetailCard } from "../../../components/cards";
import { colors } from "../../../utils/constants";
import { getVisits } from "@services/opear-api";
import { getIndexByValue } from "@utils";

const imgFox = require("../../../../assets/images/Fox.png");
const imgDog = require("../../../../assets/images/Dog.png");
const imgTiger = require("../../../../assets/images/Tiger.png");

@inject("store")
@observer
class PastVisitsScreen extends React.Component {
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
        userStore,
        visitList: [
          {
            id: 1,
            child_id: 20,
            address_id: 75,
            reason: "fever",
            appointment_time: "6 pm",
            payment_amount: 75,
            care_provider_id: 101
          },
          {
            id: 2,
            child_id: 10,
            address_id: 76,
            reason: "fever",
            appointment_time: "6 pm",
            payment_amount: 175,
            care_provider_id: 101
          }
        ]
      };

      const successHandler = res => {

        //const dateOptions = { hour: 'numeric' };
        //new Date().toLocaleDateString("en-US", dateOptions).toString()

        /*this.setState({
          visitList: res.data
        });*/
      };

      getVisits(userStore.id, { past: true, successHandler});
    }

  render() {
    const { visitList, userStore } = this.state;
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <ContainerView style={{ marginTop: 0 }}>
        <ScrollView padding={0}>
          <View style={{ paddingTop: 24 }}>
            <ContentWrapper>
              <StyledText fontSize={16} color={colors.BLACK60}>
                Today
              </StyledText>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                {visitList.map(item => (
                  <View style={{ marginBottom: 9 }}>
                    <VisitDetailCard
                      avatarImg={imgFox}
                      name={userStore.children[getIndexByValue(userStore.children,item.child_id)].name}
                      illness={item.reason}
                      time={item.appointment_time}
                      address={userStore.addresses[getIndexByValue(userStore.addresses,item.address_id)].street}
                      onPress={() => navigate("VisitsBookingReceipt",{
                        visitID: item.id,
                        visits: visitList
                      })}
                    />
                  </View>
                ))}
              </View>
            </ContentWrapper>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default withNavigation(PastVisitsScreen);
