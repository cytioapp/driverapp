import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Icon,
  Input,
  Item,
  Text
} from 'native-base';
import AuthLayout from '../Layouts/AuthLayout';


const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    marginTop: 40,
    paddingHorizontal: 30,
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  input: {
    textAlign: 'center',
    color: '#1F120D'
  },
  icon: {
    color: '#1F120D'
  },
  sendEmailButtonWrapper: {
    margin: 40
  },
  sendEmailButton: {
    backgroundColor: '#1F120D',
    borderRadius: 0
  },
  sendEmailButtonText: {
    color: '#E3C463',
    fontWeight: '500'
  },
});

export default class ChangePassword extends Component {
  state = {
    email: ''
  }

  render(){
    return(
      <AuthLayout>
        <View style={styles.form}>
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
        </View>
        <View style={styles.sendEmailButtonWrapper} >
          <Button
            block
            style={styles.sendEmailButton}
          >
            <Text style={styles.sendEmailButtonText}>Enviar correo</Text>
          </Button>
        </View>
      </AuthLayout>
  )
  }
}
