import React from 'react';
import Profile from '../components/Profile.js';

export default class ProfileScreen extends React.Component {

    render(){
        return <Profile {...this.props} />
    }

}