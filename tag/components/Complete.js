import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert,KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import back from '../assets/back.png';
import avatar from '../assets/avatar.png';
import { getActiveCompetition, setPowerup } from '../services/Database';
import { getAllParticipants } from '../services/Database';
import { getTopThree } from '../services/Database';

import overlay from '../assets/special.png';
import Avatar from 'react-native-boring-avatars';

import * as Font from 'expo-font';

Font.loadAsync({
    // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
    // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
    'semiBold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
  });

export default function Complete({route, navigation}) {

  const userData=route.params;
  const avatar=userData.avatar;
  const points=userData.points;
  const username=userData.username;
  const powerup=userData.powerup;
  const [comp, setComp]=useState([]);
  const [users, setPeople]=useState([]);
  const [compID, setCompID]=useState("");
  const [place, setPlace]=useState(0);
  const [special, setSpecial]=useState(false);

  //getting the active competition id
  const compDetails = async ()=>{
    const activeComp = await getActiveCompetition();
    setComp(activeComp[0]);
    setCompID(activeComp[0].uid);
}

  //getting the active competition id
  const powerupDetails = async ()=>{
    await setPowerup(userData.uid, {powerup:"special"});
}

  useEffect(() => {

    compDetails();

        //getting the active competition id
        const getParticipants = async ()=>{
          const participants = await getAllParticipants(comp.uid);

          for(i=0;i<participants.length;i++){
            if(participants[i].uid==userData.uid){
              setPlace(i+1);
            }
          }

          setPeople(participants);

      }

      getParticipants();

  },[compID])

  useEffect(() => {
    const checkPowerup = async ()=>{
      console.log(place);
      if(place==1){
        powerupDetails();
        setSpecial(true);
      }else{
        console.log('sorry you dont win')
      }
    }

    checkPowerup();
  },[place])
  
  return (

        <ScrollView style={styles.content}>
            <View style={styles.orange}></View>

     { special ?  
    (
     <Image     
     style={styles.overlay}
     source={overlay}/>
    ) : (
      <View></View>
    )}

            <View   style={styles.yourAvatar}>
      <Avatar
        size={100}
        name={avatar}
        variant="beam"
        colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
        />
      </View>
     
            <Text style={styles.header}>The game is complete!</Text>
            <Text style={styles.sub}>You placed in #{place} position</Text>
            <Text style={styles.sub2}>This means the next competition has started. Get ready!</Text>

            <TouchableOpacity style={styles.btn2}  onPress={()=> navigation.navigate("Home")}><Text style={styles.btnTxt}>Back home</Text></TouchableOpacity>

{/* you */}
<View style={styles.you}>

<View   style={styles.avatar}>
<Avatar
size={43}
name={avatar}
variant="beam"
colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
/>
</View>

<Text style={styles.place}>{place}</Text>
<Text style={styles.username}>{username}</Text>
<Text style={styles.score}>{points}pts</Text>
</View>

{/* everyone else */}

{users.map((user, index) => (

<View key={index} style={styles.else}>

        <View   style={styles.avatar}>
      <Avatar
        size={43}
        name={user.avatar}
        variant="beam"
        colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
        />
      </View>

        <Text style={styles.place}>{index+1}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.score}>{user.points} pts</Text>
        </View>
))}

<View style={styles.spacing}></View>

        </ScrollView>
        
     
  );
}

const styles = StyleSheet.create({
 
content:{
        paddingLeft:40,
        paddingRight:40,
        paddingTop:40,
        paddingBottom:400,
        flex:1,
        backgroundColor: '#FFFBEB'
      },
    header:{
        color:'#FFFBEB',
        fontFamily:'semiBold',
        fontSize:30,
        marginTop:20,
        width:'100%',
        textAlign:'center'
    },
    sub:{
        color:'#fff',
        fontFamily:'medium',
        fontSize:20,
        marginTop:20,
        width:'100%',
        textAlign:'center'
    },
    sub2:{
        color:'#fff',
        fontFamily:'medium',
        fontSize:15,
        marginTop:10,
        width:'100%',
        textAlign:'center'
    },
    orange:{
        width:600,
        height:600,
        position:'absolute',
        marginTop:-100,
        backgroundColor: '#FB5E1B',
        borderRadius:600,
        marginLeft:-150
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
      marginTop:10,
      color:"#fff"
  },pts:{
      fontSize:15,
      fontFamily:'medium',
      textAlign:'center',
      marginTop:2,
      color:"#fff"
  }, you:{
    backgroundColor:"#F583B4",
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
    borderWidth:5,
    borderColor:"#fff",
    borderRadius:100
  },overlay:{
    height:150,
    width:150,
    borderRadius:100,
    position:'absolute',
    marginTop:15,
    marginLeft:72,
    zIndex:2,
  },place:{
    width:35,
    color:'#FFFBEB',
    fontFamily:'semiBold',
    fontSize:25,
    marginLeft:15
  }, username:{
    width:100,
    color:'#FFFBEB',
    fontFamily:'medium',
    fontSize:15,
  }, score:{
    width:60,
    color:'#FFFBEB',
    fontFamily:'medium',
    fontSize:15,
  }, else:{
    backgroundColor:"#FFA6BA",
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
  },yourAvatar:{
    width:"100%",
    alignItems: 'center',
    marginTop:40
  },btn2:{
    width:'100%',
    padding:20,
    backgroundColor:'#FECE34',
    borderRadius:100,
    marginTop:20,
    marginBottom:20
},btnTxt:{
    color:'#FFFBEB',
    fontFamily:'semibold',
    textAlign:'center',
    fontSize:18
},spacing:{
  width:'100%',
  height:100
}
});