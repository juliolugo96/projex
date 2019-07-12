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
  View,
  Card,
  CardItem,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import { fetchTasks } from "../../redux/actions/tasksBoardsActions";
import { COLOR_SCHEMA } from "../../constants";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true"
    };
  }

  componentWillMount() {
    const { fetchTasks, board } = this.props;
    fetchTasks({ board: board.id });
  }

  priorColored = prior => {
    switch (prior) {
      case 0:
        return COLOR_SCHEMA.background;
      case 1:
        return "#FFDE83";
      case 2:
        return "#FF7f7F";
    }
  };

  render() {
    const { navigation, tasks, loading, board } = this.props;

    if (loading) return <Spinner size="large" />;

    console.log(tasks);

    return (
      <Container>
        {this.props.board.title === "todo" && (
          <Fab
            active
            containerStyle={{ position: "absolute", zIndex: 5000 }}
            style={{ backgroundColor: "#77567a" }}
            position="bottomRight"
            onPress={() => navigation.navigate("EditTask", { board: board.id })}
          >
            <Icon name="ios-add" />
          </Fab>
        )}
        <Content style={{ flex: 1 }}>
          <Card>
            {tasks.map((val, id) => (
              <CardItem
                key={id}
                button
                onPress={() => navigation.navigate("EditTask", { task: val })}
                style={{ backgroundColor: this.priorColored(val.priority) }}
              >
                <Body>
                  <Text>{val.title}</Text>
                  <Text note>{val.description}</Text>
                </Body>
                <Right>
                  <Text note>{val.created_at}</Text>
                </Right>
              </CardItem>
            ))}
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasksBoards.tasks,
  loading: state.tasksBoards.tasksLoading
});

export default connect(
  mapStateToProps,
  { fetchTasks }
)(Board);
