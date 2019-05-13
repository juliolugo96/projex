import React from 'react';
import EditProject from '../components/projects_components/EditProject';

export default class EditProjectScreen extends React.Component{

    render(){
        return <EditProject {...this.props} />;
    }

}