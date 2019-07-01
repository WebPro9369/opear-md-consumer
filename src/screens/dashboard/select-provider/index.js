import React from "react";
import { FlatList } from "react-native";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View } from "../../../components/views";
import { ProviderCard } from "../../../components/cards";
import { ContentWrapper } from "../select-symptoms/styles";
import { getVisitRequest } from "@services/opear-api";

const doctorImg = require("../../../../assets/images/Doctor.png");

class SelectProviderScreen extends React.Component {
  constructor(props) {
    super(props);

    const {
      navigation
    } = this.props;

    this.state = {
      providers: [],
      visitID: navigation.getParam("visitID", 0)
    };

    successHandler = res => {
      const {
        care_providers
      } = res.data;

      this.setState({
        providers: care_providers
      });
    }

    getVisitRequest(visitID, { successHandler });

  }

  selectProvider = providerID => {
    const { visitID } = this.state;

    const data = {
      care_provider_id: providerID
    };

    successHandler = res => {

      return navigate("DashboardVisitBooked",{visitID:visitID});
    };

    updateVisit(visitID, data, { successHandler });

  };

  render() {
    const {
      navigation: { goBack, navigate, getParam }
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
          <StyledText fontFamily="FlamaMedium" fontSize={28} lineHeight={40}>
            Select provider
          </StyledText>
        </ContentWrapper>
        <View style={{ flex: 1, marginTop: 32 }}>
          <FlatList
            data={providers}
            renderItem={({ item }) => (
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                <ProviderCard
                  avatarImg={item.avatar}
                  name={item.name}
                  bio={item.biography}
                  history={item.work_history}
                  rating={item.rating}
                  badges={item.specialties.split(",")}
                  onPress={this.selectProvider(item.id)}
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
