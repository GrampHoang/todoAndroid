import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Keyboard } from 'react-native';
import 'react-native-get-random-values';

function JobMaker({ onAddJob }) {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleAddJob = () => {
    if (description.trim() === '') {
      return; 
    }

    const currentDate = new Date();
    const job = {
      description,
      done: false,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
      id: Date.now().toString(),
    };
    Keyboard.dismiss();
    onAddJob(job);
    setDescription('');
  };

  return (
    <View style={styles.job}>
      <TextInput
        placeholder="What to do..."
        value={description}
        onChangeText={handleDescriptionChange}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handleAddJob}>
        <Text style={styles.text}>Add Job</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  job: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    height: 60,
    width: "95%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },

  input: {
    paddingLeft: 6,
    flex: 1,
    height: 30,
    marginRight: 10,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 2,
    elevation: 3,
    backgroundColor: '#2196F3',
    height: 32,
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});


export default JobMaker;