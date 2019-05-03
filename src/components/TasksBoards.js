import React from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab, Card, CardItem, Body,  Text } from 'native-base';

export default class TasksBoards extends React.Component{

    render(){
       return ( 
       <Container>
        <Tabs tabBarPosition="bottom" renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="To do" >
            <Card onPress={()=>this.props.navigation.navigate("EditTask")}>
                <CardItem>
                <Body>
                    <Text> {"Hola"} </Text>
                </Body>
                </CardItem>
            </Card>
          </Tab>
          <Tab heading="Doing">
            <Text>{"How"}</Text>
          </Tab>
          <Tab heading="Done">
          <Text>{"Are you?"}</Text>
          </Tab>
        </Tabs>
      </Container>); 
    }

}