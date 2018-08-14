import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  item: {
    padding: 15
  },
  label: {
    fontFamily: 'Nunito-Bold',
    marginBottom: 5
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 22
  },
  text: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'Nunito-Regular'
  },
  finishButton: {
    backgroundColor: '#000000',
    borderRadius: 50,
    margin: 20
  },
  finishButtonText: {
    fontFamily: 'Nunito-Bold'
  },
  buttonWrapper: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0
  },
  labelWrapper: {
    marginBottom: 20
  }
});

export default styles;
