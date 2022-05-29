import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, navigator } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';

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
import Home from './components/Home';
import Tag from './components/Tag';
import Powerup from './components/Powerup';
import Join from './components/Join';
import Waiting from './components/Waiting';
import Leaderboard from './components/Leaderboard';


export default function App({sendLocation}) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
    sendLocation=text;
  } else if (location) {
    text = JSON.stringify(location);
    sendLocation=text;
  }
  
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


  //to do: make pages not accessible if not logged in - fix this

  return (

    // <Powerup/>
    // <Tag/>
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Welcome'>
      {/* {loggedIn ?( */}
        <>
              <Stack.Screen name="Permissions" component ={Permissions} options={{headerShown:false}}/>
        </>

      {/* ):( */}
        <>
           <Stack.Screen name="Welcome" component ={Welcome} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component ={Login} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component ={SignUp} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component ={Home} options={{headerShown:false}}/>
          <Stack.Screen name="Join" component ={Join} options={{headerShown:false}}/>
          <Stack.Screen name="Waiting" component ={Waiting} options={{headerShown:false}}/>
          <Stack.Screen name="Leaderboard" component ={Leaderboard} options={{headerShown:false}}/>
        </>
      {/* )} */}
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
