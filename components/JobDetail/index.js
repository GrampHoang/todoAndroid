import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function JobDetail({ route }) {
    const job = route.params.job;
    return (
    <View style={styles.overlay}>
      <View style={styles.detailWnd}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={32}></Ionicons>
        </TouchableOpacity>

        <Text style={job.done ? styles.jobDescriptionDone : styles.jobDescription}>
            {job.description}
        </Text>
        <View ></View>
        <Text style={styles.jobDateTime}>{job.date} {job.time}</Text>
      </View>
    </View>
    );
  }
  
  export default JobDetail;
  
  const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      },

      detailWnd: {
        flex: "column",
        width: '90%',
        maxWidth: 450,
        height: '50%',
        maxHeight: 400,
        backgroundColor: 'white',
        alignItems: 'left',
        justifyContent: 'left',
        borderRadius: 10,
        padding: 20,
      },

      closeButton: {
        position: 'absolute',
        top: -10,
        right: -10,
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
  });
  