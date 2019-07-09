import React, { Component } from "react";
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
  Textarea,
  DatePicker,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail
} from "native-base";
import { StyleSheet, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import { COUNTRIES, COLOR_SCHEMA } from "../../constants";

export default class EditProject extends Component {
  state = {
    avatarSource: { uri: "Choose a project picture" },
    country: "No country selected"
  };

  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectCountryTapped = this.selectCountryTapped.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  selectPhotoTapped() {
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

        const imageData = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
          // data: response.data
        };

        this.setState({
          avatarSource: source,
          imageData: imageData
        });
      }
    });
  }

  selectCountryTapped() {
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
  }

  handlePress() {
    alert("Confirmed");
  }

  render() {
    const { navigation } = this.props;

    return (
      <Container style={styles.container}>
        <Content style={{ flex: 1 }}>
          <Fab
            active
            containerStyle={{}}
            style={styles.confirmationFab}
            position="bottomRight"
            onPress={this.handlePress}
          >
            <Icon name="md-checkmark" />
          </Fab>

          <Item style={{ ...styles.item, marginTop: 20 }}>
            <Input placeholder="Title" />
          </Item>

          <Textarea style={styles.item} rowSpan={5} placeholder="Description" />

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
                {this.state.avatarSource.uri}
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(2018, 1, 1)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
            />
          </View>

          <Item style={{ ...styles.item, marginTop: 20 }}>
            <Input placeholder="Add new member" />
            <Icon name="ios-add" />
          </Item>

          <Content>
            <List>
              <ListItem avatar onPress={() => navigation.navigate("Profile")}>
                <Left>
                  <Thumbnail source={{ uri: "Image URL" }} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Invitation sent</Text>
                </Body>
                <Right>
                  <Text note>Developer</Text>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  confirmationFab: {
    backgroundColor: COLOR_SCHEMA.saturatedDark
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
    backgroundColor: "#e39ec1",
    borderRadius: 5
  },
  pictureText: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 10
  }
});
