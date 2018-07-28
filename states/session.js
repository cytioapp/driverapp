import SInfo from 'react-native-sensitive-info';
import { NavigationActions } from 'react-navigation';
import { Container } from 'unstated';
import Api from '../utils/api';

const options = {
  sharedPreferencesName: 'taxiappdriver',
  keychainService: 'taxiappdriver'
};

class SessionState extends Container {
  state = {
    isLogued: null,
    token: ''
  };

  login = () => {
    Api.post('/drivers/login', {email: 'driver1@driver.com', password: '123456'})
      .then(res => {
        if (res.data.jwt) {
          SInfo.setItem('jwt', res.data.jwt, options)
            .then(() => {
              this.setState({
                isLogued: true,
                token: res.data.jwt
              });
            });
        } else {
          this.setState({ isLogued: false });
        }
      })
  }

  verify = () => {
    return new Promise((resolve, reject) => {
      return SInfo.getItem('jwt', options)
        .then(value => {
          if (value)
            this.setState({ isLogued: true }, ()=> {
              return resolve();
            });
          else
            this.setState({ isLogued: false }, ()=> {
              return resolve();
            });
        });
    })
  }

  logout = () => {
    this.setState({ isLogued: false }, () => {
      SInfo.deleteItem('jwt', options)
    });
  }
}

export default SessionState;
