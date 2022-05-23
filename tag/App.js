import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

//firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';

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


const [loggedIn, setLoggedIn] = useState(false);
useEffect(()=>{
//listening to if our current user is logged in
const unsubscribe=onAuthStateChanged(auth, (user)=>{
if(user){
  //logged in
  setLoggedIn(true);
}else{
  //logged out
  setLoggedIn(false);
}
})
return unsubscribe;
},[]);

  //to do: make pages not accessible if not logged in

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Welcome'>
      {loggedIn ?(
      
        <Stack.Screen name="Permissions" component ={Permissions} options={{headerShown:false}}/>
      ):(
        <>
        <Stack.Screen name="Welcome" component ={Welcome} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component ={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component ={SignUp} options={{headerShown:false}}/>
        </>
      )}
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
