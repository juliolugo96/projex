import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Spinner,
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
import {
  fetchProjects,
  setCurrentProject
} from "../redux/actions/projectsActions";
import { BASE_URL } from "../../config";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true"
    };
  }

  componentWillMount() {
    this.props.fetchProjects();
  }

  handleProjectPress(projectId) {
    const { navigation, setCurrentProject } = this.props;
    setCurrentProject(projectId);
    navigation.navigate("TasksBoards", { id: projectId });
  }

  render() {
    const { navigation, loading } = this.props;

    if (loading) return <Spinner size="large" color={COLOR_SCHEMA.dark} />;
    //console.log(this.props.projects);
    return (
      <Container>
        <Fab
          active
          style={styles.addProjectFab}
          position="bottomRight"
          onPress={() => navigation.navigate("EditProject")}
        >
          <Icon name="ios-add" />
        </Fab>
        <Content style={{ flex: 1 }}>
          <List>
            {Object.values(this.props.projects).map((proj, id) => (
              <ListItem
                onLongPress={() =>
                  alert("Project edition currently not available")
                }
                avatar
                onPress={() => this.handleProjectPress(proj.id)}
                key={id}
              >
                <Left>
                  <Thumbnail source={{ uri: proj.project_photo }} />
                </Left>
                <Body>
                  <Text>{proj.title}</Text>
                  <Text note>{proj.description}</Text>
                </Body>
                <Right>
                  <Text note>
                    {new Date(proj.updated_at).toTimeString().split(" ")[0]}
                  </Text>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  addProjectFab: {
    backgroundColor: COLOR_SCHEMA.saturatedDark,
    position: "absolute",
    zIndex: 5000
  }
});

const mapStateToProps = state => {
  return {
    currentProject: state.projects.currentProjectId,
    projects: state.projects.entities,
    loading: state.projects.loading
  };
};

export default connect(
  mapStateToProps,
  { fetchProjects, setCurrentProject }
)(Projects);
