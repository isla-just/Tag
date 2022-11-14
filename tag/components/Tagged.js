import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import arrow from '../assets/arrow.png';
import leaderboard1 from '../assets/leaderboard1.png';
import { GeoPoint} from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from "../Firebase";
import { doc, setDoc, collection, query, orderBy, startAt, endAt, getDocs, where } from "firebase/firestore";
import Avatar from 'react-native-boring-avatars';

import * as Font from 'expo-font';
import { updateTag } from '../services/Database';

import { settag } from '../services/Database';
import { auth } from '../Firebase';


import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

export default function Tagged({route, navigation}) {

  const params=route.params;

  const saveTagged=async ()=>{

    //using the use states to set the new data
    await updateTag(auth.currentUser.uid,{tag:false});
    await settag(params.uid, {tag:true, tagCount:+1, points:+1});
    // setNewTag();

    console.log("status has changed");

    navigation.navigate({
        name:'Home',
    });
}

// set our profile data - updaye
// const setNewTag = async()=>{

//   const q= query (collection(db, 'users'), where('email','==',params.email));
//   await setDoc(q, {tag:true});
// }

  return (
    <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
  <View   style={styles.imgcontainer}>
      <Avatar
        size={100}
        name={params.avatar}
        variant="beam"
        colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
        />
</View>
      
          <Text style={styles.header}>{params.username} has been tagged</Text>
          <Text style={styles.sub}>{params.points} points</Text>

{/* this button will call our database function */}
          <TouchableOpacity style={styles.btn} onPress={saveTagged}>
            <Text style={styles.btntxt}>Back Home</Text> 
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#FB5E1B',
    width:'100%',
    padding:40,
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 41,
    marginTop: 20,
    marginLeft:-200,
  },

imgcontainer:{
  justifyContent:'center',
  alignItems: 'center',
  marginTop:80,
  height:100
  
},avatar:{
  width:100,
  height:100,
},
  sub:{
      color:'#fff',
      fontFamily:'medium',
      fontSize:20,
      marginTop:20,
      marginHorizontal:20,
      textAlign:'center'
  },
  header:{
      color:'#fff',
      fontFamily:'semibold',
      fontSize:30,
      marginTop:30,
      marginHorizontal:20,
      textAlign:'center'
 },btn:{
    width:'100%',
    padding:20,
    backgroundColor:'#FFFBEB',
borderRadius: 60,
    marginTop:100,
    marginHorizontal:20,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position:'absolute',
    bottom:50
},btntxt:{
  color:'#FB5E1B',
  fontFamily:'semiBold',
  textAlign:'left',
  fontSize:18,
},  arrow: {
  width: 17,
  height: 15,
}
});