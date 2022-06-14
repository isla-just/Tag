const functions = require("firebase-functions");
const firebase = require("firebase-admin");
firebase.initializeApp()
var firestore = firebase.firestore()
    

exports.taskRunner = functions.runWith( { memory: '2GB' }).region('europe-west1').pubsub

    .schedule('0 0 1 * *')
    .onRun(async (context) => {

        // first step - works
        const comp = firestore.collection("competitions")
        const status = await comp.where("status", "==", "active").get()
        status.forEach(snapshot => {
            snapshot.ref.update({ "status": "inactive" })
        })

     //second step 
    // var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date("2022-06-13T22:00:00.000Z"));
    var current = firebase.firestore.Timestamp.fromDate(new Date());
    // var current = new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString();
    const setActive = await comp.where("startDate", "==", current).get()
    setActive.forEach(snapshot => {
        snapshot.ref.update({ "status": "active" })
        console.log("updated");
    })

        //third step
    //getting the first day of the next month and the following month to create start and end dates
    const thisDate = new Date();
    var startDate = (new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 1));
    var startTimestamp = firebase.firestore.Timestamp.fromDate(new Date(startDate));
    var endDate = (new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 2));
    var endTimestamp = firebase.firestore.Timestamp.fromDate(new Date(endDate));

    var newDocRef = doc(collection(firestore, 'competitions'));
    await setDoc(
    newDocRef,{
                endDate:endTimestamp,
                startDate:startTimestamp,
                prize:'random',
                status: 'inactive',
                uid: newDocRef.id
          }
    );

    return console.log("done");
});