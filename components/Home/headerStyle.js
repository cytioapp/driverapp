import {StyleSheet} from 'react-native';

const headerBackground = '#262626';
const yellow = '#E3C463';

const styles = StyleSheet.create({
  fontText: {
    color: yellow,
    fontFamily: 'Nunito-Bold'
  },
  header: {
    backgroundColor: headerBackground,
  },
  headerLeft: {
    flex: 1
  },
  bodyHeader: {
    alignItems: 'center',
    flex: 2
  },
  headerRight: {
    flex: 1
  },
  menuIcon: {
    color: yellow
  },
  cancelIcon: {
    color: yellow
  }
});

export default styles;
