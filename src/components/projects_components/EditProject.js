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
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import { StyleSheet, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import { COLOR_SCHEMA } from "../../constants";
import { BASE_URL } from "../../../config";
import {
  createProject,
  fetchProjects
} from "../../redux/actions/projectsActions";
import {
  fetchMembers,
  getMemberByEmail
} from "../../redux/actions/membershipsActions";
import Dialog from "react-native-dialog";

class EditProject extends Component {
  state = {
    avatarSource: { uri: "Choose a project picture" },
    members: [],
    title: "",
    email: "",
    role: "",
    description: "",
    isRoleDialogVisible: false,
    isConfimationDialogVisible: false,
    projectId: this.props.navigation.getParam("id", -1)
  };

  componentWillMount() {
    const { projects, fetchMembers } = this.props;

    if (this.state.projectId != -1) {
      const proj = Object.values(projects).find(
        a => a.id == this.state.projectId
      );

      if (proj != undefined) {
        fetchMembers(proj.project_to_user);
      }
    }
  }

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

  handleMemberMail = e => this.setState({ email: e });

  handleRoleChange = e => this.setState({ role: e });

  memberAddedCallback = response => {
    this.showRoleDialog(false);

    if (response == "Not found") {
      alert("Oops!, this user is not registered!");
      return;
    }

    if (response.id == this.props.userId) {
      alert("You're the creator!");
      return;
    }

    var temp = this.state.members;
    temp.push({ ...response, status: "invited", role: this.state.role });
    this.setState({ members: temp });
  };

  handleAddMember = () => {
    const { getMemberByEmail } = this.props;
    getMemberByEmail({ email: this.state.email }, this.memberAddedCallback);
  };

  createProjectCallback = response => {
    const { fetchProjects } = this.props;

    fetchProjects();
  };

  handleSubmit = () => {
    const { createProject, userId } = this.props;
    this.showConfirmationDialog(false);
    let params = new FormData();
    let format = [];

    this.state.members.map(value =>
      format.push({
        user: value.id,
        role: value.role,
        status: value.status
      })
    );

    // console.log("Format", format);

    if (this.state.imageData != undefined)
      params.append("project_photo", this.state.imageData);

    params.append("title", this.state.title);
    params.append("description", this.state.description);
    params.append("creator", userId);
    //  params.append("project_to_user", JSON.stringify(format));

    const setParams = { projectParams: params, membershipsParams: format };

    createProject(setParams, this.createProjectCallback);
  };

  showRoleDialog = show => this.setState({ isRoleDialogVisible: show });

  roleDialog = () => (
    <Dialog.Container visible={this.state.isRoleDialogVisible}>
      <Dialog.Title>{"Add role"}</Dialog.Title>

      <Dialog.Description>
        {"Add a role for your new member"}
      </Dialog.Description>

      <Dialog.Input
        underlineColorAndroid={COLOR_SCHEMA.saturatedDark}
        placeholder={"Ex. developer, chief, etc..."}
        onChangeText={this.handleRoleChange}
      />

      <Dialog.Button
        label="Cancel"
        onPress={() => this.showRoleDialog(false)}
      />
      <Dialog.Button label="Add member" onPress={this.handleAddMember} />
    </Dialog.Container>
  );

  showConfirmationDialog = show =>
    this.setState({ isConfirmationDialogVisible: show });

  confirmationDialog = () => (
    <Dialog.Container visible={this.state.isConfirmationDialogVisible}>
      <Dialog.Title>{"Confirm changes"}</Dialog.Title>

      <Dialog.Description>
        {"Are you sure you want to save?"}
      </Dialog.Description>

      <Dialog.Button
        label="Cancel"
        onPress={() => this.showConfirmationDialog(false)}
      />
      <Dialog.Button label="Submit" onPress={this.handleSubmit} />
    </Dialog.Container>
  );

  render() {
    const {
      navigation,
      members,
      loadingMemberships,
      loadingProjects
    } = this.props;
    const membersList =
      this.state.projectId == -1 ? this.state.members : Object.values(members);

    if (loadingMemberships || loadingProjects)
      return <Spinner color={COLOR_SCHEMA.saturatedDark} size="large" />;

    // console.log(this.state);
    return (
      <Container style={styles.container}>
        {this.roleDialog()}
        {this.confirmationDialog()}
        <View style={{ flex: 1 }}>
          <Fab
            active
            containerStyle={{ position: "absolute", zIndex: 5000 }}
            style={styles.confirmationFab}
            position="bottomRight"
            onPress={() => this.showConfirmationDialog(true)}
          >
            <Icon name="md-checkmark" />
          </Fab>
          <Content style={{ flex: 1 }}>
            <Item style={{ ...styles.item, marginTop: 20 }}>
              <Input
                value={this.state.title}
                onChangeText={this.handleTitleChange}
                placeholder="Title"
              />
            </Item>

            <Textarea
              value={this.state.description}
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

            <Item style={{ ...styles.item, marginTop: 20 }}>
              <Input
                onChangeText={this.handleMemberMail}
                placeholder="Add new member"
              />
              <Icon onPress={() => this.showRoleDialog(true)} name="ios-add" />
            </Item>

            <Content>
              <List>
                {membersList.map((value, id) => (
                  <ListItem
                    key={id}
                    avatar
                    onPress={() =>
                      navigation.navigate("Profile", { id: value.id })
                    }
                  >
                    <Left>
                      <Thumbnail
                        source={{ uri: `${BASE_URL}${value.profile_photo}` }}
                      />
                    </Left>
                    <Body>
                      <Text>{value.username}</Text>
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
        </View>
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
  members: state.memberships.entities,
  loadingMemberships: state.memberships.loading,
  loadingProjects: state.projects.loading,
  userId: state.currentUser.id
});

export default connect(
  mapStateToProps,
  { fetchMembers, getMemberByEmail, createProject, fetchProjects }
)(EditProject);
