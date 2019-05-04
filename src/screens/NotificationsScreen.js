import React from 'react';
import Notifications from '../components/Notifications';

export default class NotificationsScreen extends React.Component{

    render(){
        return <Notifications {...this.props} />
    }

}