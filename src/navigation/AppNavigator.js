///React Native
import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import LoginScreen from '../screens/LoginScreen';
import ProjectsScreen from '../screens/ProjectsScreen'
import TasksBoardsScreen from '../screens/TasksboardsScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProjectScreen from '../screens/EditProjectScreen'
import EditTaskScreen from '../screens/EditTaskScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import LateralPanel from '../components/LateralPanel';
import { Icon, Text } from 'native-base';
import {TouchableOpacity} from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';

const MainStack = createStackNavigator({
      Projects: {
        screen: ProjectsScreen,
        navigationOptions: ({ navigation }) => {
          return ({
              headerTitle: <Text style={{marginLeft: 'auto', marginRight: 'auto', }}>{"Your Projects"}</Text>,
              });
      }
      },
      EditProject: { screen: EditProjectScreen },
      TasksBoards: { 
        screen: TasksBoardsScreen,
        navigationOptions: ({ navigation }) => {
          return ({
              headerTitle: <Text style={{marginLeft: 'auto', marginRight: 'auto', }}>{"Tasks"}</Text>,
              });
      }
      },
      EditTask: { screen: EditTaskScreen },
      Settings: { screen: SettingsScreen },
      Notifications: { screen: NotificationsScreen },
      Profile: { screen: ProfileScreen }
    },
    {
      defaultNavigationOptions: ({navigation}) => {
        return ({
          headerStyle: {
          elevation: 0
        },
        headerRight: <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Notifications")
                      }}>
                          <Icon style={{marginRight: 20, color: '#c47ac0'}} name="md-notifications"/>
                      </TouchableOpacity>,
              headerLeft: ( 
                  <TouchableOpacity
                    onPress={() => {
                      navigation.openDrawer(); 
                    }}
                  >
                    <Icon bordered size={20} style={{marginLeft: 20, color: '#c47ac0'}} name="md-menu"/>
                  </TouchableOpacity>),
      });
      }
    }
  );

const SidebarPanel = createDrawerNavigator({
    Home: MainStack
},
 {
     contentComponent: (props) => (
       <LateralPanel {...props}/>
     ),
 }
);

const SessionStack = createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerStyle: {
          elevation: 0
        },
      }
    },
    Registration: {
      screen: RegistrationScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Registration",
      }),
      
    } 
  }
)

const AppNavigator = createSwitchNavigator({
    Session: SessionStack,
    Panel: SidebarPanel
  });

export default AppContainer = createAppContainer(AppNavigator);