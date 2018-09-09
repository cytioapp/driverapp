import {StyleSheet} from 'react-native';

const yellow = '#E3C463';
const label = '#000';
const text = '#5C5C5C';
const textBackground = '#F3F3F3';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  darkFieldWrapper: {
    backgroundColor: textBackground,
    padding: 10
  },
  fieldWrapper: {
    padding: 10
  },
  label: {
    color: label,
    fontFamily: 'Nunito-Bold'
  },
  text: {
    color: text,
    fontFamily: 'Nunito-Regular',
    marginVertical: 5
  },
  directionWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textDirection: {
    color: text,
    flex: 3,
    fontFamily: 'Nunito-Regular',
    marginVertical: 5,
    fontSize: 18
  },
  mapImageWrapper: {
    alignItems: 'flex-end',
    flex: 1
  },
  mapImage: {
    height: 50,
    width: 50
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 70
  },
  finishButton: {
    backgroundColor: yellow,
    marginHorizontal: 30
  },
  finishButtonText: {
    color: label,
    fontFamily: 'Nunito-Bold',
    fontSize: 18
  },
  userWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

export default styles;
