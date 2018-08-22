import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import DrawerMenu from '../components/DrawerMenu';
import AssignVehicle from '../components/AssignVehicle';
import Profile from '../components/Profile';
import EditName from '../components/EditName';
import EditPhoneNumber from '../components/EditPhoneNumber';
import EditEmail from '../components/EditEmail';
import EditLicense from '../components/EditLicense';

export default createDrawerNavigator({
  Home: {
    screen: Home
  },
  AssignVehicle: {
    screen: AssignVehicle
  },
  Profile: {
    screen: Profile
  },
  EditName: {
    screen: EditName
  },
  EditPhoneNumber: {
    screen: EditPhoneNumber
  },
  EditEmail: {
    screen: EditEmail
  },
  EditLicense: {
    screen: EditLicense
  }
},{
  headerMode: 'none',
  contentComponent: DrawerMenu
});
