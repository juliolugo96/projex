import React from 'react';
import EditTask from '../components/tasksboards_components/EditTask';

export default class EditTaskScreen extends React.Component{

    render(){
        return <EditTask {...this.props} />;
    }

}