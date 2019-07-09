import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  View,
  Button,
  Icon,
  Fab,
  Item,
  Input,
  ActionSheet,
  Form
} from "native-base";
import { StyleSheet, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import { COUNTRIES } from "../../constants";
import { COLOR_SCHEMA } from "../../constants";
import {
  signUp,
  retrieveCurrentUser
} from "../../redux/actions/currentUserActions";

class Registration extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    profilePhoto: { uri: "Choose a profile picture" },
    country: "No country selected"
  };

  constructor(props) {
    super(props);

    // this.handlePress = this.handlePress.bind(this);
    // this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    // this.selectCountryTapped = this.selectCountryTapped.bind(this);
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // const imageData = new FormData();
        //imageData.append("name", "image");
        const imageData = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
          // data: response.data
        };

        this.setState({
          profilePhoto: source,
          imageData: imageData
        });
      }
    });
  };

  selectCountryTapped = () => {
    ActionSheet.show(
      {
        options: Object.values(COUNTRIES.getNames("en")),
        title: "Select Country"
      },
      buttonIndex => {
        const option = Object.values(COUNTRIES.getNames("en"))[buttonIndex];

        this.setState({
          country: option == undefined ? this.state.country : option
        });
      }
    );
  };

  handleUsernameInput = e => this.setState({ username: e });

  handleEmailInput = e => this.setState({ email: e });

  handlePasswordInput = e => this.setState({ password1: e });

  handleConfPasswordInput = e => this.setState({ password2: e });

  handlePress = () => {
    const { signUp } = this.props;
    let params = new FormData();

    if (this.state.imageData != undefined)
      params.append("profile_photo", this.state.imageData);
    
      params.append("username", this.state.username);
    params.append("email", this.state.email);
    params.append("password1", this.state.password1);
    params.append("password2", this.state.password2);
    params.append("country", this.state.country);

    signUp(params, this.signUpCallback);
  };

  signUpCallback = response => {
    const { navigation } = this.props;

    this.props.retrieveCurrentUser();
    navigation.navigate("Projects");
  };

  render() {
    return (
      <Container style={styles.container}>
        <View style={{ flex: 1 }}>
          <Fab
            active
            containerStyle={{}}
            style={styles.confirmationFab}
            position="bottomRight"
            onPress={this.handlePress}
          >
            <Icon name="md-checkmark" />
          </Fab>
          <Form>
            <Item style={{ ...styles.item, marginTop: 20 }}>
              <Input
                placeholder="Username"
                onChangeText={this.handleUsernameInput}
              />
            </Item>

            <Item style={styles.item}>
              <Input placeholder="Email" onChangeText={this.handleEmailInput} />
            </Item>

            <Item style={styles.item}>
              <Input
                placeholder="Enter password"
                onChangeText={this.handlePasswordInput}
              />
            </Item>

            <Item style={styles.item}>
              <Input
                placeholder="Confirm password"
                onChangeText={this.handleConfPasswordInput}
              />
            </Item>
          </Form>

          <View style={styles.item}>
            <Button
              style={styles.button}
              onPress={this.selectPhotoTapped.bind(this)}
            >
              <Icon name="md-camera" />
            </Button>
            <View style={styles.textContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.pictureText}
              >
                {this.state.profilePhoto.uri}
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <Button style={styles.button} onPress={this.selectCountryTapped}>
              <Icon name="md-globe" />
            </Button>
            <View style={styles.textContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.pictureText}
              >
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
    flex: 1
  },
  confirmationFab: {
    backgroundColor: "#77dd77"
  },
  item: {
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    flexDirection: "row"
  },
  textContainer: {
    width: "70%"
  },
  button: {
    backgroundColor: COLOR_SCHEMA.light,
    borderRadius: 5
  },
  pictureText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 10
  }
});

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { signUp, retrieveCurrentUser }
)(Registration);
