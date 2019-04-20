import React from 'react';
import TasksBoards from '../components/TasksBoards'

export default class TasksBoardsScreen extends React.Component{

    render(){
        return (<TasksBoards {...this.props} />);
    }

}