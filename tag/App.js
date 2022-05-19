import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

//Components
import Welcome from './components/Welcome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Permissions from './components/Permissions';


export default function App() {

  //defining the stack
  const Stack= createNativeStackNavigator();

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component ={Welcome} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component ={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component ={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="Permissions" component ={Permissions} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
