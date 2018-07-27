import { Container } from 'unstated';
import Api from '../utils/api';

class SessionState extends Container {
  state = {
    isLogued: false,
    token: ''
  };

  login = () => {
    Api.post('/drivers/login', {email: 'driver1@driver.com', password: '123456'})
      .then(res => {
        if (res.data.jwt) {
          console.log('Loged');
          this.setState({
            isLogued: true,
            token: res.data.jwt
          }, () => {
            console.log(this.state);
          });
        } else {
          console.log('Not loged');
          this.setState({ isLogued: false });
        }
      })
  }
}

export default SessionState;
