import React, { Component } from "react";
import {
  CardIOView,
  CardIOModule,
  CardIOUtilities
} from "react-native-awesome-card-io";
import { ContainerView, View, HeaderWrapper } from "../../../components/views";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";

class ScanCardComponent extends Component {
  constructor(props) {
    super(props);
    CardIOUtilities.preload();
    console.tron.log("CardIOUtilities preloaded");
  }

  componentWillMount() {
    // CardIOUtilities.preload();
  }

  scanCard = () => {
    CardIOModule.scanCard()
      .then(card => {
        // the scanned card
      })
      .catch(() => {
        // the user cancelled
      });
  };

  didScanCard = card => {
    const {
      navigation: { goBack }
    } = this.props;

    // the scanned card
    console.tron.log("Card scanned: ", card);
    goBack();
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Scan your card"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <CardIOView didScanCard={this.didScanCard} style={{ flex: 1 }} />
      </ContainerView>
    );
  }
}

export default ScanCardComponent;
