import React from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab, Card, CardItem, Body,  Text } from 'native-base';

export default class TasksBoards extends React.Component{

    render(){
       return ( 
       <Container>
        <Tabs tabBarPosition="bottom" renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Tab1" >
            <Card>
                <CardItem>
                <Body>
                    <Text>
                    {"Hola"}
                    </Text>
                </Body>
                </CardItem>
            </Card>
          </Tab>
          <Tab heading="Tab2">
            <Text>{"How"}</Text>
          </Tab>
          <Tab heading="Tab3">
          <Text>{"Are you?"}</Text>
          </Tab>
        </Tabs>
      </Container>); 
    }

}