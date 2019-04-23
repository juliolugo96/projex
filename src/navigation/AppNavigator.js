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
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProjectScreen from '../screens/EditProjectScreen'
import EditTaskScreen from '../screens/EditTaskScreen';
import LateralPanel from '../components/LateralPanel';

const MainStack = createStackNavigator(
    {
      Projects: ProjectsScreen,
      EditProject: EditProjectScreen,
      TasksBoards: TasksBoardsScreen,
      EditTask: EditTaskScreen,
      Settings: SettingsScreen
    }/*,
    {
      navigationOptions: {
        headerTintColor: 'white', // "#23354b",//"#0fa69a",
        headerStyle: {
          backgroundColor: "white"//"#0fa69a"
        },      
      }
    },*/
  );

const SidebarPanel = createDrawerNavigator({
    Home: MainStack
}
 ,
 {
     contentComponent: (props) => (
       <LateralPanel {...props}/>
     ),
 }
)

const AppNavigator = createSwitchNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Panel: SidebarPanel,
    
  });

export default AppContainer = createAppContainer(AppNavigator);