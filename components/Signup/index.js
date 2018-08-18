import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import { Item, Input, Button, Text, Icon } from 'native-base';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import AuthLayout from '../Layouts/AuthLayout';
import styles from './style';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
// import RNFS from 'react-native-fs';
import Api from '../../utils/api';

var options = {
  title: 'Selecciona una foto',
  takePhotoButtonTitle: 'Tomar una foto',
  chooseFromLibraryButtonTitle: 'Desde galería',
  cancelButtonTitle: 'Cancelar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Signup extends Component {
  state = {
    full_name: '',
    email: '',
    password: '',
    repeated_password: '',
    license_number: '',
    phone_number: '',
    public_service_permission_image: '',
    hidePassword: true,
    hideCopyPassword: true,
    imageSource: null,
    showSpinner: false
  }

  pickImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log('resp',response)
        // this.setState({
        //   imageSource: {
        //     uri: response.data,
        //     fileName: response.fileName
        //   }
        // }, this.uploadFile);
        ImageResizer.createResizedImage('data:image/jpeg;base64,' + response.data, 400, 400, 'JPEG', 50)
          .then((source) => {
            console.log(source);
            // const filePath = Platform.OS === 'android' && source.uri.replace ? source.uri.replace('file://', '') : source.uri;
            // const photoData = await RNFS.readFile(filePath, 'base64')
            // console.log('filePath', filePath);
            this.setState({
              imageSource: {
                uri: source.uri,
                fileName: source.name,
                path: source.path
              }
            }, this.uploadFile);
          }).catch((err) => {
            console.log('Resize error', err);
          });
      }
    });
  };

  uploadFile = () => {
    this.setState({ showSpinner: true });
    Api.postImage('/upload_permission_image', {
      photo: this.state.imageSource,
      field: 'public_service_permission_image'
    })
    .then(data => data.json())
    .then(data => {
      this.setState({ showSpinner: false });
      console.log(data);
      this.setState({
        public_service_permission_image: data.image
      });
    }).catch(err => {
      console.log(err);
    });
  };

  renderErrors = (errors) => {
    return <Text style={styles.errorsText}>{errors[0]}</Text>
  }

  render(){
    const { imageSource } = this.state;
    return(
      <Subscribe to={[sessionState]}>
        {(session) => (
          <AuthLayout>
            {session.state.signupErrors &&
              <View style={styles.errorsContainer}>
                <Icon active name="md-alert" style={styles.errorsIcon} />
                {this.renderErrors(session.state.signupErrors)}
              </View>
            }
            <View style={styles.form}>
              <Item style={styles.item}>
                <Icon active name="person" style={styles.icon} />
                <Input
                  placeholder="Nombre completo"
                  autoCapitalize="none"
                  onChangeText={full_name => this.setState({ full_name })}
                  value={this.state.full_name}
                  placeholderTextColor="#1F120D"
                  style={styles.input}
                />
                <View style={{paddingHorizontal: 15}}></View>
              </Item>
              <Item style={styles.item}>
                <Icon active name="mail" style={styles.icon} />
                <Input
                  placeholder="Correo electrónico"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  placeholderTextColor="#1F120D"
                  style={styles.input}
                />
                <View style={{paddingHorizontal: 15}}></View>
              </Item>
              <Item style={styles.item}>
                <Icon active name="lock" style={styles.icon} />
                <Input
                  placeholder="Contraseña"
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  placeholderTextColor="#1F120D"
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}>
                  <Icon active name="eye" style={styles.icon} />
                </TouchableOpacity>
              </Item>

              <Item style={styles.item}>
                <Icon active name="lock" style={styles.icon} />
                <Input
                  placeholder="Repite la contraseña"
                  secureTextEntry={this.state.hideCopyPassword}
                  onChangeText={repeated_password => this.setState({ repeated_password })}
                  value={this.state.repeated_password}
                  placeholderTextColor="#1F120D"
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => this.setState({ hideCopyPassword: !this.state.hideCopyPassword })}>
                  <Icon active name="eye" style={styles.icon} />
                </TouchableOpacity>
              </Item>

              <Item style={styles.item}>
                <Icon active name="ios-call" style={styles.icon} />
                <Input
                  placeholder="Número de celular"
                  autoCapitalize="none"
                  keyboardType="phone-pad"
                  onChangeText={phone_number => this.setState({ phone_number })}
                  value={this.state.phone_number}
                  placeholderTextColor="#1F120D"
                  style={styles.input}
                />
                <View style={{paddingHorizontal: 15}}></View>
              </Item>

              <Item style={styles.item}>
                <Icon active name="ios-card" style={styles.icon} />
                <Input
                  placeholder="Número de licencia"
                  autoCapitalize="none"
                  onChangeText={license_number => this.setState({ license_number })}
                  value={this.state.license_number}
                  placeholderTextColor="#1F120D"
                  style={styles.input}
                />
                <View style={{paddingHorizontal: 15}}></View>
              </Item>

              <TouchableOpacity style={styles.licenseButton} onPress={this.pickImage}>
                <Icon active name="ios-camera" style={styles.icon} />
                <Text style={styles.licenseText}>Gaffete</Text>
                <View style={{paddingHorizontal: 15}}></View>
              </TouchableOpacity>

              {imageSource && <Image source={{ uri: imageSource.uri }} style={{ width: 40, height: 40 }}/>}

            </View>

            <View style={styles.forgotPasswordButtonWrapper}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signupButtonWrapper} >
              <Button
                block
                style={styles.signupButton}
                onPress={() => session.signup(this.state)}
              >
                <Text style={styles.signupButtonText}>Regístrate</Text>
              </Button>
            </View>

            <View style={styles.loginWrapper}>
              <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.loginLink}>
                  Inicia sesión
                </Text>
              </TouchableOpacity>
            </View>
          </AuthLayout>
        )}
      </Subscribe>
    )
  }
}
