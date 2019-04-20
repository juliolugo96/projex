import React from 'react';
import Projects from '../components/Projects';

export default class ProjectsScreen extends React.Component{

    render(){
        return (
            <Projects {...this.props} />
        );
    }

}