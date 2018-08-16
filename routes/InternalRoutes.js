import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import DrawerMenu from '../components/DrawerMenu';
import AssignVehicle from '../components/AssignVehicle';
import Profile from '../components/Profile';

export default createDrawerNavigator({
  Home: {
    screen: Home
  },
  AssignVehicle: {
    screen: AssignVehicle
  },
  Profile: {
    screen: Profile
  }
},{
  headerMode: 'none',
  contentComponent: DrawerMenu
});
