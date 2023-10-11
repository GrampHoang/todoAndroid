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
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 8,
    height: 32,
    borderRadius: 2,
    elevation: 3,
    backgroundColor: '#2196F3',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default styles;
