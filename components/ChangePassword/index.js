import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Icon,
  Input,
  Item,
  Spinner,
  Text
} from 'native-base';
import AuthLayout from '../Layouts/AuthLayout';
import styles from './style';
import Api from '../../utils/api';
import Modal from '../Modal';
import SimpleLoading from '../SimpleLoading';

export default class ChangePassword extends Component {
  state = {
    email: '',
    modalVisible: false,
    alerts: [],
    isWaiting: false
  }

  handleEmail = () => {
    this.setState({isWaiting: true});
    Api.post('/password_reset', {email: this.state.email}).then(() => {
      this.setState({
        isWaiting: false,
        alerts: [...this.state.alerts, { message: "Se envió un correo a tu email que te dirá cómo cambiar tu contraseña, sigue las instrucciones y regresa de nuevo a la aplicación para loguearte."}],
        modalVisible: true
      })
    }).catch(() => {
      this.setState({
        isWaiting: false,
        alerts: [...this.state.alerts, { message: "Ha ocurrido un error, vuelve a intentarlo" }],
        modalVisible: true
      })
    });
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      alerts: visible ? this.state.alerts : []
    });
  }

  render(){
    return(
      <AuthLayout>
        { this.state.isWaiting && <SimpleLoading /> }
        <Modal
          errors={this.state.alerts}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          changePassword={true}
          navigation={this.props.navigation}
        />
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
            onPress={() => this.handleEmail()}
          >
            <Text style={styles.sendEmailButtonText}>Enviar correo</Text>
          </Button>
        </View>
      </AuthLayout>
  )
  }
}
