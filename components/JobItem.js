import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function JobItem({ job, doDeleteJob, doDoneJob }) {
  return (
    <View style={job.done ? styles.jobItemDone : styles.jobItem}>
      <Text style={job.done ? styles.jobDescriptionDone : styles.jobDescription}>
        {job.description}
      </Text>
      <Text style={styles.jobDateTime}>{job.date} {job.time}</Text>

      <TouchableOpacity onPress={job.done ? doDeleteJob : doDoneJob}>
      {job.done ? (
            <Ionicons name="trash-outline" size={32} color="#dc143c" />
          ) : (
            <Ionicons name="checkmark-outline" size={32} color="green" />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default JobItem;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },

  empty_space: {
    height: 10,
  },

  container: {
    margin: 'auto',
    width: '80%',
    flex: 1,
    flexDirection: 'column',
  },

  bottom: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  jobItem: {
    width: "95%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    height: 45,
  },

  jobItemDone: {
    width: "95%",
    backgroundColor: 'rgb(190, 190, 190)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    height: 45,
  },

  jobDescription: {
    flex: 1,
    fontSize: 18,
  },

  jobDescriptionDone: {
    flex: 1,
    fontSize: 22,
    textDecorationLine: 'line-through',
  },

  jobDateTime: {
    marginLeft: 10,
    marginRight: 10,
  },

  jobButtons: {
    padding: 15,
    flexDirection: 'row', // Flex direction for row layout
    alignItems: 'flex-end',
  },
});
