import React, { Component } from "react";
import {
  Container,
  Header,
  View,
  Button,
  Icon,
  Fab,
  Item,
  Input,
  ActionSheet,
  Textarea,
  DatePicker,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail
} from "native-base";
import { connect } from "react-redux";
import { StyleSheet, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import { COUNTRIES, COLOR_SCHEMA } from "../../constants";
import { BASE_URL } from "../../../config";
import { fetchMembers } from "../../redux/actions/membershipsActions";

class EditProject extends Component {
  state = {
    avatarSource: { uri: "Choose a project picture" },
    members: [],
    title: "",
    mail: "",
    description: ""
  };

  componentWillMount() {
    const { navigation, projects, fetchMembers } = this.props;
    const projectId = navigation.getParam("id", -1);

    if (projectId != -1) {
      const proj = Object.values(projects).find(a => a.id == projectId);

      if (proj != undefined) {
        fetchMembers(proj.project_to_user);
      }
    }
  }

  setDate = newDate => {
    this.setState({ chosenDate: newDate });
  };

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        const imageData = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };

        this.setState({
          avatarSource: source,
          imageData: imageData
        });
      }
    });
  };

  handleTitleChange = e => this.setState({ title: e });

  handleDescriptionChange = e => this.setState({ description: e });

  handleMemberMail = e => this.setState({ mail: e });

  memberAddedCallback = response => {};

  handleAddMember = () => {
    this.setState({ members: members.push(this.state.mail) });
  };

  handlePress = () => {
    alert("Confirmed");
  };

  render() {
    const { navigation, members } = this.props;
    const membersList =
      Object.values(members).length != 0
        ? Object.values(members).length
        : this.state.members;
    return (
      <Container style={styles.container}>
        <Content style={{ flex: 1 }}>
          <Fab
            active
            containerStyle={{}}
            style={styles.confirmationFab}
            position="bottomRight"
            onPress={this.handlePress}
          >
            <Icon name="md-checkmark" />
          </Fab>

          <Item style={{ ...styles.item, marginTop: 20 }}>
            <Input onChangeText={this.handleTitleChange} placeholder="Title" />
          </Item>

          <Textarea
            onChangeText={this.handleDescriptionChange}
            style={styles.item}
            rowSpan={5}
            placeholder="Description"
          />

          <View style={styles.item}>
            <Button style={styles.button} onPress={this.selectPhotoTapped}>
              <Icon name="md-camera" />
            </Button>
            <View style={styles.textContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.pictureText}
              >
                {this.state.avatarSource.uri}
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(2018, 1, 1)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
            />
          </View>

          <Item style={{ ...styles.item, marginTop: 20 }}>
            <Input
              onChangeText={this.handleMemberMail}
              placeholder="Add new member"
            />
            <Icon onPress={this.handleAddMember} name="ios-add" />
          </Item>

          <Content>
            <List>
              {membersList.length != 0 &&
                membersList.map((value, id) => (
                  <ListItem
                    key={id}
                    avatar
                    onPress={() =>
                      navigation.navigate("Profile", { id: value.id })
                    }
                  >
                    <Left>
                      <Thumbnail
                        source={{ uri: ` ${BASE_URL}${value.profilePhoto}` }}
                      />
                    </Left>
                    <Body>
                      <Text>{value.name}</Text>
                      <Text note>{value.status}</Text>
                    </Body>
                    <Right>
                      <Text note>{value.role}</Text>
                    </Right>
                  </ListItem>
                ))}
            </List>
          </Content>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  confirmationFab: {
    backgroundColor: COLOR_SCHEMA.saturatedDark
  },
  item: {
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    flexDirection: "row"
  },
  textContainer: {
    width: "70%"
  },
  button: {
    backgroundColor: "#e39ec1",
    borderRadius: 5
  },
  pictureText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 10
  }
});

const mapStateToProps = state => ({
  projects: state.projects.entities,
  members: state.memberships.entities
});

export default connect(
  mapStateToProps,
  { fetchMembers }
)(EditProject);
