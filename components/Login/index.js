import React, { Component } from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Image, TouchableOpacity} from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
// import logoImage from '../../assets/taxi1.png';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center'
 },
  form: {
    flex: 1,
  },
  buttonWrapper: {
    padding: 10,
  },
  imageWrapper: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render(){
    return(
      <Subscribe to={[sessionState]}>
        {(session) => (
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <Container style={styles.container}>
              <Content contentContainerStyle={{ flex: 1 }}>
                <View style={styles.imageWrapper}>
                  {/* <Image source={logoImage} style={{height: 100, width: 100}}/> */}
                </View>
                <Form styles={styles.form}>
                  <Item>
                    <Input
                      placeholder="Usuario"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={email => this.setState({ email })}
                      value={this.state.email}
                    />
                  </Item>
                  <Item last>
                    <Input
                      placeholder="Contraseña"
                      secureTextEntry={true}
                      onChangeText={password => this.setState({ password })}
                      value={this.state.password}
                    />
                  </Item>
                </Form>
                <View style={styles.buttonWrapper} >
                  <Button block rounded success onPress={() => session.login(this.state.email, this.state.password)}>
                    <Text>Iniciar Sesión</Text>
                  </Button>
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text>Crear cuenta</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                    <Text>Olvidaste tu contraseña?</Text>
                  </TouchableOpacity>
                </View>
              </Content>
            </Container>
          </KeyboardAvoidingView>
        )}
      </Subscribe>
    )
  }
}

