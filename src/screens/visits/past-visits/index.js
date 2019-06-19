import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withNavigation } from "react-navigation";
import { StyledText } from "../../../components/text";
import { ContainerView, View, ContentWrapper } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { VisitDetailCard } from "../../../components/cards";
import { colors } from "../../../utils/constants";
import { getVisits, getChildren } from "@services/opear-api";

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
          userStore: {
            id,
            children,
            visitAddresses
          }
        }
      } = props;

      const successHandler = res => {

        this.setState({
          visitList: res.data
        });
      };

      getVisits(id, { past: true, successHandler});

      this.state = {
        children,
        visitAddresses,
        visitList: []
      };
    }

  render() {
    const { visitList, children, visitAddresses } = this.state;
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
                      name={children[children.findIndex(p => p.id == item.child_id)].name}
                      illness={item.reason}
                      time={item.appointment_time}
                      address={visitAddresses[visitAddresses.findIndex(p => p.id == item.address_id)].address}
                      onPress={() => navigate("VisitsBookingReceipt")}
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
