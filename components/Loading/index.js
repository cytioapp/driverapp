import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View
} from 'react-native';
import { Spinner } from 'native-base';
import logo2 from '../../assets/logo2.png';
import fondo2 from '../../assets/fondo2.jpg';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    height: window.height,
    width: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  logoImage: {
    height: 159,
    width: 190
  },
  container: {
    justifyContent: 'space-between',
    flex: 1
  }
});

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
