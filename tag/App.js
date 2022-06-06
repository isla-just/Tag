import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import {db} from "./Firebase";
import { doc, setDoc, collection, query, orderBy, startAt, endAt, getDoc } from "firebase/firestore";

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
import PowerupDetail from './components/PowerupDetail';
import Leaderboard from './components/Leaderboard';
import Tagged from './components/Tagged';

export default function App() {

  //defining the stack
  const Stack= createNativeStackNavigator();

  //get all the user documents
const getAUser= async ()=>{

  id=auth.currentUser.uid;

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    setUserData(docSnap.data());
    console.log(userData);

  } else {
    console.log("No such document!");
  }
}


  const [loggedIn, setLoggedIn] = useState(false);
  const [tagged, setTagged] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(()=>{

    getAUser();
//listening to if our current user is logged in
if(userData.tag=true){
  console.log('person has been tagged');
  setTagged(true);
}else{
  console.log('not tagged')
  setTagged(false);
}

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
    // <PowerupDetail/>
    // <Tag/>
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='Welcome'>
      {loggedIn ?(
        <>
        

          {tagged ?(
            <>
             <Stack.Screen name="Tag" component ={Tag} options={{headerShown:false}}/>
             <Stack.Screen name="Tagged" component ={Tagged} options={{headerShown:false}}/>
             </>
            //  setTagged(false)
          ):(
            <>
            <Stack.Screen name="Home" component ={Home} options={{headerShown:false}}/>
          <Stack.Screen name="Join" component ={Join} options={{headerShown:false}}/>
          <Stack.Screen name="Waiting" component ={Waiting} options={{headerShown:false}}/>
          <Stack.Screen name="Powerup" component ={Powerup} options={{headerShown:false}}/>
          <Stack.Screen name="PowerupDetail" component ={PowerupDetail} options={{headerShown:false}}/>
          <Stack.Screen name="Leaderboard" component ={Leaderboard} options={{headerShown:false}}/>
          <Stack.Screen name="Permissions" component ={Permissions} options={{headerShown:false}}/>
          </>
          )}
         
        </>

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
