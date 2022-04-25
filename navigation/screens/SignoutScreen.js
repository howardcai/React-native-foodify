import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { auth } from '../../firebase'

const SignoutScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>User ID: {auth.currentUser?.uid}</Text>
      <Text style={styles.titleText}>Email: {auth.currentUser?.email}</Text>
      <Image
        style={{width:100, height: 100}}
        resizeMode="contain"
        source={require('../../assets/amazon-logo.png')}
      />
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#9ac1af',
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  titleBold: {
    fontFamily: 'Raleway-Bold',
    fontSize:18,
  },
  titleText: {
    fontFamily: 'Raleway-Regular',
    fontSize:12,
  }

})
