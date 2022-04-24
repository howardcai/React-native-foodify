import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ScanScreen from './screens/ScanScreen';
import LoginScreen from './screens/LoginScreen';
import SignoutScreen from './screens/SignoutScreen';

//Screen names
const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";
const profileName = "Profile";
const scanName = "Scan";
const loginName = "Login";
const signoutName = "Logout";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          "tabBarActiveTintColor": "tomato",
          "tabBarInactiveTintColor": "grey",
          "tabBarLabelStyle": {
              "paddingBottom": 10,
              "fontSize": 10
           },
           "tabBarStyle": [
               {
               "display": "flex"
               },
             null
           ],

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (rn === scanName) {
              iconName = focused ? 'scan' : 'ios-scan-circle';
	    } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person';
	    } else if (rn === signoutName) {
              iconName = focused ? 'log-out' : 'log-out-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}

        >

        <Tab.Screen options={{ headerShown: false }} name={homeName} component={HomeScreen} />
        <Tab.Screen options={{ headerShown: false }} name={scanName} component={ScanScreen} />
        <Tab.Screen options={{ headerShown: false }} name={profileName} component={ProfileScreen} />
        <Tab.Screen options={{ headerShown: false }} name={signoutName} component={SignoutScreen} />

      </Tab.Navigator>
  );
}

export default MainContainer;
