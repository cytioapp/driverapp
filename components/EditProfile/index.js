import React, { Component } from 'react';
import { Alert, Image, Text, View, TextInput } from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Input,
  Left,
  Right,
  Title,
} from 'native-base';
import styles from './style';
import profile from '../../assets/profile.png';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class EditProfile extends Component {
  state = {
    original_full_name: '',
    original_phoneNumber: '+52 312 450 5499',
    original_email: '',
    original_license_number: '',
    original_model: '',
    original_year: '',
    original_license_plate: '',
    original_organization: '',
    original_number: '',
    new_full_name: '',
    new_phoneNumber: '+52 312 450 5499',
    new_email: '',
    new_license_number: '',
    new_model: '',
    new_year: '',
    new_license_plate: '',
    new_organization: '',
    new_number: '',
    buttonDisabled: true
  }

  componentDidMount(){
    this.fillFields();
  }

  fillFields = () => {
    Api.get('/drivers/profile')
    .then(res => {
      this.setState({
        original_full_name: res.data.user.full_name,
        original_email: res.data.user.email,
        original_rate: res.data.rate,
        original_license_number: 'dfsd',
        original_model: res.data.vehicle.model,
        original_year: res.data.vehicle.year,
        original_license_plate: res.data.vehicle.license_plate,
        original_organization: 'res.data.vehicle.organization',
        original_number: res.data.vehicle.number,
        new_full_name: res.data.user.full_name,
        new_email: res.data.user.email,
        new_rate: res.data.rate,
        new_license_number: 'dfsd',
        new_model: res.data.vehicle.model,
        new_year: res.data.vehicle.year,
        new_license_plate: res.data.vehicle.license_plate,
        new_organization: 'res.data.vehicle.organization',
        new_number: res.data.vehicle.number

      })
    }).catch(err => console.log(err))
  }

  handleReturn = () => {
    if(this.difference() === true){
      Alert.alert(
        'Cambios sin guardar',
        '¿Guardar y salir?',
        [
          {text: 'No'},
          {text: 'Si', onPress: () => this.handleSave(true)},
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  handleSave = (returnFlag = false) => {
    /*Api update info code*/
    /*Update original info*/
    if(returnFlag) {
      this.props.navigation.navigate('Profile')
    } else {
      console.log('Guardado')
      this.difference()
    }
  }

  difference = () => {
    if(
      (this.state.original_email !== this.state.new_email) ||
      (this.state.original_full_name !== this.state.new_full_name) ||
      (this.state.original_license_number !== this.state.new_license_number) ||
      (this.state.original_license_plate !== this.state.new_license_plate) ||
      (this.state.original_model !== this.state.new_model) ||
      (this.state.original_number !== this.state.new_number) ||
      (this.state.original_organization !== this.state.new_organization) ||
      (this.state.original_phoneNumber !== this.state.new_phoneNumber) ||
      (this.state.original_year !== this.state.new_year)
     ){
        this.setState({buttonDisabled: false})
        return true
    } else {
        this.setState({buttonDisabled: true})
        return false
    }
  }

  render(){
    return(
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
          <Left style={styles.headerLeft}>
            <Button transparent onPress={() => this.handleReturn()}>
              <Icon name='ios-arrow-back' style={styles.menuIcon} />
            </Button>
          </Left>
          <Body style={styles.bodyHeader}>
            <Title style={styles.fontText}>Editar perfil</Title>
          </Body>
          <Right style={styles.headerRight} />
        </Header>

        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.darkFieldWrapper}>
              <View style={styles.rowWrapper}>
                <View style={styles.profilePhotoWrapper}>
                  <Image style={styles.profilePhoto} source={profile} />
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>Nombre completo:</Text>
                  <Input
                    placeholder="Nombre completo"
                    autoCapitalize="none"
                    onChangeText= {new_full_name => {
                      this.setState({ new_full_name }, () => this.difference())
                    }}
                    value={this.state.original_full_name}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.generalItem}>
                <Text style={styles.label}>Correo:</Text>
                <TextInput
                    placeholder="Correo"
                    autoCapitalize="none"
                    onChangeText={new_email => {
                      this.setState({ new_email }, () => this.difference())
                    }}
                    value={this.state.original_email}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                />
              </View>

              <View style={styles.generalItem}>
                <Text style={styles.label}>Licencia:</Text>
                <TextInput
                    placeholder="Licencia"
                    autoCapitalize="none"
                    onChangeText={new_license_number => {
                      this.setState({ new_license_number }, () => this.difference())
                    }}
                    value={this.state.original_license_number}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                />
              </View>
            </View>

            <View style={styles.fieldWrapper}>
              <View style={styles.rowWrapper}>
                <View style={styles.item}>
                  <Text style={styles.label}>Modelo del taxi:</Text>
                  <TextInput
                    placeholder="Modelo del taxi"
                    autoCapitalize="none"
                    onChangeText={new_model => this.setState({ new_model })}
                    value={this.state.original_model}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                  />
                </View>
                <View style={styles.space}></View>
                <View style={styles.item}>
                  <Text style={styles.label}>Año:</Text>
                  <TextInput
                    placeholder="Año del taxi"
                    autoCapitalize="none"
                    onChangeText={new_year => this.setState({ new_year })}
                    value={this.state.original_year}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                  />
                </View>
              </View>
              <View style={styles.marginTop}>
                <Text style={styles.label}>Placas:</Text>
                <TextInput
                  placeholder="Placas del taxi"
                  autoCapitalize="none"
                  onChangeText={new_license_plate => {
                    this.setState({ new_license_plate }, () => this.difference())
                  }}
                  value={this.state.original_license_plate}
                  placeholderTextColor="#5C5C5C"
                  style={styles.input}
                />
              </View>
              <View style={styles.rowWrapper}>
                <View style={styles.item}>
                  <Text style={styles.label}>Sitio:</Text>
                  <TextInput
                    placeholder="Sitio del taxi"
                    autoCapitalize="none"
                    onChangeText={new_organization => {
                      this.setState({ new_organization }, () => this.difference())
                    }}
                    value={this.state.original_organization}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                  />
                </View>
                <View style={styles.space}></View>
                <View style={styles.item}>
                  <Text style={styles.label}>Número:</Text>
                  <TextInput
                    placeholder="Número"
                    autoCapitalize="none"
                    onChangeText={new_number => {
                      this.setState({ new_number }, () => this.difference())
                    }}
                    value={this.state.original_number}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                  />
                </View>
              </View>
            </View>

            <View style={styles.buttonWrapper} >
              <Button
                block
                style={ this.state.buttonDisabled ? styles.buttonDisabled : styles.button }
                disabled = {this.state.buttonDisabled}
                onPress={() => this.handleSave()}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </Button>
            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
