import React from "react";
import { Root } from "native-base";
import AppContainer from "./src/navigation/AppNavigator";
import store from "./src/redux";
import { Provider } from "react-redux";

import { pushNotifications } from "./src/services";

pushNotifications.configure();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}
