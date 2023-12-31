import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Pressable, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import firebase, { authenthication, db, analytics} from './firebase';
import { collection, addDoc, getDoc, getDocs, setDoc, doc, query, deleteDoc } from 'firebase/firestore';
import styles from './styles';
import JobMaker from './components/JobMaker';
import JobItem from './components/JobItem';
import UserControl from './components/UserControl';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
// import * as Analytics from 'expo-firebase-analytics';
import { logEvent } from 'expo-firebase-analytics';
// import * as Analytics from 'expo-firebase-analytics';
// import { getAnalytics, logEvent } from "firebase/analytics";
import Ionicons from '@expo/vector-icons/Ionicons';

// const analytics = getAnalytics();

function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const addJob = async (job) => {
    console.log(job.id)
    try {
      if (user) {
        try {
          setDoc(doc(db, user.uid, job.id), job);
          const updatedJobs = [...jobs, job]; 
          console.log(job);
          setJobs(updatedJobs);  
          logEvent('addJob', {user_id: user.uid, jobDesc: job.description});
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
      } else {
        // const jobId = Date.now();
        // job.id = jobId;
        setJobs((prevJobs) => [...prevJobs, job]);
        updateLocal([...jobs, job]);
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const deleteJob = async (id) => {
    console.log(id)
    try {
      if (user) {
        try {
          const docRef = doc(db, user.uid, id);
          await deleteDoc(docRef);
          logEvent('deleteJob', {user_id: user.uid, jobId: id});
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
        const updatedJobs = jobs.filter((job) => job.id !== id);
        setJobs(updatedJobs);
      } else {
        const updatedJobs = jobs.filter((job) => job.id !== id);
        setJobs(updatedJobs);
        updateLocal(updatedJobs);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const doneJob = async(id) => {
    console.log(id)
    try {
      if (user) {
        try {
          const docRef = doc(db, user.uid, id);
          const docSnap = await getDoc(docRef);
          const updatedData = {
            ...docSnap.data(),
            done: true,
          };
          await setDoc(docRef, updatedData);
          logEvent('doneJob', {user_id: user.uid, jobId: id});
        } catch (e) {
          console.error("Error changing document: ", e);
        }
        const updatedJobs = jobs.map((job) =>
        job.id === id ? { ...job, done: true } : job
        );
        setJobs(updatedJobs);
      } else {
        const updatedJobs = jobs.map((job) =>
        job.id === id ? { ...job, done: true } : job
        );
        setJobs(updatedJobs);
        updateLocal(updatedJobs);
      }
    } catch (error) {
      console.error('Error marking job as done:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      logEvent('userSignout', {userEmail: user.email});
      await authenthication.signOut();
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openLoginWindow = () => {
    setIsLoginVisible(true);
  };

  const closeLoginWindow = () => {
    setIsLoginVisible(false);
  };

  useEffect(() => {
    // logEvent('SeeTheMainPAge', {userUid: "no"});
    const unsubscribe = authenthication.onAuthStateChanged(async (authUser) => {
      const currentUser = authenthication.currentUser;
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      await fetchJobs(currentUser);
    }, (error) => {
      console.error('Firebase Authentication Error:', error);
    });

    return () => unsubscribe();
  }, []);

  const updateLocal = async (updatedJobs) => {
    try {
      await AsyncStorage.setItem('localJobsData', JSON.stringify(updatedJobs));
    } catch (error) {
      console.error('Error saving jobs data to AsyncStorage:', error);
    }
  };

  const fetchJobs = async (user) => {
    try {
      if (user) {
        try {
          // const docRef = collection(db, user.uid);
          // const docSnap = docRef.data;
          const docQue = query(collection(db, user.uid));
          const queSnap = await getDocs(docQue);
          const jobDataArray = [];
          queSnap.forEach((doc) => {
              jobDataArray.push({ id: doc.id, ...doc.data() });
            });
          setJobs(jobDataArray);
        } catch (e) {
          console.error("Error changing document: ", e);
        }
      }
      else{
        try {
          const localJobs = await AsyncStorage.getItem('localJobsData');
          if (localJobs) {
            const parsedJobs = JSON.parse(localJobs);
            setJobs(parsedJobs);
          }
        } catch (error) {
          console.error('Error retrieving local jobs data:', error);
        }
      }
      // Set the fetched jobs in the state
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  return (
    
    <View style={styles.main}>
      {isLoginVisible && (
        <UserControl onClose={() => closeLoginWindow()}></UserControl>
      )}
      <View style={styles.topbar}>
        <Text style={{ textAlign: 'left', fontSize: 20 }}>Hello {user ? user.email.split('@')[0] : 'Guest'}</Text>
        <TouchableOpacity onPress={() => fetchJobs(user)}>
            <Ionicons name="refresh-outline" size={32}></Ionicons>
          </TouchableOpacity>
        {user ? (
          <Pressable style={styles.button} onPress={handleSignOut}>
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
          ) : (
          <Pressable style={styles.button} onPress={openLoginWindow}>
            <Text style={styles.text}>Sign in</Text>
          </Pressable>
        )}
      </View>
      <View style={{ flex: 3 }}>
      <ScrollView style={{ height: "100%" }}>
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} doDeleteJob={() => deleteJob(job.id)} doDoneJob={() => doneJob(job.id)}/>
        ))}
      </ScrollView>
      <JobMaker onAddJob={addJob} />
      </View>
    </View>
  );
}

export default App;
