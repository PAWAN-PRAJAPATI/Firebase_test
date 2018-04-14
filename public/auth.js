
var config = {
    apiKey: "AIzaSyC89JNB8JPIyPAVXq_uqXWkwN3_m1ELhPc",
    authDomain: "cocreate-ac987.firebaseapp.com",
    databaseURL: "https://cocreate-ac987.firebaseio.com",
    projectId: "cocreate-ac987",
    storageBucket: "cocreate-ac987.appspot.com",
    messagingSenderId: "98128912235"
  };

  
firebase.initializeApp(config);


const sign  = document.querySelector("#sign");
sign.addEventListener("click",function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          //window.location.href = "https://us-central1-cocreate-ac987.cloudfunctions.net/server/data?token="+idToken;
          window.location.href = "http://localhost:5001/cocreate-ac987/us-central1/server/data?token="+idToken;
        
        }).catch(function(error) {
          console.log(error);
        });
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
})



/*
var latitude = 0
var longitude = 0; // Set from form

$.post({
  url: "http://localhost:5001/cocreate-ac987/us-central1/server/data",
  data: {latitude: latitude, longitude: longitude},
  success: function (data) {
    console.log("Success");
  },
  dataType: "json"
});
*/