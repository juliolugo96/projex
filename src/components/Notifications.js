import React from 'react';
import { Container, Button, Fab, Header, Icon, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View } from 'native-base';

export default class Notifications extends React.Component {
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
            </View>
      </Container>
    );
  }
}