import React, { Component } from "react";
import {
  Container,
  Form,
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
  Thumbnail,
  CheckBox,
  Spinner
} from "native-base";
import { StyleSheet, Text } from "react-native";
// import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { COLOR_SCHEMA } from "../../constants";
import { fetchMembers } from "../../redux/actions/membershipsActions";
import {
  createTask,
  updateExistingTask,
  destroyExistingTask
} from "../../redux/actions/tasksBoardsActions";
import moment from "moment";

class EditTask extends Component {
  state = {
    // avatarSource: { uri: "Choose a project picture" },
    title: "",
    description: "",
    priority: 1,
    chosenDate: new Date(),
    assigned: [],
    selected: -1
  };

  constructor(props) {
    super(props);
    const task = props.navigation.getParam("task", undefined);

    if (task) {
      this.state = {
        // avatarSource: { uri: "Choose a project picture" },
        board: task.board,
        task: task,
        title: task.title,
        description: task.description,
        priority: task.priority,
        chosenDate: new Date(task.due_date),
        assigned: task.task_to_user.map(k => k.id),
        selected: this.selectedVal(task.board)
      };
    }

    //    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  selectedVal = val => {
    const a = this.props.boards.find(k => k.id == val);
    switch (a.title) {
      case "todo":
        return 1;
      case "doing":
        return 2;
      case "done":
        return 3;
    }
  };

  componentWillMount() {
    const { projects, fetchMembers, currentProjectId } = this.props;

    // console.log(projects);

    const proj = projects.find(a => a.id == currentProjectId);

    // console.log("Value of proj: ", proj);

    if (proj != undefined) {
      fetchMembers(proj.project_to_user);
    }
  }

  setDate = newDate => this.setState({ chosenDate: newDate });
  changePriority = prior => this.setState({ priority: prior });
  handleTitleChange = e => this.setState({ title: e });
  handleDescriptionChange = e => this.setState({ description: e });
  priority = prior => prior !== this.state.priority;
  isAssigned = a => {
    if (this.state.assigned.find(k => k == a.id)) {
      return {
        borderColor: COLOR_SCHEMA.dark,
        borderWidth: 2,
        borderRadius: 20
      };
    } else return {};
  };
  assign = e => {
    var a = this.state.assigned;
    if (a.find(k => k == e.id)) {
      a = a.filter(k => k != e.id);
      this.setState({ assigned: a });
    } else {
      a.push(e.id);
      this.setState({ assigned: a });
    }
  };

