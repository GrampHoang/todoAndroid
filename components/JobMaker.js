import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function JobMaker({ onAddJob }) {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleAddJob = () => {
    if (description.trim() === '') {
      return; // Prevent adding empty jobs
    }

    const currentDate = new Date();
    const job = {
      description,
      done: false,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
    };

    onAddJob(job);

    // Clear the description input
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
      <Button title="Add Job" onPress={handleAddJob} />
    </View>
  );
}

const styles = StyleSheet.create({
  job: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    height: 55,
    width: "95%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },

  input: {
    flex: 1,
    height: 30,
    marginRight: 10,
  },
});


export default JobMaker;