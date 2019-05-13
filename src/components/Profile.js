import React from 'react';
import { Container, Header, Text, Content, Form, Item, Input, Label, View, Button, Icon  } from 'native-base';
import {StyleSheet, Image, Dimensions } from 'react-native';
import Intl from '../../intl/intl';

export default class Profile extends React.Component {

    constructor(props){
        super(props);

    }

  render() {


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.welcomeImage}
                      source={require('../../assets/images/drawing.png')} 
                />
            </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
      alignItems: 'stretch',
      padding: 10,
      marginTop: 15,
      borderRadius: 100
  },
  welcomeImage: {
      width: Dimensions.get('window').width-80,
      resizeMode: 'contain',
      marginTop: 10,
      marginBottom: 0,
      alignSelf: 'center',
  }, 
  form: {
    flex: 2,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },   
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#77567a',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  bottomText: {
    marginTop: 50,
    fontSize: 12,
    textAlign: 'center',
  },
  signUpNowText: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#77567a' 
  }

}); 
