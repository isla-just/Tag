//we will be adding our db queries and functions 
import {db} from "../Firebase"; //firestore instance

// import { auth } from '../Firebase';

//firestore functions
import { doc, setDoc, Timestamp, collection, getDocs, addDoc, query, onSnapshot, where, orderBy, limit } from "firebase/firestore"; 

//creates a document for the user in our users collection
export const createUserOnRegister=(user, username, apipfp)=>{
    //document reference: doc(firestore init, collection name, optional - id of the document (name/id))
    const userRef = doc(db, "users", user.uid);

    //create data document
    const userData={
        email:user.email,
        username:username,
        location:{ geohash: 1, lat: 1, lng: 1},
        tag:false,
        avatar:apipfp,
        points:0,
        powerup:"none",
        uid:user.uid,
        tagCount:0
        // uid:user.uid
    }
    //set a document setDoc(dumument reference, data we want to set, any additional options like merge)
    return setDoc(userRef, userData); //pass the correect one 
}


// scheduled function:
// 1. Get the current active competion
// 2. Is the end date past the current date
// 3. If yes, update to inactive and create new competition
// 4. If not, do nothing..

//get the current active competition
export const getActiveCompetition= async ()=>{

    const allData=[];

    //snapshot for our users collection
    const collectionRef=query(collection(db, "competitions") ,where("status", "==", "active"));
    const collectionSnapshot = await getDocs(collectionRef);

    collectionSnapshot.forEach((doc)=>{
        
        allData.push(doc.data());
        // console.log(doc.data());
    });
    return allData;

}

//get the current active competition
export const getNextCompetition= async ()=>{

const allData=[];

    const thisDate = new Date();
    var startTimestamp = (new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 1));
    var myTimestamp = Timestamp.fromDate(startTimestamp);

//snapshot for our users collection
const collectionRef=query(collection(db, "competitions") ,where("startDate", "==", myTimestamp));
const collectionSnapshot = await getDocs(collectionRef);

collectionSnapshot.forEach((doc)=>{
    
    allData.push(doc.data());
    // console.log(doc.data());
});
return allData;
}

// set our profile data - updaye
export const updateTag =(uid, data)=>{
    const userRef = doc(db, "users", uid);
    return setDoc(userRef, data, {merge:true}); // add the option to merge document andnot overwrite 
}

export const settag= (uid, data) =>{
    const userRef = doc(db, 'users', uid);
    return setDoc(userRef, data, {merge:true});//option to merge and not overrite
  
}

export const setPowerup= (uid, data) =>{
    const userRef = doc(db, 'users', uid);
    return setDoc(userRef, data, {merge:true});//option to merge and not overrite
}

export const updateStatus= (uid, data) =>{
    const userRef = doc(db, 'competitions', uid);
    return setDoc(userRef, data, {merge:true});//option to merge and not overrite
}

export const addParticipant=(data, id)=>{
        const collectionRef=collection(db,"competitions/" + id + "/participants");
        return addDoc(collectionRef, data);
   }


export const getAllParticipants=async (id)=>{
let participants=[];

const collectionRef=query(collection(db, "competitions/"+id+"/participants") ,orderBy('points', 'asc'));
const collectionSnapshot = await getDocs(collectionRef);

collectionSnapshot.forEach((doc)=>{
    participants.push(doc.data());
    // console.log(doc.data());
});
return participants;
}

//returns our collection reference that we want to listen for real updates 
export const getCollectionListener=(id)=>{
    //returning this reference
    return query(collection(db, "competitions/"+id+"/participants") ,orderBy('points', 'asc'));
}

export const getTagged=async (id)=>{
    
    const querySnapshot = await getDocs(collection(db, 'users'), where("tag", "==", true));
    var allData=[];
    // const date = dateCreated.toDate().toDateString()

    querySnapshot.forEach((doc)=>{
    const compData={
        location:doc.data().location,
        uid:doc.data().uid
    }

    allData=compData;
})

return allData;
    }
