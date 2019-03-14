import React from "react";
import { withNavigation } from "react-navigation";
import { StyledText } from "../../../components/text";
import { ContainerView, View, ContentWrapper } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { VisitDetailCard } from "../../../components/cards";
import { colors } from "../../../utils/constants";

const imgFox = require("../../../../assets/images/Fox.png");
const imgDog = require("../../../../assets/images/Dog.png");
const imgTiger = require("../../../../assets/images/Tiger.png");

class UpcomingVisitsScreen extends React.Component {
  state = {
    visitList: [
      {
        key: "1",
        avatarImg: imgDog,
        name: "Benjamin",
        illness: "Flu Shot",
        time: "6PM",
        address: "",
        color: "#f9b44d"
      },
      {
        key: "2",
        avatarImg: imgFox,
        name: "Audrey",
        illness: "Coxsackie Virus",
        time: "6PM",
        address: "",
        color: "#f9b44d"
      },
      {
        key: "3",
        avatarImg: imgTiger,
        name: "Tommy",
        illness: "Vital Signs",
        time: "6PM",
        address: "",
        color: "#f9b44d"
      }
    ]
  };

  render() {
    const { visitList } = this.state;
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <ContainerView style={{ marginTop: 0 }}>
        <ScrollView padding={0}>
          <View style={{ paddingTop: 24 }}>
            <ContentWrapper>
              <StyledText fontSize={16} color={colors.TEXT_GREY}>
                Today
              </StyledText>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                {visitList.map(item => (
                  <View key={item.key} style={{ marginBottom: 9 }}>
                    <VisitDetailCard
                      avatarImg={item.avatarImg}
                      name={item.name}
                      illness={item.illness}
                      time={item.time}
                      address={item.address}
                      onPress={() => navigate("VisitsVisitBooked")}
                    />
                  </View>
                ))}
              </View>
            </ContentWrapper>
          </View>
          <View>
            <ContentWrapper>
              <StyledText>Jan 10</StyledText>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                {visitList.map(item => (
                  <View key={item.key} style={{ marginBottom: 9 }}>
                    <VisitDetailCard
                      avatarImg={item.avatarImg}
                      name={item.name}
                      illness={item.illness}
                      time={item.time}
                      address={item.address}
                      onPress={() => navigate("VisitsVisitBooked")}
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

export default withNavigation(UpcomingVisitsScreen);
