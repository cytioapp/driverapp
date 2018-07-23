import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';

export default createDrawerNavigator({
  Home: {
    screen: Home
  },
},{ headerMode: 'none'});