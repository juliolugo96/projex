import React from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab, Card, CardItem, Body,  Text } from 'native-base';
import Board from './tasksboards_components/Board';

export default class TasksBoards extends React.Component{

    render(){
       return ( 
       <Container>
        <Tabs tabBarPosition="bottom">
          <Tab activeTabStyle={{backgroundColor:'#c47ac0'}} tabStyle={{backgroundColor:'#77567a'}} heading="To do" >
            <Board {...this.props} type='todo' />
          </Tab>
          <Tab {...this.props} activeTabStyle={{backgroundColor:'#c47ac0'}} tabStyle={{backgroundColor:'#77567a'}} heading="Doing">
            <Board type='doing' />
          </Tab>
          <Tab {...this.props} activeTabStyle={{backgroundColor:'#c47ac0'}} tabStyle={{backgroundColor:'#77567a'}} heading="Done">
            <Board type='done' />
          </Tab>
        </Tabs>
      </Container>); 
    }

}