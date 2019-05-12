import React from 'react';
import { Container, Button, Fab, Header, Icon, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View } from 'native-base';

export default class Board extends React.Component {
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
                    <ListItem onLongPress={() => alert("Edit Task")} avatar onPress={()=>navigation.navigate("EditTask")}>
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
                {
                    this.props.type === "todo" &&
                <Fab
                    active
                    containerStyle={{ }}
                    style={{ backgroundColor: '#77567a' }}
                    position="bottomRight"
                    onPress={() => navigation.navigate("EditTask")}>
                    <Icon name="ios-add" />
                </Fab>
                }
                
            </View>
      </Container>
    );
  }
}