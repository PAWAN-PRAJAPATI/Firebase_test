var myFirebase = new Firebase('https://cocreate-ac987.firebaseio.com/');
//var usernameInput = document.querySelector('#username');
var usernameInput = "pawan";
var textInput = document.querySelector('#msg');
var postButton = document.querySelector('#submit');

postButton.addEventListener("click", function() {
  var msgUser = usernameInput;
  var msgText = textInput.value;
  myFirebase.push({username:msgUser,msg:msgText});
  textInput.value = "";
});

var startListening = function() {
  myFirebase.on('child_added', function(snapshot) {
    var msg = snapshot.val();
  
    var msgUsernameElement = document.createElement("b");
    msgUsernameElement.textContent = msg.username;
    
    var msgTextElement = document.createElement("p");
    msgTextElement.textContent = msg.msg;

    var msgElement = document.createElement("div");
    msgElement.appendChild(msgUsernameElement);
    msgElement.appendChild(msgTextElement);
    
    document.getElementById("results").appendChild(msgElement);
  });
}
startListening()

