import React from 'react';
import Main from './src/Main';
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
