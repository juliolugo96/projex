import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Thumbnail
} from "native-base";
import { NavigationActions } from "react-navigation";
import { StatusBar } from "react-native";
import { COLOR_SCHEMA } from "../constants";
import { logOut } from "../api/api";

export default class LateralPanel extends Component {
  state = {
    switch: false
  };

  constructor(props) {
    super(props);

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch() {
    this.setState({ switch: !this.state.switch });
  }

  handlePress = () => {
    params = {};
    a = logOut(params);
    this.props.navigation.navigate("Login");
  };

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <Header
          androidStatusBarColor={"white"}
          span
          style={{ backgroundColor: COLOR_SCHEMA.light }}
        >
          <StatusBar barStyle="dark-content" />

          <Body style={{ paddingTop: 50 }}>
            <Thumbnail
              style={{ marginLeft: "auto", marginRight: "auto" }}
              large
              source={{ uri: "https://img.chilango.com/2009/06/cerati.jpg" }}
            />
          </Body>
        </Header>

        <Content>
          <ListItem
            icon
            onPress={() =>
              navigation.navigate({
                routeName: "Home",
                action: NavigationActions.navigate({ routeName: "Profile" })
              })
            }
          >
            <Left>
              <Button style={{ backgroundColor: COLOR_SCHEMA.light }}>
                <Icon active type="AntDesign" name="user" />
              </Button>
            </Left>
            <Body>
              <Text>My Profile</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() =>
              navigation.navigate({
                routeName: "Home",
                action: NavigationActions.navigate({ routeName: "Projects" })
              })
            }
          >
            <Left>
              <Button style={{ backgroundColor: COLOR_SCHEMA.light }}>
                <Icon type="FontAwesome5" active name="chalkboard-teacher" />
              </Button>
            </Left>
            <Body>
              <Text>My Projects</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() =>
              navigation.navigate({
                routeName: "Home",
                action: NavigationActions.navigate({ routeName: "Settings" })
              })
            }
          >
            <Left>
              <Button style={{ backgroundColor: COLOR_SCHEMA.light }}>
                <Icon type="AntDesign" active name="setting" />
              </Button>
            </Left>
            <Body>
              <Text>Settings</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>

          <Button
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 200,
              width: "90%",
              backgroundColor: COLOR_SCHEMA.saturatedDark
            }}
            onPress={this.handlePress}
          >
            <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
              {"Logout"}
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
