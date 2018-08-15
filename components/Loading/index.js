import React from 'react';
import {
  Image,
  ImageBackground,
  View
} from 'react-native';
import { Spinner } from 'native-base';
import logo2 from '../../assets/logo2.png';
import fondo2 from '../../assets/fondo2.jpg';
import styles from './style';

const Loading = () => {
  return (
    <ImageBackground source={fondo2} style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <Image source={logo2} style={styles.logoImage}/>
      </View>
      <View style={styles.container}>
        <View></View>
        <Spinner color="#E3C463"/>
        <View></View>
      </View>
    </ImageBackground>
  );
}

export default Loading;
