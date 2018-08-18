import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import DrawerMenu from '../components/DrawerMenu';
import AssignVehicle from '../components/AssignVehicle';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';

export default createDrawerNavigator({
  Home: {
    screen: EditProfile
  },
  AssignVehicle: {
    screen: AssignVehicle
  },
  Profile: {
    screen: Profile
  },
  EditProfile: {
    screen: EditProfile
  }
},{
  headerMode: 'none',
  contentComponent: DrawerMenu
});
