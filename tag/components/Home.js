import React,{useState} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import logo from '../assets/logo.png';
import express from '../assets/expression.png';
import avatar from '../assets/avatar.png';

import leaderboard1 from '../assets/leaderboard1.png';
import leaderboard2 from '../assets/leaderboard2.png';
import leaderboard3 from '../assets/leaderboard3.png';

import * as Font from 'expo-font';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

export default function Home({navigation}) {

  return (
    <ScrollView style={styles.container}>
        <View style={styles.circleBg}></View>

        <Image source={logo} style={styles.logo} />

        <Image source={avatar} style={styles.avatar} />
        
        <Text style={styles.header}>Hey hey!</Text>
        <Text style={styles.body}>20 days and 4hrs left in the game</Text>

{/* pink circle */}
        <View style={styles.where}>
            <Text style={styles.where1}>tag is in</Text>
            <Text style={styles.where2}>England</Text>
        </View>

{/* yellow circle */}
        <TouchableOpacity style={styles.join} onPress={()=> navigation.navigate("Join")}>
            <Text style={styles.join1}>join</Text>
            <Text style={styles.join2}>next game</Text>
        </TouchableOpacity>

{/* orange shape */}
        <View style={styles.block}>
            <Text style={styles.block1}>tag blocker</Text>
            <Text style={styles.block2}>12:10:45</Text>
        </View>

        <Image source={express} style={styles.express} />

        <Text style={styles.section}>Current game</Text>
        <View style={styles.leaderboardWrapper}>
            <View>
                   <Image source={leaderboard1} style={styles.leaderboard1} />
                   <Text style={styles.name}>Jeanie</Text>
                   <Text style={styles.pts}>41pts</Text>
            </View>
     <View>
           <Image source={leaderboard2} style={styles.leaderboard2} />
           <Text style={styles.name}>DavidJ</Text>
            <Text style={styles.pts}>21pts</Text>
     </View>
      
      <View>
             <Image source={leaderboard3} style={styles.leaderboard3} />
             <Text style={styles.name}>YoYo</Text>
                   <Text style={styles.pts}>20pts</Text>
      </View>
     
        </View>

        <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Leaderboard")}><Text style={styles.btnTxt}>See leaderboard</Text></TouchableOpacity>

        <Text style={styles.section}>Your game stats</Text>

        {/* stats bubbles */}
        {/* pink circle */}
        <View style={styles.yourPoints}>
            <Text style={styles.yourPoints1}>21</Text>
            <Text style={styles.yourPoints2}>your points</Text>
        </View>

                {/* orange circle */}
        <View style={styles.yourTag}>
            <Text style={styles.yourTag1}>3</Text>
            <Text style={styles.yourTag2}>tags</Text>
        </View>

        {/* yellow circle */}
        <View style={styles.yourMins}>
            <Text style={styles.yourMins1}>25 mins</Text>
            <Text style={styles.yourMins2}>avg time to pass tag</Text>
        </View>

        <View style={styles.lastBig}></View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    width:'100%',
    padding:40,

  },circleBg:{
      backgroundColor:"#FB5E1B",
      width:683,
      height:683,
      borderRadius:683,
      marginTop:-290,
      marginLeft:-280,
      position:'absolute'
  },
  logo: {
    width: 90,
    height: 41,
    marginTop: 20,
  },    avatar: {
    width: 55,
    height: 55,
    marginTop: -50,
    marginLeft:250
  },  
      header:{
    color:'#FFFBEB',
    fontFamily:'semibold',
    fontSize:35,
    marginTop:50,
    marginHorizontal:20
},body:{
    fontSize:20,
    color:'#FFFBEB',
    fontFamily:'medium',
    marginTop:10,
    marginHorizontal:20
},where:{
    backgroundColor:"#FFA6BA",
    width:170,
    height:170,
    borderRadius:170,
    marginLeft:140,
    marginTop:10,
    alignItems: 'center',
    justifyContent:'center'
},where1:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'center'
},where2:{
    fontSize:20,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'center',
    marginTop:7
},join:{
    backgroundColor:"#FECE34",
    width:145,
    height:145,
    borderRadius:145,
    marginLeft:10,
    marginTop:-30,
    alignItems: 'center',
    justifyContent:'center',
    padding:20
},join1:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'center'
},join2:{
    fontSize:20,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'center',
    marginTop:3
},block:{
    backgroundColor:"#FB5E1B",
    width:250,
    height:120,
    borderRadius:70,
    marginLeft:170,
    marginTop:-95,
    alignItems: 'center',
    justifyContent:'center',
    padding:40
},block1:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'left'
},block2:{
    fontSize:20,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'left',
    marginTop:3
},  express: {
    width: 33,
    height: 30,
    marginTop: 500,
    marginLeft:150,
    position:'absolute'
  },section:{
   color:'#000000',   
   fontSize:18,
   fontFamily:'semiBold',
   marginHorizontal:20,
   marginTop:30,
   marginBottom:10
  },leaderboardWrapper:{
    width:"100%",
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding:20, 

  },leaderboard1:{
      width:75,
      height:75,
      marginTop:20,
  },
leaderboard2:{
    width:102,
    height:106,
    marginHorizontal:50,marginTop:-40
},
leaderboard3:{
    width:75,
    height:75,
    marginTop:20, 
},name:{
    fontSize:15,
    fontFamily:'semibold',
    textAlign:'center',
    marginTop:10
},pts:{
    fontSize:15,
    fontFamily:'medium',
    textAlign:'center',
    marginTop:2
},btn:{
    width:'100%',
    padding:20,
    backgroundColor:'#FFA6BA',
    borderRadius:100,
    marginTop:10,
    marginBottom:20
},btnTxt:{
    color:'#FFFBEB',
    fontFamily:'semibold',
    textAlign:'center',
    fontSize:18
},yourPoints:{
    backgroundColor:"#FFA6BA",
    width:180,
    height:180,
    borderRadius:190,
    marginLeft:-70,
    marginTop:70,
    alignItems: 'center',
    justifyContent:'center',
    padding:60
},yourPoints2:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'center'
},yourPoints1:{
    fontSize:40,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'center',
    marginTop:7
},yourTag:{
    backgroundColor:"#FB5E1B",
    width:150,
    height:150,
    borderRadius:150,
    marginLeft:110,
    marginTop:-250,
    alignItems: 'center',
    justifyContent:'center',
},yourTag2:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'center'
},yourTag1:{
    fontSize:40,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'center',
    marginTop:7
},yourMins:{
    backgroundColor:"#FECE34",
    width:250,
    height:250,
    borderRadius:250,
    marginLeft:90,
    marginTop:20,
    alignItems: 'center',
    justifyContent:'center',
    padding:40,
    marginBottom:80
},yourMins2:{
    fontSize:17,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginHorizontal:10,
textAlign:'center'
},yourMins1:{
    fontSize:40,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'semibold',
    marginHorizontal:10,
    textAlign:'center',
    marginTop:7
},lastBig:{
    backgroundColor:"#FB5E1B",
    width:683,
    height:683,
    borderRadius:683,
    bottom:-500,
    marginLeft:-280,
    position:'absolute',
    zIndex:-1
}
});