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
  Button,
  Icon
} from "native-base";
import { StyleSheet, Image, Dimensions } from "react-native";
import Intl from "../../../intl/intl";
import { COLOR_SCHEMA } from "../../constants";
import { pushNotifications } from "../../services";
import { logIn } from "../../redux/actions/currentUserActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // For development purposes only
    /*
      const {navigation} = this.props;
      
      navigation.navigate("Projects")
*/
    //////////////////////////

    

  }

  loginCallback = response => {
    const { navigation } = this.props;

    console.log('Response: ', response);

    navigation.navigate("Projects");
  };

  onLogin = data => {
    const params = { email: "admin@admin.com", password: "admin12345" };

    this.props.logIn(params, this.loginCallback);
  };

  onSignUpNowPressed = () => {
    const { navigation } = this.props;

    navigation.navigate("Registration");
  };

  handleOnPress = () => {
    pushNotifications.localNotification();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.welcomeImage}
            source={require("../../../assets/images/drawing.png")}
          />
        </View>

        <Container style={{ flex: 4 }}>
          <Content style={styles.container}>
            <Form style={styles.form}>
              <Item floatingLabel>
                <Icon active name="md-person" />
                <Label>{Intl.login_username}</Label>
                <Input />
              </Item>

              <Item floatingLabel style={{ marginTop: 10 }}>
                <Icon active name="key" />
                <Label>{Intl.login_password}</Label>
                <Input secureTextEntry={true} />
              </Item>
            </Form>

            <Button style={styles.button} onPress={this.onLogin}>
              <Text style={styles.buttonText}>{Intl.login_button}</Text>
            </Button>

            <Text
              onPress={this.onSignUpNowPressed}
              style={styles.signUpNowText}
            >
              {"Sign Up Now!"}
            </Text>
            <Text style={styles.bottomText}>
              {"Ingenuity Creations ® 2019"}
            </Text>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    alignItems: "stretch"
  },
  welcomeImage: {
    width: Dimensions.get("window").width - 80,
    resizeMode: "contain",
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
    backgroundColor: COLOR_SCHEMA.saturatedDark,
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
    color: COLOR_SCHEMA.saturatedDark
  }
});

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { logIn }
)(Login);
