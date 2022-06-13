import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import logo from '../assets/logo.png';
import express from '../assets/expression.png';
// import avatar from '../assets/avatar.png';

import leaderboard1 from '../assets/leaderboard1.png';
import leaderboard2 from '../assets/leaderboard2.png';
import leaderboard3 from '../assets/leaderboard3.png';
import { useFocusEffect } from '@react-navigation/native'
import {onSnapshot } from 'firebase/firestore'

import { getAllCompetitions } from '../services/Database';
import { getActiveCompetition } from '../services/Database';
import { getAllParticipants } from '../services/Database';
import { newCompetition } from '../services/Database';
import { getTagged } from '../services/Database';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { doc, setDoc, collection, query, orderBy, startAt, endAt, getDocs, where, getDoc } from "firebase/firestore";
import {db} from "../Firebase";

//formatting dates
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

import * as Font from 'expo-font';
import Avatar from 'react-native-boring-avatars';

Font.loadAsync({
  // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
  // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
  'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
  'semibold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
});

export default function Home({navigation}) {

    const [competitions, setCompetitions]=useState([]);
    const [userData, setUserData]=useState([]);
    const [yourRegion, setYourRegion]=useState([]);
    const [tagRegion, setTagRegion]=useState([]);
    const id=auth.currentUser.uid;
    const [isLoading, setLoading]=useState(true);
    const [active, setActive]=useState(0);

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

  const [comp, setComp]=useState([]);
  const [endDate, setEndDate]=useState(Date);
  const [totalDuration, setTotalDuration] = useState(0);

  //getting the active competition id
  const compDetails = async ()=>{
    const activeComp = await getActiveCompetition();
    // console.log(activeComp.uid)

    var end=activeComp.endDate;
    setEndDate(end.toDate());

    setComp(activeComp);
}

useEffect(() => {

  compDetails();

      //getting the active competition id
      const getParticipants = async ()=>{
        const participants = await getAllParticipants(comp.uid);

        setFirstPts(participants[0].points)
        setFirstUname(participants[0].username)
        setFirstAvatar(participants[0].avatar)

        setSecondPts(participants[1].points)
        setSecondUname(participants[1].username)
        setSecondAvatar(participants[1].avatar)

        setThirdPts(participants[2].points)
        setThirdUname(participants[2].username)
        setThirdAvatar(participants[2].avatar)
        // setFirstPts(participants.points);

        // setPeople(participants);
    }

    getParticipants();

},[comp.uid])

useEffect(() => {
    const getCountdown = async ()=>{
        //setting the countdown 
  
      //   console.log("end date"+endDate);
  
          var thisdate = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
          var expiryDate = moment(endDate).utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
  
          var diffr = moment.duration(moment(expiryDate).diff(moment(thisdate)));
  
          var hours = parseInt(diffr.asHours());
          var minutes = parseInt(diffr.minutes());
          var seconds = parseInt(diffr.seconds());
          var d = hours * 60 * 60 + minutes * 60 + seconds;
          //converting in seconds
          setTotalDuration(d);
    };

    getCountdown();
},[endDate])

    // const [tagged, setTagged]=useState(false);

    const onSignOutPress = () =>{
        signOut(auth).then(() =>{
          //Success
        })
        .catch((error) =>{
            Alert.alert(error.message);
        })
      }

//get all the user documents
const getAUser= async ()=>{

    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setUserData(docSnap.data());

    //   setLat(docSnap.data().location.lat);
    //   setLng(docSnap.data().location.lng);
    } else {
      console.log("No such document!");
    }
}

