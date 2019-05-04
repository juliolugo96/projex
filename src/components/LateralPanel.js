import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button } from 'native-base';

export default class LateralPanel extends Component {
    state = {
        switch: false
    };

    constructor(props){
        super(props)

        this.handleSwitch = this.handleSwitch.bind(this);
    }

    handleSwitch(){
        this.setState({switch: !this.state.switch})
    }
 
    render() {

    const {navigation} = this.props;

    return (
      <Container>
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Airplane Mode</Text>
            </Body>
            <Right>
              <Switch value={this.state.switch} onValueChange={this.handleSwitch} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Bluetooth</Text>
            </Body>
            <Right>
              <Text>On</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <Button style={{marginLeft:'auto', marginRight:'auto', width: '90%'}} color="blue" onPress={()=>navigation.navigate("Login") }>
              <Text style={{marginLeft:'auto', marginRight:'auto'}}>
                {"Logout"}
              </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
