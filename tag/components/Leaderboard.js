import React,{useState} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert,KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import back from '../assets/back.png';
import avatar from '../assets/avatar.png';

import leaderboard1 from '../assets/leaderboard1.png';
import leaderboard2 from '../assets/leaderboard2.png';
import leaderboard3 from '../assets/leaderboard3.png';
import Avatar from 'react-native-boring-avatars';

import * as Font from 'expo-font';

Font.loadAsync({
    // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
    // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
    'semiBold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
  });

export default function Leaderboard({route, navigation}) {

  const userData=route.params;
  const avatar=userData.avatar;
  const points=userData.points;
  const username=userData.username;

  return (

        <ScrollView style={styles.content}>
            <View style={styles.orange}></View>
            <TouchableOpacity style={styles.target} onPress={()=> navigation.navigate("Home")}>
                     <Image source={back} style={styles.back} />
            </TouchableOpacity>
     
            <Text style={styles.header}>Leaderboard</Text>

            <ScrollView horizontal={true} style={styles.scrollable}>
              <Text style={styles.active}>Overview</Text>
              {/* <Text style={styles.inactive}>Tag time</Text>
              <Text style={styles.inactive}>Least tags</Text>
              <Text style={styles.inactive}>Most tags</Text> */}
            </ScrollView>

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

{/* //player list */}

{/* you */}
        <View style={styles.you}>

        <View   style={styles.avatar}>
      <Avatar
        size={52}
        name={avatar}
        variant="beam"
        colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
        />
      </View>

        <Text style={styles.place}>21st</Text>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.score}>{points}pts</Text>
        </View>

{/* everyone else */}

<View style={styles.else}>
        <Image source={leaderboard2} style={styles.avatar} />
        <Text style={styles.place}>1st</Text>
        <Text style={styles.username}>DavidJ</Text>
        <Text style={styles.score}>21pts</Text>
        </View>


<View style={styles.else}>
        <Image source={leaderboard1} style={styles.avatar} />
        <Text style={styles.place}>2nd</Text>
        <Text style={styles.username}>Jeanie</Text>
        <Text style={styles.score}>21pts</Text>
        </View>

        <View style={styles.else}>
        <Image source={leaderboard3} style={styles.avatar} />
        <Text style={styles.place}>3rd</Text>
        <Text style={styles.username}>YoYo</Text>
        <Text style={styles.score}>21pts</Text>
        </View>

        <View style={styles.else}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.place}>3rd</Text>
        <Text style={styles.username}>YoYo</Text>
        <Text style={styles.score}>21pts</Text>
        </View>

        <View style={styles.else}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.place}>3rd</Text>
        <Text style={styles.username}>YoYo</Text>
        <Text style={styles.score}>21pts</Text>
        </View>

        <View style={styles.padding}></View>

        </ScrollView>
        
     
  );
}

const styles = StyleSheet.create({
 
content:{

        padding:40,
        flex:1,
        backgroundColor: '#FFFBEB'
      },
      back: {
        width: 20,
        height: 17,
        marginTop: 40,
      },
    header:{
        color:'#FFFBEB',
        fontFamily:'semiBold',
        fontSize:30,
        marginTop:10,
        width:'80%',
        marginLeft:50
    },
    sub:{
        color:'#000',
        fontFamily:'medium',
        fontSize:15,
        marginTop:20,
        marginHorizontal:40
    },
    orange:{
        width:550,
        height:550,
        position:'absolute',
        marginTop:-130,
        backgroundColor: '#FB5E1B',
        borderRadius:550,
        marginLeft:-125
    },scrollable:{
      flex: 5,
      maxHeight:70,
      marginTop:20,
      width:"110%"
    },
    active:{
      color:'#FFFBEB',
      fontFamily:'semibold',
      fontSize:18,
      marginTop:20,
      textDecorationColor:"#FECE34",
      textDecorationLine:"underline",
      marginRight:20
    },inactive:{
      color:'#FFFBEB',
      fontFamily:'medium',
      fontSize:18,
      marginTop:20,
      marginRight:20
    },leaderboardWrapper:{
      width:"100%",
      flexDirection:'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding:20,
      marginTop:20 
  
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
  }, you:{
    backgroundColor:"#FFA6BA",
    flex:1,
    maxHeight:75,
    borderRadius:75,
    marginTop:20,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding:10
  },avatar:{
    height:52,
    width:52,
  },place:{
    width:60,
    color:'#FFFBEB',
    fontFamily:'semiBold',
    fontSize:25,
    marginLeft:15
  }, username:{
    width:80,
    color:'#FFFBEB',
    fontFamily:'medium',
    fontSize:15,
  }, score:{
    width:60,
    color:'#FFFBEB',
    fontFamily:'medium',
    fontSize:15,
  }, else:{
    backgroundColor:"#FFD0D2",
    flex:1,
    maxHeight:75,
    borderRadius:75,
    marginTop:10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding:10
  },padding:{
    backgroundColor:"#FFD0D2",
    flex:1,
    height:75,
    borderRadius:75,
    marginTop:10,
    padding:10,
    opacity:0
  },target:{
    width:20,
    height:20,
    backgroundColor: '#FB5E1B'
  }
});