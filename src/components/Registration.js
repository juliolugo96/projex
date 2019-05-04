import React, { Component } from 'react';
import { Container, Header, View, Button, Icon, Fab, Item, Input, ActionSheet } from 'native-base';
import {StyleSheet, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {COUNTRIES} from '../constants';

export default class Registration extends Component {
  state = {
    avatarSource: {uri: "Choose a profile picture"},
    country: "No country selected"
  };
  
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectCountryTapped = this.selectCountryTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  selectCountryTapped(){
    ActionSheet.show(
      {
        options: Object.values(COUNTRIES.getNames("en")),
        title: "Select Country"
      },
      buttonIndex => {
        const option = Object.values(COUNTRIES.getNames("en"))[buttonIndex];

        this.setState({country: option == undefined ? this.state.country : option})
      }
    )
  }

  handlePress(){
      alert("Confirmed")
  }

  render() {
    return (  
      <Container style={styles.container}>
        <View style={{ flex: 1 }}>
          <Fab
            active
            containerStyle={{ }}
            style={styles.confirmationFab}
            position="bottomRight"
            onPress={this.handlePress}>
            <Icon name="md-checkmark" />
          </Fab>

          <Item style={{...styles.item, marginTop: 20}}>
            <Input placeholder="Username" />
          </Item>
        
          <Item style={styles.item}>
            <Input placeholder="Email" />
          </Item>

          <View style={styles.item}>
            <Button style={styles.button} onPress={this.selectPhotoTapped.bind(this)}>
              <Icon name="md-camera" />
            </Button>
            <View style={styles.textContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.pictureText}>
                {this.state.avatarSource.uri}
              </Text>
            </View> 
          </View>

          <View style={styles.item}>
            <Button style={styles.button} onPress={this.selectCountryTapped}>
              <Icon name="md-globe" />
            </Button>
            <View style={styles.textContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.pictureText}>
                {this.state.country}
              </Text>
            </View> 
          </View>        
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8F1F2',
    },
    confirmationFab: {
      backgroundColor: '#77dd77'
    },
    item: {
      marginBottom: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '90%',
      flexDirection: 'row',
    },
    textContainer: {
      width: '70%'
    },
    button: {
      backgroundColor: '#e39ec1',
      borderRadius: 5,
    },
    pictureText: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 10,
    }
});