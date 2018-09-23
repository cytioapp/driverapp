import SInfo from 'react-native-sensitive-info';
import { NavigationActions } from 'react-navigation';
import { Container } from 'unstated';
import Api from '../utils/api';
import firebase from 'react-native-firebase';

const options = {
  sharedPreferencesName: 'taxiappdriver',
  keychainService: 'taxiappdriver'
};

class SessionState extends Container {
  state = {
    isLogued: null,
    loginErrors: null,
    signupErrors: null,
    notificationsState: false,
    user: {
      number: '',
      organizationName: '',
    }
  };

  fetchUserData = () => {
    Api.get('/drivers/profile').then(res => {
      if (res.data && res.data.vehicle) {
        this.setState({
          notificationsState: res.data.user.device_id ? true : false,
          user: {
            number: res.data.vehicle.number,
            organizationName: res.data.vehicle.organization.name
          }
        });
      }
    });
  };

  login = (email, password) => {
    Api.post('/drivers/login', { email, password })
      .then(res => {
        if (res.data.jwt) {
          SInfo.setItem('jwt', res.data.jwt, options)
            .then(() => {
              this.setState(
                {
                  isLogued: true
                },
                () => {
                  NavigationActions.navigate('AssignVehicle');
                }
              );
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.setState({ isLogued: false });
        }
      })
      .catch(err => {
        this.setState({ loginErrors: err.response.data.errors });
      });
  };

  updateUser = user => {
    this.setState({
      user: user
    });
  };

  verify = () => {
    return new Promise((resolve, reject) => {
      return SInfo.getItem('jwt', options)
        .then(value => {
          if (value)
            this.setState({ isLogued: true }, () => {
              return resolve();
            });
          else
            this.setState({ isLogued: false }, () => {
              return resolve();
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  logout = () => {
    this.setState(
      {
        isLogued: false,
        loginErrors: null,
        signupErrors: null,
        user: {
          number: '',
          organizationName: ''
        }
      },
      () => {
        SInfo.deleteItem('jwt', options);
      }
    );
  };

  validations = data => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email.match(emailRegex)) {
      this.setState({
        signupErrors: ['Email inválido']
      });
      return false;
    }

    const numberRegex = /^[0-9+ -]{10,16}$/;
    if (!data.phone_number.match(numberRegex)) {
      this.setState({
        signupErrors: ['Número inválido']
      });
      return false;
    }

    if (data.password.length < 6) {
      this.setState({
        signupErrors: ['La contraseña debe tener mínimo 6 caracteres']
      });
      return false;
    }

    if (data.password !== data.repeated_password) {
      this.setState({
        signupErrors: ['Las contraseñas no coinciden']
      });
      return false;
    } else {
      return true;
    }
  };

  signup = data => {
    this.setState({ signupErrors: false });
    if (this.validations(data)) {
      Api.post('/drivers/signup', data)
        .then(res => {
          this.login(data.email, data.password);
        })
        .catch(err => {
          this.setState({ signupErrors: err.response.data.errors });
        });
    }
  };

  turnOnNotifications = () => {
    firebase.messaging().requestPermission()
      .then(() => {
        firebase.messaging().getToken()
          .then(fcmToken => {
            if (fcmToken) {
              Api.put('/users/profile', { device_id: fcmToken }).then(res => {
                if (res.status == 200) {
                  this.setState({ notificationsState: true });
                }
              });
            } else {
              // user doesn't have a device token yet
            }
          });
      })
      .catch(error => {
        // User has rejected permissions  
      });
  }

  turnOffNotifications = () => {
    Api.put('/users/profile', { device_id: null }).then(res => {
      if (res.status == 200) {
        this.setState({ notificationsState: false });
      }
    });
  }

  toggleNotifications = () => {
    if (this.state.notificationsState) {
      this.turnOffNotifications();
    } else {
      this.turnOnNotifications();
    }
  }
}

export default SessionState;
