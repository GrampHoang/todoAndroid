import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function truncateText(text) {
  if (text.length <= 20) {
    return text;
  } else {
    return text.slice(0, 20) + '...';
  }
}

function formatTimeDifference(date, time) {
  const now = new Date();
  const jobDateTime = new Date(`${date} ${time}`);
  const timeDifference = now - jobDateTime;

  if (timeDifference < 86400000) { // <Less than> 24 hours
    const hours = Math.floor(timeDifference / 3600000); // Convert to hours
    return `${hours}h ago`;
  } else {
    const days = Math.floor(timeDifference / 86400000); // Convert to days
    return `${days}d ago`;
  }
}

function JobItem({ job, doDeleteJob, doDoneJob }) {
  const timeAgo = formatTimeDifference(job.date, job.time);
  return (
    <View style={job.done ? styles.jobItemDone : styles.jobItem} numberOfLines={1} ellipsizeMode="tail">
      <Text style={job.done ? styles.jobDescriptionDone : styles.jobDescription}>
        {truncateText(job.description)}
      </Text>
      <Text style={styles.jobDateTime}>{timeAgo}</Text>

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
    height: 65,
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
    height: 65,
  },

  jobDescription: {
    flex: 1,
    fontSize: 16,
  },

  jobDescriptionDone: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },

  jobDateTime: {
    marginLeft: 10,
    marginRight: 10,
  },
});
