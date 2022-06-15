import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert,KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import back from '../assets/back.png';
import avatar from '../assets/avatar.png';
import { getActiveCompetition, getCollectionListener } from '../services/Database';
import { getAllParticipants } from '../services/Database';
import { getTopThree } from '../services/Database';
import { useFocusEffect } from '@react-navigation/native'
import { doc, onSnapshot } from 'firebase/firestore'

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
  const [comp, setComp]=useState([]);
  const [users, setPeople]=useState([]);
  const [compID, setCompID]=useState("");


  // /workaround data storage
  const [firstAvatar, setFirstAvatar]=useState("");
  const [firstUname, setFirstUname]=useState("");
  const [firstPts, setFirstPts]=useState(0);

  const [secondAvatar, setSecondAvatar]=useState("");
  const [secondUname, setSecondUname]=useState("");
  const [secondPts, setSecondPts]=useState(0);

  const [thirdAvatar, setThirdAvatar]=useState("");
  const [thirdUname, setThirdUname]=useState("");
  const [thirdPts, setThirdPts]=useState(0);

  const [place, setPlace]=useState(0);

  //getting the active competition id
  const compDetails = async ()=>{
    const activeComp = await getActiveCompetition();
    setComp(activeComp[0]);
    setCompID(activeComp[0].uid);
  }

  useFocusEffect(
    React.useCallback(()=>{

    compDetails();

      const collectionRef=getCollectionListener(comp.uid);

      const unsub = onSnapshot(collectionRef, (snapshot)=>{
        let participants=[];
        snapshot.forEach((doc)=>{

            let parData={...doc.data(), uid:doc.id}

            // console.log(doc.data().features)
            participants.push(parData);
        })

        for(i=0;i<participants.length;i++){
          if(participants[i].uid==userData.uid){
            setPlace(i+1);
          }else{
            console.log("not You")
          }
        }

        setPeople(participants);

        // setting places workaround
        setFirstPts(participants[0].points)
        setFirstUname(participants[0].username)
        setFirstAvatar(participants[0].avatar)

        setSecondPts(participants[1].points)
        setSecondUname(participants[1].username)
        setSecondAvatar(participants[1].avatar)

        setThirdPts(participants[2].points)
        setThirdUname(participants[2].username)
        setThirdAvatar(participants[2].avatar)
    })

    return()=>{
        //do something here when the sacreen is focussed
        unsub();
    }
    },[comp.uid])
    )

  
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

            <View   style={styles.leaderboard1}>
            <Avatar
              size={75}
              name={secondAvatar}
              variant="beam"
              colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
              />
            </View>

                   <Text style={styles.name}>{secondUname}</Text>
                   <Text style={styles.pts}>{secondPts} pts</Text>
            </View>
     <View>

          <View   style={styles.leaderboard2}>
            <Avatar
              size={102}
              name={firstAvatar}
              variant="beam"
              colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
              />
            </View>
           <Text style={styles.name}>{firstUname}</Text>
            <Text style={styles.pts}>{firstPts} pts</Text>
     </View>
      
      <View>
      <View   style={styles.leaderboard3}>
            <Avatar
              size={75}
              name={thirdAvatar}
              variant="beam"
              colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
              />
            </View>
             <Text style={styles.name}>{thirdUname}</Text>
                   <Text style={styles.pts}>{thirdPts} pts</Text>
      </View>
     
        </View>

{/* //player list */}

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

        <Text style={styles.place}>{place+1}</Text>
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
  },spacing:{
    width:'100%',
    height:100
  }
});