import React from 'react';
import {Root} from 'native-base';
import AppContainer from './src/navigation/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
