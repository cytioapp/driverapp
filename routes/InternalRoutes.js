import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import DrawerMenu from '../components/DrawerMenu';
import AssignVehicle from '../components/AssignVehicle';

export default createDrawerNavigator({
  Home: {
    screen: Home
  },
  AssignVehicle: {
    screen: AssignVehicle
  }
},{
  headerMode: 'none',
  contentComponent: DrawerMenu
});
