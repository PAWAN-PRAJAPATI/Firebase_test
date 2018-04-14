var config = {
    apiKey: "AIzaSyC89JNB8JPIyPAVXq_uqXWkwN3_m1ELhPc",
    authDomain: "cocreate-ac987.firebaseapp.com",
    databaseURL: "https://cocreate-ac987.firebaseio.com",
    projectId: "cocreate-ac987",
    storageBucket: "cocreate-ac987.appspot.com",
    messagingSenderId: "98128912235"
  };


console.log(document.cookie);
  
firebase.initializeApp(config);
var firestore = firebase.firestore();


var uid = getCookie("uid");
var cookieData = JSON.parse(uid);

const docRef = firestore.doc("/messages/"+cookieData.user_id);
const msg = document.querySelector("#msg");
const saveButton = document.querySelector("#saveButton");



saveButton.addEventListener("click", function(){
    const msg_string = msg.value;
    console.log("I am "+ msg_string + "to FireStore");
    docRef.set({
        msg: msg_string
    })
}) 

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  //  //window.location.href = "https://us-central1-cocreate-ac987.cloudfunctions.net/server/data?token="+idToken;
  //  console.log(idToken);
  //}).catch(function(error) {
   // console.log(error);
  //});

