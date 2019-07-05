import React from "react";
import { FlatList } from "react-native";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ContainerView, View } from "../../../components/views";
import { ProviderCard } from "../../../components/cards";
import { ContentWrapper } from "../select-symptoms/styles";
import  { getVisitRequests, updateVisitRequests } from "@services/opear-api";

class SelectProviderScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      visitID: navigation.getParam("visitID", 0),
      providers: [],
    };

    successHandler = res => {
      const {
        care_provider
      } = res.data;

      this.setState({
        providers: care_provider
      });
    }
  }

  componentDidMount() {
    const { visitID } = this.state;

    const successHandler = res => {
      if  (!res.data) return;

      const providers = res.data.map(visitRequest => {
        const {
          id: visitRequestID,
          visit_id: visitID,
          care_provider_id: careProviderID,
          care_provider: {
            name,
            biography: bio,
            work_history:  history,
            avatar,
            rating,
            specialties: badges,
          }
        } = visitRequest;

        return {
          visitRequestID,
          visitID,
          careProviderID,
          name,
          bio,
          history: history.join(", "),
          avatar,
          rating,
          badges,
        }
      });

      this.setState({ providers });
    }

    getVisitRequests(visitID, { successHandler });
  }

  providerSelectHandler = ({ visitID, visitRequestID } = {}) => {
    const {
      navigation: { navigate }
    } = this.props;

    const successHandler = () => {
      navigate("DashboardDefault");
    };

    updateVisitRequests(visitID, visitRequestID,
      { accepted: true },
      { successHandler }
    );
  };

  render() {
    const {
      navigation: { goBack }
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
                  key={item.visitRequestID}
                  avatarImg={item.avatar}
                  name={item.name}
                  bio={item.biography}
                  history={item.work_history}
                  rating={item.rating}
                  badges={item.badges}
                  onPress={() => this.providerSelectHandler({ visitID: item.visitID, visitRequestID: item.visitRequestID  })}
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
