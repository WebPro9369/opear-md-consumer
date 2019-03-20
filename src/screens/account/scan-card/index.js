import React, { Component } from "react";
import { CardIOView, CardIOUtilities } from "react-native-awesome-card-io";
import { View } from "../../../components/views";

class ScanCardComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   CardIOUtilities.preload();
  // }

  componentWillMount() {
    CardIOUtilities.preload();
  }

  didScanCard = card => {
    // the scanned card
    console.tron.log("Card scanned: ", card);
  };

  render() {
    return (
      <View>
        <CardIOView didScanCard={this.didScanCard} style={{ flex: 1 }} />
      </View>
    );
  }
}

export default ScanCardComponent;
