const functions = require("firebase-functions");
const firebase = require("firebase-admin");
firebase.initializeApp()
var firestore = firebase.firestore()

exports.createCompetition = functions.pubsub
    .schedule('0 0 1 * *')
    .onRun(async (context) => {
        const competitions = firestore.collection('competitions')

        //wrapping code you want to execute in cloud function
        await createCompetition()
        const competition = await competitions.where('status', '==', false).get()
        user.forEach(snapshot => {
            snapshot.ref.update({ credits: 10 })
        })
        return null;
    })

    //an array of powerups for prizes loop through randomly

    //this needs to be called using a cloud function
    //give your cloud function a new directory - separate project that executes your crud for you
export const createCompetition=(competition, startDate, endDate)=>{
    const compRef = doc(db, "competitions", competition.uid);

    //create data document
    const compData={
        participants:{},
        endDate:endDate,
        startDate:startDate,
        status:"active",
        uid:competition.uid,
        prize:"doublePoints"
    }
    //set a document setDoc(dumument reference, data we want to set, any additional options like merge)
    return setDoc(compRef, compData); //pass the correect one 
}