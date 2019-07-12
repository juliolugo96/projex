import React from "react";
import { View, Text } from "native-base";

export default class Settings extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 40, marginTop: 50, textAlign: "center" }}>
          Coming soon...
        </Text>
        <Text>Change color schema</Text>
        <Text>Translate the app in multiple languagues</Text>
      </View>
    );
  }
}
