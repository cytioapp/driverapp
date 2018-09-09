import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logo1 from '../../assets/logo1.png';
import fondo1 from '../../assets/fondo1.jpg';
import styles from './style';

export default class AuthLayout extends Component {
  openTermsAndConditions = () => {
    var url = 'http://www.cytio.com.mx/terminos_y_condiciones';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('No se pudo abrir la uri' + url);
      }
    });
  };

  render(){
    const {children} = this.props;

    return(
      <KeyboardAwareScrollView style={styles.container}>
        <ImageBackground source={fondo1} style={styles.backgroundImage}>
          <View style={styles.completeContainer}>
            <View style={styles.content}>
              <View style={styles.logoContainer}>
                <Image source={logo1} style={styles.logoImage}/>
              </View>
              <View style={styles.contentContainer}>
                {children}
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={this.openTermsAndConditions}>
                <Text style={styles.termsTextButton}>
                  Términos, condiciones y aviso de privacidad
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    )
  }
}
