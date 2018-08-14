import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Item, Input, Button, Text, Icon } from 'native-base';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import AuthLayout from '../Layouts/AuthLayout';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1C1C1C'
  },
  errorsContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  errorsIcon: {
    color: '#B72A2A',
    marginRight: 15
  },
  errors: {
    color: '#B72A2A',
    fontSize: 15
  },
  form: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  icon: {
    color: '#1F120D'
  },
  input: {
    textAlign: 'center',
    color: '#1F120D'
  },
  forgotPasswordButtonWrapper: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#1F120D',
    textDecorationLine: 'underline'
  },
  signupButtonWrapper: {
    margin: 40
  },
  signupButton: {
    backgroundColor: '#1F120D',
    borderRadius: 0
  },
  signupButtonText: {
    color: '#E3C463',
    fontWeight: '500'
  },
  createAccountWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginText: {
    color: '#1F120D'
  },
  loginLink: {
    color: '#1F120D',
    textDecorationLine: 'underline'
  }
});

export default class Signup extends Component {
  state = {
    full_name: '',
    email: '',
    password: '',
    repeated_password: '',
    license_number: '',
    hidePassword: true,
    hideCopyPassword: true

  }

  renderErrors = (errors) => {
    return errors.map((error, i) => {
      return <Text key={i} style={styles.errors}>{error.message}</Text>
    });
  }

  render(){
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
