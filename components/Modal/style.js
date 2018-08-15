import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    width: '100%'
  },
  alert: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E3C463',
    borderRadius: 10,
    borderWidth: 1,
    elevation: 2,
    height: 180,
    justifyContent: 'space-between',
    marginTop: window.height / 2 - 90,
    padding: 20,
    shadowColor: '#1F120D',
    shadowOffset: { width: - 1, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 280
  },
  buttonWrapper: {
    alignSelf: 'flex-end',
    marginRight: 5
  },
  button: {
    backgroundColor: '#E3C463',
    padding: 20
  },
  buttonText: {

  }
});

export default styles;
