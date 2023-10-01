import { FirebaseError } from 'firebase/app';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import { RFValue } from "react-native-responsive-fontsize";
import db from "../config"

export default class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
     username:"",
     email:"",
     password:"",
     confirmPassword:"",
    };
  }
  
registerUser = (email,password,confirmPassword,username) => {
  if(password==confirmPassword){
    db
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then((userCredential) =>{
      alert("User registered!!");
      console.log(userCredential.user.uid)
      this.props.navigation.replacr("Login");
      db.database().ref("/users/" + userCredential.user.uid)
      .set({
        email:userCredential.user.email,
        username: username,
      })
    })
    .catch(error => {
      alert(error.message);
    });
  }else{
  alert("Passwords don't match!");
  }
}

  render() {

    const {email,password,confirmPassword,username} = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <Text style={styles.header}>Create an Account</Text>
 <View style={styles.subheaderContainer}>
          <Text style={styles.subheader}>enter account details or</Text>
          <TouchableOpacity
            style={styles.LoginButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.LoginText}>login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Choose a username"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#888"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.signupButton}
         onPress={() => this.registerUser(email,password,confirmPassword,username)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
    textAlign: 'center',
  },
   subheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  subheader: {
    color: 'white',
    fontSize: 25,
  },
  LoginButton: {
    marginLeft: 10,
  },
  LoginText: {
    color: 'white',
    fontSize: 25,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    color: 'white',
  },
  signupButton: {
    backgroundColor: '#FF6347',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
