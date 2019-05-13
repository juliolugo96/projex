import React, { Component } from 'react';
import { 
        Container, 
        Form, 
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
        Thumbnail,} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { COLOR_SCHEMA } from '../../constants';

export default class EditProject extends Component {

  state = {
    avatarSource: {uri: "Choose a project picture"},
    priority: 1,
    chosenDate: new Date(),
  };
  
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.setDate = this.setDate.bind(this);
    this.priority = this.priority.bind(this);
    this.changePriority = this.changePriority.bind(this);
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

  handlePress(){
      alert("Confirmed")
  }

  changePriority(prior){
    this.setState({priority: prior})
  }

  priority(prior){
    return prior !== this.state.priority;
  }


  renderPriorityButtons(){
    const cond = num => num === this.state.priority;
    const isPriority = num => cond(num) ? COLOR_SCHEMA.dark : "transparent";
    const text = (num) => {
      return ({color: cond(num) ? COLOR_SCHEMA.background : COLOR_SCHEMA.black})
    }
    const a = ["Low", "Medium", "High"]
    
    return(
      <React.Fragment>
        {
          a.map((val, id) =>
            <Button key={id} block onPress={()=>this.changePriority(id)} bordered={this.priority(id)} style={{...styles.button, backgroundColor: isPriority(id)}}>
              <Text style={text(id)}>{val}</Text>
            </Button>
          )
        }
      </React.Fragment>
    )
  }

  renderDatePicker(){
    return(
        <DatePicker  
        defaultDate={new Date(2018, 4, 4)}
        minimumDate={new Date(2018, 1, 1)}
        maximumDate={new Date(2018, 12, 31)}
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
        ref={datePicker => this.datePicker = datePicker}
        />
      
    )
      
  }


  render() {

    const {navigation} = this.props;

    console.log("Prior:", this.state)

    return (  
      <Container style={styles.container}>
        <Content style={{ flex: 1 }}>
          <Item style={{...styles.item, marginTop: 20}}>
            <Input placeholder="Title" />
          </Item>

          <Form>
           <Textarea bordered style={styles.item} rowSpan={5} placeholder="Description" />
          </Form>
          
          <View style={{...styles.item, flexDirection: 'row', justifyContent:'space-around'}}>
            {this.renderPriorityButtons()}
          </View>
          

          <View style={styles.item}>
            <Button  style={{...styles.button, backgroundColor: COLOR_SCHEMA.dark}} onPress={this.selectPhotoTapped.bind(this)}>
              <Icon name="md-camera" />
            </Button>
            <View style={styles.textContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.pictureText}>
                {this.state.avatarSource.uri}
              </Text>
            </View> 
          </View>

          <View style={styles.item}>
            <Icon type="FontAwesome" style={{color: COLOR_SCHEMA.dark}} name="calendar-plus-o"/>
            {this.renderDatePicker()}
          </View>

          <Item style={{...styles.item, marginTop: 20}}>
            <Input placeholder="Add new member" />
            <Icon name="ios-add"  style={{color: COLOR_SCHEMA.dark}} />
          </Item>

              <List>
                <ListItem  avatar onPress={()=>navigation.navigate("Profile")}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/The_Smith_Family_cast_%28cropped%29.jpg/250px-The_Smith_Family_cast_%28cropped%29.jpg' }} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Invitation sent</Text>
                  </Body>
                  <Right>
                    <Text note>Developer</Text>
                  </Right>
                </ListItem>
                <ListItem avatar onPress={()=>navigation.navigate("Profile")}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/The_Smith_Family_cast_%28cropped%29.jpg/250px-The_Smith_Family_cast_%28cropped%29.jpg' }} />
                  </Left>
                  <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Invitation sent</Text>
                  </Body>
                  <Right>
                    <Text note>Developer</Text>
                  </Right>
                </ListItem>
                <ListItem avatar onPress={()=>navigation.navigate("Profile")}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/The_Smith_Family_cast_%28cropped%29.jpg/250px-The_Smith_Family_cast_%28cropped%29.jpg' }} />
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
        <Fab
          active
          containerStyle={{ }}
          style={styles.confirmationFab}
          position="bottomRight"
          onPress={this.handlePress}>
            <Icon name="md-checkmark" />
        </Fab>
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
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '90%',
      flexDirection: 'row',
    },
    textContainer: {
      width: '70%'
    },
    button: {
      width: '30%',
      borderColor: COLOR_SCHEMA.dark
    },
    pictureText: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 10,
    }
});