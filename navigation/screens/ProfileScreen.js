import { useNavigation } from '@react-navigation/core'
import React, {useEffect, useState}  from 'react'
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { auth } from '../../firebase'
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';

const ProfileScreen = () => {
  const navigation = useNavigation()
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[myFood, setFood] = useState('');
  const[myLocation, setLocation] = useState('');

  const handleUpdate = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Home")
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
    <View style={styles.container}>

      {/*title*/}
      <View style={styles.titlesWrapper}>
          <Text style={styles.titlesTitle}>User Profile</Text>
      </View>
      <Image
        style={{width:150, height: 150, marginTop:10}}
        resizeMode="contain"
        source={require('../../assets/user-8.jpeg')}
      />

      <Text style={styles.titleText}>User ID: {auth.currentUser?.uid}</Text>
      <Text style={styles.titleText}>Email: {auth.currentUser?.email}</Text>
    </View>

    <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={styles.input}
          // secureTextEntry
        />
        <TextInput
          placeholder="Favourite Food"
          value={myFood}
          onChangeText={text => setFood(text)}
          style={styles.input}
          // secureTextEntry
        />
        <TextInput
          placeholder="Favourite Location"
          value={myLocation}
          onChangeText={text => setLocation(text)}
          style={styles.input}
          // secureTextEntry
        />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={handleUpdate}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleUpdate}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Update Picture</Text>
      </TouchableOpacity>
    </View>

    </KeyboardAvoidingView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3eb'  
  },

  inputContainer: {
    width: '80%'
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#9ac1af',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#9ac1af',
    fontFamily: 'raleway-regular',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#9ac1af',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  titlesWrapper: {
        marginTop: 10,
        marginHorizontal:25,
        paddingHorizontal: 40,
        borderRadius: 50,
        backgroundColor: '#9ac1af',
        padding:30,
        shadowColor: '#000000',
        shadowOffset: {
        width:0,
        height: 2,
        },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  titlesTitle: {
      color: '#ffffff',
      fontFamily: 'raleway-bold', //make bold
      fontSize: 20,
      textAlign: 'center',
  },

  titleText: {
    marginTop: 15,
    fontFamily: 'Raleway-Regular',
    fontSize:14,
  }

})
