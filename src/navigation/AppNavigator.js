///React Native
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import LoginScreen from '../screens/LoginScreen';
import ProjectsScreen from '../screens/ProjectsScreen'
import TasksBoardsScreen from '../screens/TasksboardsScreen';

const MainStack = createStackNavigator(
    {
      Projects: ProjectsScreen,
      TasksBoards: TasksBoardsScreen
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
// ,
// {
//     contentComponent: (props) => (
//       <LateralPanel {...props}/>
//     ),
// }
)

const AppNavigator = createSwitchNavigator({
    Login: LoginScreen,
    Panel: SidebarPanel,
    
  });

export default AppContainer = createAppContainer(AppNavigator);