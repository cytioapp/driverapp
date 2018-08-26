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
    loginErrors: null,
    signupErrors: null,
    user: {
      number: '',
      organizationName: ''
    }
  };

  fetchUserData = () => {
    Api.get('/drivers/profile').then(res => {
      if (res.data && res.data.vehicle) {
        this.setState({
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
              console.log(jwt);
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
        console.log(err.response);
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
    this.setState({ isLogued: false }, () => {
      SInfo.deleteItem('jwt', options);
    });
  };

  validatesEmail = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regex);
  };

  validatesPassword = (password, repeated_password) => {
    return password === repeated_password ? true : false;
  };

  validatesNumber = number => {
    const regex = /[0-9+ -]/;
    return email.match(regex);
  };

  signup = data => {
    this.setState({ signupErrors: false });
    if (
      this.validatesEmail(data.email) &&
      this.validatesPassword(data.password, data.repeated_password)
    ) {
      Api.post('/drivers/signup', data)
        .then(res => {
          this.login(data.email, data.password);
        })
        .catch(err => {
          console.log('Signup error', err.response);
          this.setState({ signupErrors: err.response.data.errors });
        });
    } else {
      if (!this.validatesPassword(data.password, data.repeated_password)) {
        this.setState({
          signupErrors: [{ message: 'Las contraseñas no coinciden' }]
        });
      }
      if (!this.validatesEmail(data.email)) {
        this.setState({ signupErrors: [{ message: 'Email inválido' }] });
      }
    }
  };
}

export default SessionState;
