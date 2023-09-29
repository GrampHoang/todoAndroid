import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '98%',
    backgroundColor: 'white',
  },
  empty_space: {
    height: 10,
  },
  
  topbar:{
    display: 'flex',
    flexDirection: 'row', // Use a row layout for horizontal alignment
    justifyContent: 'space-between', // This will space the elements apart
    height: 75,
    width: '100%',
    padding: 20,
  }


});

export default styles;
