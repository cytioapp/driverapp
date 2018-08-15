import { Dimensions, StyleSheet } from 'react-native';

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

export default styles;
