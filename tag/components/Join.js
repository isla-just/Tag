import React,{useState, useEffect} from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, TextInput, Alert,KeyboardAvoidingView, Keyboard } from 'react-native';
import logo from '../assets/logo2.png';
import { getNextCompetition, getCollectionListener } from '../services/Database';
import { getAllParticipants } from '../services/Database';
import { addParticipant } from '../services/Database';
import { auth } from '../Firebase';
import moment from 'moment';
import * as Font from 'expo-font';
import { useFocusEffect } from '@react-navigation/native'
import { doc, onSnapshot } from 'firebase/firestore'

Font.loadAsync({
    // 'light':require('../assets/fonts/MontserratAlternates-Light.ttf'),
    // 'regular':require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    'medium':require('../assets/fonts/MontserratAlternates-Medium.ttf'),
    'semiBold':require('../assets/fonts/MontserratAlternates-SemiBold.ttf'),
  });

export default function Join({route, navigation}) {

    const userData=route.params;
    const avatar=userData.avatar;
    const points=userData.points;
    const username=userData.username;
    const uid=userData.uid;

    const [compID, setCompID] = useState("");
    const [comp, setComp]=useState([]);
    const [count, setCount]=useState(0);
    const [endDate, setEndDate]=useState(Date);
    const [startDate, setStartDate]=useState(Date);
    const [canEnter, setCanEnter]=useState(true);

  //getting the active competition id
  const compDetails = async ()=>{
    const activeComp = await getNextCompetition();

    // console.log(activeComp)
    setComp(activeComp[0]);
    setCompID(activeComp[0].uid);

    var end=(activeComp[0].endDate).toDate();
    var endFormatted = moment(end).utcOffset('+05:30').format('YYYY-MM-DD');
    setEndDate(endFormatted);

    var start=(activeComp[0].startDate).toDate();
    var startFormatted = moment(start).utcOffset('+05:30').format('YYYY-MM-DD');
    setStartDate(startFormatted);
    }

    // useEffect(() => {
    //     compDetails();
    // })



    useFocusEffect(
        React.useCallback(()=>{

            compDetails();
            const collectionRef=getCollectionListener(comp.uid);

            const unsub = onSnapshot(collectionRef, (snapshot)=>{
              let participants=[];
              snapshot.forEach((doc)=>{
      
                  let parData={...doc.data()}
                  participants.push(parData);
              })

              setCount(participants.length);
              console.log(participants.length)

              for(var i=0;i<participants.length;i++){
                    if(participants[i].uid==userData.uid){
                        setCanEnter(false);
                        console.log("already entered");
                    }else{
                        console.log("can enter");
                    }

                }

            })

        
        return()=>{
            //do something here when the sacreen is focussed
            unsub();
        }
        },[comp.uid])
        )
    
    const AddParticipant = async ()=>{
        // console.log(comp.uid)
        await addParticipant({avatar, points, username, uid}, comp.uid)
        navigation.navigate({ 
        name:'Waiting',
        params:startDate});
    }

  return (


        <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.header}>Join the next huge tag game!</Text>
            {/* <Text>{userData.uid}</Text> */}

            {/* // orange circle */}
        <View style={styles.orange}>
            <Text style={styles.orange1}>{count}</Text>
            <Text style={styles.orange2}>people entered</Text>
        </View>

                    {/* // pink circle */}
        <View style={styles.pink}>
            <Text style={styles.pink1}>from:</Text>
            <Text style={styles.pink2}>{startDate}</Text>

            <Text style={styles.pink3}>to:</Text>
            <Text style={styles.pink4}>{endDate}</Text>
        </View>


        { canEnter ?  
    (
           <TouchableOpacity style={styles.yellow} onPress={AddParticipant}>
               <Text style={styles.yellow1}>Join game</Text>
           </TouchableOpacity>

    ) : (  <> 
        <View style={styles.yellowDisabled}>
            <Text style={styles.yellow1Disabled}>Entered</Text>
        </View>
          <TouchableOpacity style={styles.btn2} onPress={()=> navigation.goBack()}><Text style={styles.btnTxt}>Back Home</Text></TouchableOpacity>
          </>    
    )}

        </View>

     
  );
}

const styles = StyleSheet.create({
 
content:{
        width:'100%',
        padding:40,
        flex:1,
        backgroundColor: '#FFFBEB'
      },
      logo: {
        width: 90,
        height: 41,
        marginTop: 20,
      },
    header:{
        color:'#000000',
        fontFamily:'semiBold',
        fontSize:30,
        marginTop:70,
        width:'80%',
        marginLeft:40
    },
    sub:{
        color:'#000',
        fontFamily:'medium',
        fontSize:15,
        marginTop:20,
        marginHorizontal:40
    },
    orange:{
        backgroundColor:"#FB5E1B",
        width:170,
        height:170,
        borderRadius:170,
        marginLeft:140,
        marginTop:10,
        alignItems: 'center',
        justifyContent:'center'
    }, orange1:{
        fontSize:35,
        width:'100%',
        color:'#FFFBEB',
        fontFamily:'semibold',
 
        textAlign:'center',

    }, orange2:{
        fontSize:17,
        width:'60%',
        color:'#FFFBEB',
        fontFamily:'medium',
        textAlign:'center'
    },    pink:{
        backgroundColor:"#FFA6BA",
        width:200,
        height:200,
        borderRadius:220,
        marginLeft:-50,
        marginTop:-70,
        alignItems: 'center',
        justifyContent:'center'
    }, pink2:{
        fontSize:17,
        width:'100%',
        color:'#FFFBEB',
        fontFamily:'semibold',
 
        textAlign:'center',

    }, pink1:{
        fontSize:15,
        width:'60%',
        color:'#FFFBEB',
        fontFamily:'medium',
        textAlign:'center'
    }, pink4:{
        fontSize:17,
        width:'100%',
        color:'#FFFBEB',
        fontFamily:'semibold',
 
        textAlign:'center',

    }, pink3:{
        fontSize:15,
        width:'60%',
        color:'#FFFBEB',
        fontFamily:'medium',
        textAlign:'center',
        marginTop:10
    }, 
    yellow:{
        backgroundColor:"#FECE34",
        width:400,
        height:400,
        borderRadius:400,
        marginLeft:70,
        marginTop:-60,
        alignItems: 'center',
        justifyContent:'center'
    },yellowDisabled:{
        backgroundColor:"#FECE34",
        width:400,
        height:400,
        borderRadius:400,
        marginLeft:70,
        marginTop:-60,
        alignItems: 'center',
        justifyContent:'center'
    }, yellow1:{
        fontSize:20,
        width: 200,
        color:'#FFFBEB',
        fontFamily:'semibold',
        marginLeft:0,
        marginTop:-30,
        textDecorationLine:"underline"

    },btn2:{
        width:'100%',
        padding:20,
        backgroundColor:'#FFA6BA',
        borderRadius:100,
        marginTop:-220,
    
    },btnTxt:{
        color:'#FFFBEB',
        fontFamily:'semibold',
        textAlign:'center',
        fontSize:18
    }, yellow1Disabled:{
        fontSize:20,
        width: 200,
        color:'#FFFBEB',
        fontFamily:'semibold',
        marginLeft:0,
        marginTop:-80,
        textDecorationLine:"underline"

    },
});