import React from "react";
import { FlatList } from "react-native";
import { StyledText } from "../../components/text";
import { NavHeader } from "../../components/nav-header";
import { ContainerView, View, HeaderWrapper } from "../../components/views";
import { IllnessCard, ContentWrapper, MatchingMessageWrapper } from "./styles";
import { colors } from "../../utils/constants";

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAppointment: false,
      // selectedIllness: null,
      user: {
        name: "Michael"
      }
    };
  }

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { hasAppointment, user } = this.state;

    return (
      <ContainerView padding={0}>
        <HeaderWrapper>
          <NavHeader title="" size="medium" hasBackButton={false} />
        </HeaderWrapper>
        <ContentWrapper>
          <StyledText fontSize={28} fontFamily="Flama-Medium">
            {"Hi, "}
            {user.name}
            {"!"}
          </StyledText>
        </ContentWrapper>
        {hasAppointment ? (
          <MatchingMessageWrapper>
            <StyledText fontSize={16} lineHeight={24}>
              We are currently matching you with your doctor, be in touch soon!
            </StyledText>
          </MatchingMessageWrapper>
        ) : null}
        <View style={{ marginTop: hasAppointment ? 16 : 48, marginBottom: 40 }}>
          <ContentWrapper>
            <StyledText>What&apos;s affecting your child?</StyledText>
            <View>
              <FlatList
                data={[
                  { key: "1", string: "General", color: "#f9b44d" },
                  { key: "2", string: "Respiratory", color: "#0e7092" },
                  { key: "3", string: "Abdominal", color: "#d7707d" },
                  { key: "4", string: "Ear Nose Throat", color: "#6b82a3" }
                ]}
                renderItem={({ item }) => (
                  <IllnessCard
                    bgColor={item.color}
                    onPress={() =>
                      navigate("SelectSymptoms", { illness: item.string })
                    }
                  >
                    <StyledText
                      fontSize={16}
                      color={colors.WHITE}
                      lineHeight={24}
                    >
                      {item.string}
                    </StyledText>
                  </IllnessCard>
                )}
                horizontal
                style={{ paddingTop: 12, paddingBottom: 12 }}
              />
            </View>
          </ContentWrapper>
        </View>
        <View>
          <ContentWrapper>
            <StyledText>What to expect</StyledText>
            <StyledText
              fontSize={16}
              lineHeight={30}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                color: colors.TEXT_GREY
              }}
            >
              1.&nbsp;&nbsp;&nbsp;&nbsp;Let us know what is affecting your child
            </StyledText>
            <StyledText
              fontSize={16}
              lineHeight={30}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                color: colors.TEXT_GREY
              }}
            >
              2.&nbsp;&nbsp;&nbsp;&nbsp;Select a date and location to meet
            </StyledText>
            <StyledText
              fontSize={16}
              lineHeight={30}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                color: colors.TEXT_GREY
              }}
            >
              3.&nbsp;&nbsp;&nbsp;&nbsp;Choose a pediatrician!
            </StyledText>
          </ContentWrapper>
        </View>
      </ContainerView>
    );
  }
}
export default DashboardScreen;