const saveCompetition = async()=>{

    // // setting the start date
    // var startDate = new Date(); // Now
    // startDate.setDate(startDate.getDate() + 30); // Set now + 30 days as the new date
    // // console.log("start"+startDate);

    //     // setting the end date
    //     var endDate = new Date(); // Now
    //     endDate.setDate(endDate.getDate() + 60); // Set now + 30 days as the new date
    //     // console.log("end"+endDate);


    // const data = {
    //     endDate:endDate,
    //     startDate:startDate,
    //     prize:"technology",
    //     status:"inactive",
    // }


    //  await newCompetition(data);
}

    useEffect(()=>{
        // fetchAllCompetitions();
        getAUser();

        const getRegion = async () => {
         
            try {
           //geonames api to find the region of your location
            const response = await fetch("http://api.geonames.org/countryCodeJSON?lat="+userData.location.lat+"&lng="+userData.location.lng+"&username=isla.just");
            const json = await response.json();
            // console.log(json);
            setTagRegion(json.countryName);
          } catch (error) {
            console.error(error);
          }  finally {
           setLoading(false);
         }
       
        }

        getRegion();
  

      },[userData.uid]);

      useEffect(() => {
        getTagRegion();

        const getTaggedRegion = async () => {
         
            try {
           //geonames api to find the region of your location
            const response = await fetch("http://api.geonames.org/countryCodeJSON?lat="+active.location.lat+"&lng="+active.location.lng+"&username=isla.just");
            const json = await response.json();
            // console.log(json);
            setYourRegion(json.countryName);
          } catch (error) {
            console.error(error);
          }  finally {
           setLoading(false);
         }
       
        }

        getTaggedRegion();
      },[active.uid])

      const getTagRegion = async()=>{
        const activeComp = await getTagged();
        // console.log(activeComp);
        setActive(activeComp);
      }

      useFocusEffect(
        React.useCallback(()=>{

            const collectionRef=query(collection(db, 'users'), where("uid","==", id));

            const unsub = onSnapshot(collectionRef, (snapshot)=>{
                let users=[];
                snapshot.forEach((doc)=>{

                    let user={...doc.data(), id:doc.id}

                    users.push(user);
                    // console.log(users);
                    

                    if(user.tag==true){
                        navigation.navigate("Tag");
                      }
                });

            })

            return()=>{
                //do something here when the sacreen is focussed
                unsub();
            }
        },[])
    )

      
  return (

    <ScrollView style={styles.container}>
        <View style={styles.circleBg}></View>

        <Image source={logo} style={styles.logo} />

<View   style={styles.avatar2}>
      <Avatar
        size={55}
        name={userData.avatar}
        variant="beam"
        colors={['#FFD346', '#6C97FB', '#F583B4', '#FECE34', '#FFA6BA']}
        />
</View>
      
        
        <Text style={styles.header}>Hey hey!</Text>
        <Text style={styles.body}>Let's play a huge game of tag!</Text>

{/* pink circle */}
        <View style={styles.where}>
            <Text style={styles.where1}>tag is in</Text>
            <Text style={styles.where2}>{tagRegion}</Text>
        </View>

{/* yellow circle */}
        <TouchableOpacity style={styles.join} onPress={()=> navigation.navigate("Join", userData)}>
            <Text style={styles.join1}>join</Text>
            <Text style={styles.join2}>next game</Text>
        </TouchableOpacity>

{/* orange shape */}
        <View style={styles.block}>
            <Text style={styles.block1}>Time left</Text>
            <CountDown
            until={totalDuration}
            //duration of countdown in seconds
            timetoShow={('H', 'M', 'S')}
            //To Do: show completed screen here
            onFinish={() => alert('The competition is over')}
            //on Finish call
            onPress={() => alert('hello')}
            //on Press call
            size={15}
            digitStyle={{backgroundColor: '#FB5E1B'}}
            digitTxtStyle={{color: '#FFFFFF'}}
            timeLabelStyle={{color: '#fff', fontWeight: 'bold'}}
            />
        </View>

                <TouchableOpacity style={styles.btn2} onPress={saveCompetition}><Text style={styles.btnTxt}>Generate new</Text></TouchableOpacity>

        <Image source={express} style={styles.express} />

        <Text style={styles.section}>Current game</Text>
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

        <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Leaderboard", userData)}><Text style={styles.btnTxt}>See leaderboard</Text></TouchableOpacity>

        <Text style={styles.section}>Your game stats</Text>

        {/* stats bubbles */}
        {/* pink circle */}
        <View style={styles.yourPoints}>
            <Text style={styles.yourPoints1}>{userData.points}</Text>
            <Text style={styles.yourPoints2}>your points</Text>
        </View>

                {/* orange circle */}
        <View style={styles.yourTag}>
            <Text style={styles.yourTag1}>{userData.tagCount}</Text>
            <Text style={styles.yourTag2}>tags</Text>
        </View>

        {/* yellow circle */}
        <View style={styles.yourMins}>
     
            <Text style={styles.yourMins2}>your region</Text>

       
            <Text style={styles.yourMins1}>{yourRegion}</Text>
          
        </View>

        <TouchableOpacity style={styles.btn2} onPress={onSignOutPress}><Text style={styles.btnTxt}>Log out</Text></TouchableOpacity>

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
  },    avatar2: {
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
    marginLeft:-10,
    marginTop:-70,
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
    width:260,
    height:120,
    borderRadius:70,
    marginLeft:140,
    marginTop:-55,
    alignItems: 'center',
    justifyContent:'center',
    paddingTop:40,
    paddingBottom:40,
    paddingRight:60
},block1:{
    fontSize:15,
    width:'100%',
    color:'#FFFBEB',
    fontFamily:'medium',
    marginLeft:60,
    marginTop:-5,
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
    marginLeft:120,
    position:'absolute'
  },section:{
   color:'#000000',   
   fontSize:18,
   fontFamily:'semiBold',
   marginHorizontal:20,
   marginTop:30,
   marginBottom:25
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
    bottom:-350,
    marginLeft:-280,
    position:'absolute',
    zIndex:-1
},btn2:{
    width:'100%',
    padding:20,
    backgroundColor:'#FFA6BA',
    borderRadius:100,
    marginTop:10,
    marginBottom:80

}
});


// onSnapshot(
//     query(scorecardCollectionRef, orderBy("finalscore", "asc")),
//     (snapshot) => {
//       let scores = [];

//       snapshot.forEach((doc) => {
//         scores.push({
//           ...allusers[doc.data().uid],
//           ...doc.data(),
//         });
//       });

//       ///want to use scores[0].uid
//       setscoreCards(scores);


//     }
//   );