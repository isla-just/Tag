const functions = require("firebase-functions");
const admin=require("firebase-admin");
admin.initializeApp();
const database = admin.firestore();

exports.timer = functions.pubsub.schedule("* * * * *").onRun((context) => {
//   const docRef="testCloud/test1";
//   database.doc(docRef).update({"start": admin.firestore.Timestamp.now()});
//   return console.log("Success");
});
