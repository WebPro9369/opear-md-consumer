import React from "react";
import { FlatList } from "react-native";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View } from "../../../components/views";
import { ProviderCard } from "../../../components/cards";
import { ContentWrapper } from "../select-symptoms/styles";

const doctorImg = require("../../../../assets/images/Doctor.png");

class SelectProviderScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      providers: [
        {
          key: "1",
          avartarImg: doctorImg,
          name: "Dr. John Smith",
          bio: "Hi, this is my bio",
          history: "Hi, this is my work history, line two of my work history",
          rating: "4.5",
          badges: ["Specialty", "Credentials", "Experience"]
        },
        {
          key: "2",
          avartarImg: doctorImg,
          name: "Dr. John Smith",
          bio: "Hi, this is my bio",
          history: "Hi, this is my work history, line two of my work history",
          rating: "4.5",
          badges: ["Specialty", "Credentials", "Experience"]
        },
        {
          key: "3",
          avartarImg: doctorImg,
          name: "Dr. John Smith",
          bio: "Hi, this is my bio",
          history: "Hi, this is my work history, line two of my work history",
          rating: "4.5",
          badges: ["Specialty", "Credentials", "Experience"]
        }
      ]
    };
  }

  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    const { providers } = this.state;

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
            size="small"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </View>
        <ContentWrapper>
          <StyledText fontFamily="Flama-Medium" fontSize={28} lineHeight={40}>
            Select provider
          </StyledText>
        </ContentWrapper>
        <View style={{ flex: 1, marginTop: 32 }}>
          <FlatList
            data={providers}
            renderItem={({ item }) => (
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                <ProviderCard
                  key={item.key}
                  avatarImg={item.avartarImg}
                  name={item.name}
                  bio={item.bio}
                  history={item.history}
                  rating={item.rating}
                  badges={item.badges}
                  onPress={() => navigate("VisitBooked")}
                />
              </View>
            )}
            style={{ paddingLeft: 16, paddingRight: 16 }}
          />
        </View>
      </ContainerView>
    );
  }
}

export default SelectProviderScreen;
