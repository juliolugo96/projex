import React from 'react';
import { Container, Button, Fab, Header, Icon, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View } from 'native-base';

export default class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          active: 'true'
        };
      }
  
    render() {

        const {navigation} = this.props; 

    return (
      <Container>
            <View style={{flex: 1}}>
                <List>
                    <ListItem avatar onPress={()=>navigation.navigate("TasksBoards")}>
                    <Left>
                        <Thumbnail source={{ uri: 'Image URL' }} />
                    </Left>
                    <Body>
                        <Text>Kumar Pratik</Text>
                        <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                        <Text note>3:43 pm</Text>
                    </Right>
                    </ListItem>
                </List>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="share" />
                    <Button style={{ backgroundColor: '#34A34F' }}>
                    <Icon name="logo-whatsapp" />
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }}>
                    <Icon name="logo-facebook" />
                    </Button>
                    <Button disabled style={{ backgroundColor: '#DD5144' }}>
                    <Icon name="mail" />
                    </Button>
                </Fab>
            </View>
      </Container>
    );
  }
}