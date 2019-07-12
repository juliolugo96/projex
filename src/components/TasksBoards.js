import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  Card,
  CardItem,
  Body,
  Text,
  Spinner
} from "native-base";
import { fetchBoards } from "../redux/actions/tasksBoardsActions";
import Board from "./tasksboards_components/Board";
import { COLOR_SCHEMA } from "../constants";

class TasksBoards extends React.Component {
  componentWillMount() {
    this.props.fetchBoards({
      project: this.props.navigation.getParam("id", null)
    });
  }

  render() {
    const { loading, boards } = this.props;

    if (loading)
      return <Spinner color={COLOR_SCHEMA.saturatedDark} size="large" />;

    return (
      <Container>
        <Tabs tabBarPosition="bottom">
          <Tab
            activeTabStyle={{ backgroundColor: "#c47ac0" }}
            tabStyle={{ backgroundColor: "#77567a" }}
            heading="To do"
          >
            <Board
              {...this.props}
              board={boards.find(v => v.title == "todo")}
            />
          </Tab>
          <Tab
            {...this.props}
            activeTabStyle={{ backgroundColor: "#c47ac0" }}
            tabStyle={{ backgroundColor: "#77567a" }}
            heading="Doing"
          >
            <Board
              {...this.props}
              board={boards.find(v => v.title == "doing")}
            />
          </Tab>
          <Tab
            {...this.props}
            activeTabStyle={{ backgroundColor: "#c47ac0" }}
            tabStyle={{ backgroundColor: "#77567a" }}
            heading="Done"
          >
            <Board
              {...this.props}
              board={boards.find(v => v.title == "done")}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  loading: state.tasksBoards.loadingBoards,
  boards: state.tasksBoards.boards
});

export default connect(
  mapStateToProps,
  { fetchBoards }
)(TasksBoards);
