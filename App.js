import React from 'react';
import {Root} from 'native-base';
import AppContainer from './src/navigation/AppNavigator';

import { pushNotifications } from './src/services';

pushNotifications.configure();

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
