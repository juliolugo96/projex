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
import { COLOR_SCHEMA } from "../../constants";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true"
    };
  }

  priorColored = prior => {
    switch (prior) {
      case 0:
        return COLOR_SCHEMA.background;
      case 1:
        return "#FFFFE0";
      case 2:
        return "#FF7f7F";
    }
  };

  render() {
    const { navigation, tasks, loading, board } = this.props;

    if (loading) return <Spinner size="large" />;

    console.log(tasks[board.id]);

    return (
      <Container>
        {board.title === "todo" && (
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
            {tasks[board.id].map((val, id) => (
              <CardItem
                key={id}
                button
                onPress={() => navigation.navigate("EditTask", { task: val })}
                style={{
                  marginTop: id > 0 ? 10 : 5,
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  backgroundColor: this.priorColored(val.priority)
                }}
              >
                <Body>
                  <Text>{val.title}</Text>
                  <Text note>{val.description}</Text>
                </Body>
                <Right>
                  <Text note>{"2:50am"}</Text>
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
  loading: state.tasksBoards.loadingTasks
});

export default connect(mapStateToProps)(Board);