  // selectPhotoTapped() {
  //   const options = {
  //     quality: 1.0,
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     storageOptions: {
  //       skipBackup: true
  //     }
  //   };

  //   ImagePicker.showImagePicker(options, response => {
  //     console.log("Response = ", response);

  //     if (response.didCancel) {
  //       console.log("User cancelled photo picker");
  //     } else if (response.error) {
  //       console.log("ImagePicker Error: ", response.error);
  //     } else if (response.customButton) {
  //       console.log("User tapped custom button: ", response.customButton);
  //     } else {
  //       let source = { uri: response.uri };

  //       // You can also display the image using data:
  //       // let source = { uri: 'data:image/jpeg;base64,' + response.data };

  //       this.setState({
  //         avatarSource: source
  //       });
  //     }
  //   });
  // }

  onSubmit = () => {
    if (!this.state.task) this.generateTask();
    else this.updateTask();
  };

  generateTask = () => {
    const params = {
      title: this.state.title,
      description: this.state.description,
      due_date: moment(this.state.chosenDate)
        .format("YYYY-MM-DD")
        .toString(),
      priority: this.state.priority,
      board: this.props.navigation.getParam("board", undefined),
      task_to_user: this.state.assigned.map(k => ({ user: k }))
    };
    this.props.createTask(params);
  };

  updateTask = () => {
    const params = {
      id: this.state.task.id,
      title: this.state.title,
      description: this.state.description,
      due_date: moment(this.state.chosenDate)
        .format("YYYY-MM-DD")
        .toString(),
      priority: this.state.priority,
      board: this.state.board
    };

    this.props.updateExistingTask(params);
  };

  renderPriorityButtons() {
    const cond = num => num === this.state.priority;
    const isPriority = num => (cond(num) ? COLOR_SCHEMA.dark : "transparent");
    const text = num => {
      return {
        color: cond(num) ? COLOR_SCHEMA.background : COLOR_SCHEMA.black
      };
    };
    const a = ["Low", "Medium", "High"];

    return (
      <React.Fragment>
        {a.map((val, id) => (
          <Button
            key={id}
            block
            onPress={() => this.changePriority(id)}
            bordered={this.priority(id)}
            style={{ ...styles.button, backgroundColor: isPriority(id) }}
          >
            <Text style={text(id)}>{val}</Text>
          </Button>
        ))}
      </React.Fragment>
    );
  }

  setBoard = num => {
    console.log("Boards", this.props.boards);
    var a = {};
    switch (num) {
      case 1:
        a = this.props.boards.find(k => k.title == "todo");
        this.setState({ board: a.id, selected: 1 });
        break;
      case 2:
        a = this.props.boards.find(k => k.title == "doing");
        this.setState({ board: a.id, selected: 2 });
        break;
      case 3:
        a = this.props.boards.find(k => k.title == "done");
        this.setState({ board: a.id, selected: 3 });
        break;
      default:
        break;
    }
  };

  isBoard = num => {
    return num == this.state.selected;
  };

  renderDatePicker() {
    return (
      <DatePicker
        defaultDate={this.state.chosenDate}
        minimumDate={new Date(2018, 1, 1)}
        maximumDate={new Date(2018, 12, 31)}
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
        ref={datePicker => (this.datePicker = datePicker)}
      />
    );
  }

  confirmation = () => {
    alert("Delete successful");
    this.props.navigation.navigate("Projects");
  };

  deleteSelectedTask = () => {
    this.props.destroyExistingTask(
      { id: this.state.task.id },
      this.confirmation
    );
  };

  render() {
    const { navigation, loading } = this.props;

    if (loading) return <Spinner size="large" />;

    return (
      <Container style={styles.container}>
        <Content style={{ flex: 1 }}>
          <Item style={{ ...styles.item, marginTop: 20 }}>
            <Input
              value={this.state.title}
              onChangeText={this.handleTitleChange}
              placeholder="Title"
            />
          </Item>

          <Form>
            <Textarea
              onChangeText={this.handleDescriptionChange}
              value={this.state.description}
              bordered
              style={styles.item}
              rowSpan={5}
              placeholder="Description"
            />
          </Form>

          <View
            style={{
              ...styles.item,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            {this.renderPriorityButtons()}
          </View>

          {/*<View style={styles.item}>
            <Button
              style={{ ...styles.button, backgroundColor: COLOR_SCHEMA.dark }}
              onPress={this.selectPhotoTapped.bind(this)}
            >
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
          </View> */}

          <View style={styles.item}>
            <Icon
              type="FontAwesome"
              style={{ color: COLOR_SCHEMA.dark }}
              name="calendar-plus-o"
            />
            {this.renderDatePicker()}
          </View>

          <List>
            {this.props.members.map((v, id) => (
              <View key={id}>
                <ListItem
                  style={this.isAssigned(v)}
                  avatar
                  onPress={() => this.assign(v)}
                >
                  <Left>
                    <Thumbnail
                      source={{
                        uri: v.profile_photo
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{v.name}</Text>
                    <Text note>{v.email}</Text>
                  </Body>
                  <Right>
                    <Text note>{v.role}</Text>
                  </Right>
                </ListItem>
              </View>
            ))}
          </List>

          {this.state.task && (
            <View>
              <ListItem>
                <CheckBox
                  onPress={() => this.setBoard(1)}
                  checked={this.isBoard(1)}
                  color={COLOR_SCHEMA.dark}
                />
                <Body>
                  <Text>To do</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox
                  onPress={() => this.setBoard(2)}
                  checked={this.isBoard(2)}
                  color={COLOR_SCHEMA.dark}
                />
                <Body>
                  <Text>Doing</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox
                  onPress={() => this.setBoard(3)}
                  checked={this.isBoard(3)}
                  color={COLOR_SCHEMA.dark}
                />
                <Body>
                  <Text>Done</Text>
                </Body>
              </ListItem>
              <Button
                block
                style={{
                  width: "80%",
                  backgroundColor: COLOR_SCHEMA.light,
                  color: "black",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
                onPress={() => this.deleteSelectedTask()}
              >
                <Text>Delete task</Text>
              </Button>
            </View>
          )}
        </Content>
        <Fab
          active
          containerStyle={{ position: "absolute", zIndex: 5000 }}
          style={styles.confirmationFab}
          position="bottomRight"
          onPress={this.onSubmit}
        >
          <Icon name="md-checkmark" />
        </Fab>
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
    width: "30%",
    borderColor: COLOR_SCHEMA.dark
  },
  pictureText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 10
  }
});

const mapStateToProps = state => ({
  members: state.memberships.entities,
  projects: state.projects.entities,
  currentProjectId: state.projects.currentProjectId,
  loading: state.memberships.loading,
  boards: state.tasksBoards.boards
});

export default connect(
  mapStateToProps,
  { fetchMembers, createTask, updateExistingTask, destroyExistingTask }
)(EditTask);
