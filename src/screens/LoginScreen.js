import React from 'react';
import { Container, Header, Text, Content, Form, Item, Input, Label, View, Button,  } from 'native-base';
import {StyleSheet, Image } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
        <View style={{flex: 1}}>
            <View style={styles.logo}>
                <Image           style={{width: '50%', height: '50%'}}
 source={{uri:"https://cdn.pixabay.com/photo/2014/06/01/21/05/photo-effect-359981_960_720.jpg"}} />

            </View>

        <Container style={{flex: 2}}>
            <Content style={styles.container}>
            <Form style={styles.form}>
                <Item floatingLabel>
                <Label>My user</Label>
                <Input />
                </Item>
                <Item floatingLabel last>
                <Label>Password</Label>
                <Input />
                </Item>
            </Form>

            <Button><Text>Hola mundo</Text></Button>
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
  logo: {
    flex: 1, 
    justifyContent: 'center', 
    flexDirection:'row', 
    alignItems: 'center', 
    backgroundColor: '#E8F1F2'},    
  form: {
    flex: 2
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
}); 
