import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';

import MainContainer from './navigation/MainContainer';
import LoginScreen from './navigation/screens/LoginScreen';
import CameraScreen from './navigation/screens/CameraScreen';
import SignoutScreen from './navigation/screens/SignoutScreen';


const Stack = createNativeStackNavigator();

const getFonts = () => Font.loadAsync({
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf')
});


export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="MainContainer"  component={MainContainer} />
          <Stack.Screen options={{ headerShown: false }} name="Signout" component={SignoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
   );
  } else {
     return (
       <AppLoading
         startAsync={getFonts}
         onFinish={()=> setFontsLoaded(true)}
         onError={console.warn}
       />
     );
   }
}


// function App() {
//   return (
//     <MainContainer/>
//   );
// }

// export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
