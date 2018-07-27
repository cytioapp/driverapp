import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import DrawerMenu from '../components/DrawerMenu';
import Login from '../components/Login';

export default createDrawerNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  }
},{
  headerMode: 'none',
  contentComponent: DrawerMenu
});