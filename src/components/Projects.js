import React from "react";
import {
  Container,
  Button,
  Fab,
  Header,
  Icon,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  View
} from "native-base";
import { COLOR_SCHEMA } from "../constants";
import { StyleSheet } from "react-native";
import { fetchProjects } from "../api";

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true"
    };
  }

  componentWillMount() {
    fetchProjects();
  }

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <View style={{ flex: 1 }}>
          <List>
            <ListItem
              onLongPress={() => alert("Edit Project")}
              avatar
              onPress={() => navigation.navigate("TasksBoards")}
            >
              <Left>
                <Thumbnail source={{ uri: "Image URL" }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
          <Fab
            active
            style={styles.addProjectFab}
            position="bottomRight"
            onPress={() => navigation.navigate("EditProject")}
          >
            <Icon name="ios-add" />
          </Fab>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  addProjectFab: {
    backgroundColor: COLOR_SCHEMA.saturatedDark
  }
});
