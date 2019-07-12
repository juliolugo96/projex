import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Text,
  Content,
  Form,
  Item,
  Input,
  Label,
  View,
  Thumbnail,
  Button,
  Icon
} from "native-base";
import { StyleSheet, Image, Dimensions } from "react-native";
import Intl from "../../intl/intl";
import { BASE_URL } from "../../config";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;

    console.log("Profile: ", currentUser);

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Thumbnail
            style={{ marginLeft: "auto", marginRight: "auto" }}
            large
            source={{ uri: `${BASE_URL}` + `${currentUser.profilePhoto}` }}
          />

          <Text>{currentUser.username}</Text>
          <Text>{currentUser.email}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    padding: 10,
    marginTop: 15,
    borderRadius: 100
  },
  welcomeImage: {
    width: Dimensions.get("window").width - 80,
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 0,
    alignSelf: "center"
  },
  form: {
    flex: 2,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  button: {
    backgroundColor: "#77567a",
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    borderRadius: 5
  },
  buttonText: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  bottomText: {
    marginTop: 50,
    fontSize: 12,
    textAlign: "center"
  },
  signUpNowText: {
    marginTop: 30,
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#77567a"
  }
});

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
