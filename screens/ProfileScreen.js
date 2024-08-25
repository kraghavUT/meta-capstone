import React, { useState, useEffect } from 'react';

import {Text, TextInput,View, ScrollView, StyleSheet, Pressable, Image,} from 'react-native';
import {validateName, validateEmail} from '../utils/validate'


import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../contexts/AuthContext';

const ProfileScreen = ({ navigation, route }) => {

  const { setOnboard } = useAuthContext();

  const { profile } = route.params;


  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [emailAddress, setEmailAddress] = useState(profile.email);
  const [phoneNum, setPhoneNum] = useState("");
  
  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);
  const isEmailValid = validateEmail(emailAddress);

  const updateProf = async ()=>{
    try {
      await AsyncStorage.setItem('firstName', firstName)
      await AsyncStorage.setItem('lastName', lastName)
      await AsyncStorage.setItem('emailAddress', emailAddress)
      await AsyncStorage.setItem('phoneNum', phoneNum)
      await AsyncStorage.setItem('isOrderChecked', isOrderChecked.toString())
      await AsyncStorage.setItem('isPasswordChecked', isPasswordChecked.toString())
      await AsyncStorage.setItem('isSpecialChecked', isSpecialChecked.toString())
      await AsyncStorage.setItem('isNewsChecked', isNewsChecked.toString())
    }
    catch (e){
      console.error(e);
    }
  }

  const [isOrderChecked, setIsOrderChecked] = useState(false);
  const [isPasswordChecked, setPasswordChecked] = useState(false);
  const [isSpecialChecked, setSpecialChecked] = useState(false);
  const [isNewsChecked, setNewsChecked] = useState(false);


  useEffect(() => {
    const loadStart = async () => {
      try {
        const fName = await AsyncStorage.getItem('firstName');
        if (fName !== null) {
          setFirstName(fName);
        }

        const lName = await AsyncStorage.getItem('lastName');
        if (lName !== null) {
          setLastName(lName);
        }

        const email = await AsyncStorage.getItem('emailAddress');
        if (email !== null) {
          setEmailAddress(email);
        }

        const phone = await AsyncStorage.getItem('phoneNum');
        if (phone !== null) {
          setPhoneNum(phone);
        }

        const savedOrderChecked = await AsyncStorage.getItem('isOrderChecked');
        if (savedOrderChecked !== null) {
          setIsOrderChecked(savedOrderChecked === 'true'); // Convert the string back to a boolean
        }
        const savedPassCheck = await AsyncStorage.getItem('isPasswordChecked');
        if (savedPassCheck !== null) {
          setPasswordChecked(savedPassCheck === 'true');
        }

        const savedNewsCheck = await AsyncStorage.getItem('isNewsChecked');
        if (savedNewsCheck !== null) {
          setNewsChecked(savedNewsCheck === 'true');
        }

        const savedSpecialCheck = await AsyncStorage.getItem('isSpecialChecked');
        if (savedSpecialCheck !== null) {
          setSpecialChecked(savedSpecialCheck === 'true');
        }

      } catch (error) {
        console.error('Failed to load order checked status from AsyncStorage', error);
      }
    };

    loadStart();
  }, []);

  const handleOrderCheck = async (newValue) => {
    setIsOrderChecked(newValue);
    try {
      await AsyncStorage.setItem('isOrderChecked', newValue.toString());
    } catch (error) {
      console.error('Failed to save order checked status to AsyncStorage', error);
    }
  };

  const handlePassCheck = async (newValue) => {
    setPasswordChecked(newValue);
    try {
      await AsyncStorage.setItem('isPasswordChecked', newValue.toString());
    } catch (error) {
      console.error('Failed to save order checked status to AsyncStorage', error);
    }
  };

  const handleNewsCheck = async (newValue) => {
    setNewsChecked(newValue);
    try {
      await AsyncStorage.setItem('isNewsChecked', newValue.toString());
    } catch (error) {
      console.error('Failed to save order checked status to AsyncStorage', error);
    }
  };

  const handleSpecialCheck = async (newValue) => {
    setSpecialChecked(newValue);
    try {
      await AsyncStorage.setItem('isSpecialChecked', newValue.toString());
    } catch (error) {
      console.error('Failed to save order checked status to AsyncStorage', error);
    }
  };
  

  const pickImage = async () => {
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogOut = () => {
    AsyncStorage.clear()
    setOnboard(false)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textLarge}>Personal Information</Text>
      <Text style={styles.textSmall}>Avatar</Text>
      <View style={styles.dualButtons}>
      <View style= {styles.avatarImage}>
      {profile.image ? (
            <Image source={{ uri: profile.image }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarEmpty}>
              <Text style={styles.avatarEmptyText}>
                {profile.firstName && Array.from(profile.firstName)[0]}
                {profile.lastName && Array.from(profile.lastName)[0]}
              </Text>
            </View>
          )}
      </View>
        <Pressable
          style = {styles.button}
          onPress = {() => {pickImage}}>        
          <Text style = {styles.buttonText}>Change</Text>
        </Pressable>
        <Pressable
          style = {styles.button}
          onPress = {() => {}}>        
          <Text style = {styles.buttonText}>Remove</Text>
        </Pressable>
      </View>
    
      <Text style={styles.textSmall}>First name</Text>
      <TextInput style={styles.inputBox} onChangeText = {setFirstName} value = {firstName}></TextInput>
      <Text style={styles.textSmall}>Last name</Text>
      <TextInput style={styles.inputBox} onChangeText = {setLastName} value = {lastName}></TextInput>
      <Text style={styles.textSmall}>Email</Text>
      <TextInput style={styles.inputBox} onChangeText = {setEmailAddress} value = {emailAddress} inputMode='email'></TextInput>
      <Text style={styles.textSmall}>Phone number</Text>
      <TextInput style={styles.inputBox} onChangeText = {setPhoneNum} value = {phoneNum} inputMode='tel' placeholder='xxx-yyy-zzzz'></TextInput>

      <Text style={styles.textLarge}>Email notifications</Text>
      
      <View style={styles.checkboxWrapper}>
        <Checkbox value={isOrderChecked} onValueChange={handleOrderCheck} />
        <Text style={styles.textSmall}>Order statuses</Text>
      </View>

      <View style={styles.checkboxWrapper}>
        <Checkbox value={isPasswordChecked} onValueChange={handlePassCheck} />
        <Text style={styles.textSmall}>Password changes</Text>
      </View>

      <View style={styles.checkboxWrapper}>
        <Checkbox value={isSpecialChecked} onValueChange={handleSpecialCheck} />
        <Text style={styles.textSmall}>Special offers</Text>
      </View>

      <View style={styles.checkboxWrapper}>
        <Checkbox value={isNewsChecked} onValueChange={handleNewsCheck} />
        <Text style={styles.textSmall}>Newsletter</Text>
      </View>

      <Pressable
          style = {styles.button}
          onPress = {handleLogOut}>        
          <Text style = {styles.buttonText}>Log out</Text>
      </Pressable>

      <View style={styles.dualButtons}>
        <Pressable
          style = {styles.button}
          onPress = {() => {
            setFirstName("");
            setLastName("");
            setEmailAddress("");
            setPhoneNum("");
            setIsOrderChecked(false);
            setPasswordChecked(false);
            setNewsChecked(false);
            setSpecialChecked(false);
          }}>        
          <Text style = {styles.buttonText}>Clear all</Text>
        </Pressable>
        <Pressable
          style = {[styles.button, (!isEmailValid || !isFirstNameValid || !isLastNameValid) ? styles. buttonDisabled : styles.buttonActive]}
          disabled={!isEmailValid || !isFirstNameValid || !isLastNameValid}
          onPress = {() => {
            updateProf()
            navigation.navigate("Home")
          }}>  
          <Text style = {styles.buttonText}>Save changes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    
    alignItems: 'space-around',
    padding: 5,
    marginLeft: 10,
  },
  
  avatarEmpty: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0b9a6a",
    alignItems: "center",
    justifyContent: "center",
  },
  dualButtons: {
    flexDirection: 'row',
    alignItems: 'space-around',
    padding: 5,
  },
  textSmall: {
    fontSize: 10,
    color: '#495E57',
    marginLeft: 10,
  },
  textLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  inputBox: {
    height: 40,
    fontSize: 16,
    marginHorizontal: 10,
    borderColor: '#495E57',
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    fontSize: 16,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 5,
    color: 'green'
  },
  buttonActive: {
    borderColor: 'black',
    color: 'green'
  },
  buttonDisabled: {
    borderColor: '#d3d3d3',
  },
  buttonText: {
    color: '#495E57',
    textAlign: 'center',
    fontSize: 16,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10
  },
});

export default ProfileScreen