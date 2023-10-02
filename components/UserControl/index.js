import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, getAuth  } from "firebase/auth";
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { logEvent } from 'expo-firebase-analytics';

const auth = getAuth()

const UserControl = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  
  const toSignUp = () => {
    setIsSignUp(true);
    // const logWnd = document.getElementsByClassName('loginWnd')[0];
    // const logContent = document.getElementsByClassName('loginContent')[0];
    // const reconfirm = document.getElementsByClassName('passAgain')[0];
    // logWnd.style.height = "195px"
    // logContent.style.height = "155px"
    // reconfirm.style.visibility = 'visible';
    setLoginError("");
  };

  const toLogin = () => {
    setIsSignUp(false);
    // const logWnd = document.getElementsByClassName('loginWnd')[0];
    // const logContent = document.getElementsByClassName('loginContent')[0];
    // const reconfirm = document.getElementsByClassName('passAgain')[0];
    // logWnd.style.height = "160px"
    // logContent.style.height = "120px"
    // reconfirm.style.visibility = 'hidden';
    setLoginError("");
  };


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(auth, email, password);
        onAuthStateChanged(auth, (userCredential) => {
          if (userCredential) {
            console.log('Loggin in as:',userCredential.email)
            console.log(userCredential)
            logEvent('userLogin', {userUid: userCredential.uid, userEmail: userCredential.email});
          }
       });
       
       onClose();
      } else {
        setLoginError("Please fill out the fields");
      }
    } catch (error) {
      setLoginError("Email or password incorrect");
      console.error(error);
    }
  };

  const handleSignup = async () => {
    if (password !== password2){
      setLoginError("Password not match");
      return;
    }
    try{
      if (email !== '' && password !== '') {
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
        logEvent('userSignup', {userEmail: email});
        handleLogin();
        console.log('User account created & signed in!');
        onClose();
          // postData(username) Sync user data here, or pop up and ask if you want to sycn or not
        })
      }
    }
      catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setLoginError('Email already in use!');
        }
        else if (error.code === 'auth/invalid-email') {
          setLoginError('Invalid Email!');
        }
        else if (error.code === 'auth/weak-password') {
          setLoginError('Password too weak!');
        }
        console.error(error);
        
    }
  }

  useEffect(() => {
    toLogin()
  }, []);

  return (
    <View style={styles.overlay}>
      <View style={styles.loginWnd}>
        <View style={styles.loginContent}>
          <Text style={styles.headertext}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
          <Text style={styles.errortext}>{loginError}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={32}></Ionicons>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Your email"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Your password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={setPassword}
          />

          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={setPassword2}
            />
          )}

          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: isSignUp ? '#2196F3' : '#2196F3' }]}
            onPress={isSignUp ? handleSignup : handleLogin}
          >
            <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={isSignUp ? toLogin : toSignUp}
          >
            <Text style={{fontWeight: "bold", textAlign: 'right',}}>{isSignUp ? 'Or Login?' : 'Or Sign Up?'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
  loginWnd: {
    width: '90%',
    maxWidth: 450,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  loginContent: {
    width: '100%',
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  errortext: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginBtn: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  signupBtn: {
    marginTop: 20,
  },
});

export default UserControl;