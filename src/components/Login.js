import React from 'react';
import { Container, Header, Text, Content, Form, Item, Input, Label, View, Button,  } from 'native-base';
import {StyleSheet, Image, Dimensions } from 'react-native';
import Intl from '../../intl/intl';

export default class Login extends React.Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onRegisterNowPressed = this.onRegisterNowPressed.bind(this);
    }

    onSubmit(data){
        alert("Hola Mundo")
    }

    onRegisterNowPressed(){
        alert("Registrando")
    }

  render() {


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.welcomeImage}
 source={require('../../assets/images/drawing.png')} />

            </View>

        <Container style={{flex: 4}}>
            <Content style={styles.container}>
              <Form style={styles.form}>
                  <Item floatingLabel>
                  <Label>{Intl.login_username}</Label>
                  <Input />
                  </Item>
                  <Item floatingLabel>
                  <Label>{Intl.login_password}</Label>
                  <Input secureTextEntry={true} />
                  </Item>
              </Form>

              <Button style={styles.button} onPress={this.onSubmit}>
                <Text style={styles.buttonText}>{Intl.login_button}</Text>
              </Button>

              <Text onPress={this.onRegisterNowPressed} style={styles.registerNowText}>{'D'}</Text>
              <Text style={styles.bottomText}>{"Ingenuity Creations ® 2019"}</Text>
            </Content>
        </Container>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1F2',
  },
imageContainer: {
    alignItems: 'stretch',
    padding: 10,
    marginTop: 15,
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
    width: '90%'
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
  registerNowText: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#77567a' 
  }

}); 
