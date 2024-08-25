import React, { useState, useRef, useEffect, useContext, useCallback} from 'react';
import { View, Text,Image, Button, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Pressable, ScrollView,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import PagerView from "react-native-pager-view";
import { useAuthContext } from "../contexts/AuthContext";
import {validateName, validateEmail} from '../utils/validate'

const OnboardingScreen = ({ navigation }) => {
  
  const { onboard, completeOnboarding } = useAuthContext();


  

  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");

  const isEmailValid = validateEmail(email);
  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);
  const viewPagerRef = useRef(PagerView);

  const onboardInfo = async () => {
    await AsyncStorage.setItem('firstName', firstName)
    await AsyncStorage.setItem('lastName', lastName)
    await AsyncStorage.setItem('emailAddress', email)
    completeOnboarding()
  }


  return (
    <SafeAreaView
      style={styles.container}
      // onLayout={onLayoutRootView}
    >
    <ScrollView>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/littleLemonLogo.png')}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <Text style={styles.welcomeText}>Sign up</Text>
          <View style={styles.pageContainer}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.inputBox}
              value={firstName}
              onChangeText={onChangeFirstName}
              placeholder={"First Name"}
            />
          </View>
          <View style={styles.pageContainer}>

            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.inputBox}
              value={lastName}
              onChangeText={onChangeLastName}
              placeholder={"Last Name"}
            />
          </View>
          
          <View style={styles.pageContainer}>
            <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={"Email"}
                keyboardType="email-address"
              />
          </View>
          <View style={styles.buttons}>
           
            <Pressable
              style={[styles.halfBtn, isEmailValid ? "" : styles.btnDisabled]}
              onPress={onboardInfo}
              disabled={!isEmailValid}
            >
              <Text style={styles.btntext}>Submit</Text>
            </Pressable>
          </View>
     </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
    paddingVertical: 40,
    color: "#495E57",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    color: "#000",
  },
  inputBox: {
    height: 40,
    width: 350,
    fontSize: 16,
    marginHorizontal: 10,
    borderColor: '#495E57',
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnDisabled: {
    backgroundColor: "#f1f4f7",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 18,
    marginBottom: 60,
  },
  halfBtn: {
    flex: 1,
    borderColor: "#f4ce14",
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginRight: 18,
    padding: 10,
    borderWidth: 1,
  },
  btntext: {
    fontSize: 22,
    color: "#333",
    alignSelf: "center",
  },
});


export default OnboardingScreen;
